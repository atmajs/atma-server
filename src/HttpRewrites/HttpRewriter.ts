import { IncomingMessage, ServerResponse } from 'http';
import { send_REDIRECT } from '../util/send';

export default class Rewriter {
    rules: Rule[] = []

    addRules (rules: IRuleDefinition[]) {
        if (rules == null) {
            return;
        }
        this.rules.push( ... rules.map(x => new Rule(x)));
    }

    rewrite (req: IncomingMessage) {
        let arr = this.rules;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].rewrite(req)) {
                return;
            }
        }
    }
    redirect (req: IncomingMessage, res: ServerResponse): boolean {
        let arr = this.rules;
        for (let i = 0; i < arr.length; i++) {
            let path = arr[i].redirect(req)
            if (path == null) {
                continue;
            }
            send_REDIRECT(res, path);
            return true;
        }
        return false;
    }
}

export interface IRuleDefinition {
    rule: string
    conditions?: IRuleConditionDefinition[]
}

export interface IRuleConditionDefinition {
    condition: string
}
export class Rule {
    rewriter: string
    matcher: RegExp
    constructor (cond: IRuleDefinition) {
        this.parse(cond.rule);
    }
    private parse (rule: string) {
        let [pattern, rewriter] = rule.split(' ');
        this.rewriter = rewriter;
        this.matcher = new RegExp(pattern);
    }
    private isMatch (req: IncomingMessage): boolean {
        return this.matcher.test(req.url);
    }
    rewrite (req: IncomingMessage): boolean {
        if (this.isMatch(req) === false) {
            return false;
        }
        req.url = req.url.replace(this.matcher, this.rewriter);
        return true;
    }
    redirect (req: IncomingMessage): string {
        if (this.isMatch(req) === false) {
            return null;
        }
        return req.url.replace(this.matcher, this.rewriter);
    }
}
export class RuleCondition {
    textParts: string[]
    matcher: RegExp
    constructor (cond: IRuleConditionDefinition) {
        this.parse(cond.condition);
    }

    private parse (condition: string) {
        let [text, pattern] = condition.split(' ');
        let arr = text.split('%{');
        this.textParts = arr
            .slice(1)
            .map(x => x.split('}'))
            .reduce((aggr, x) => aggr.concat(x), [arr[0]]);

        this.matcher = new RegExp(pattern);
    }
    isMatch (req) {
        return this.matcher.test(this.interpolate(req));
    }
    private interpolate (req): string {
        return this.textParts.map((x, i) => {
            if (i % 2 === 0) {
                return x;
            }
            return this.getValue(req, x);
        }).join();
    }
    private getValue(req: IncomingMessage, name): string {
        if (name.substring(0, 5) === 'HTTP_') {
            return req.headers[name.substring(5)] as string || '';
        }
        return RuleCondition.resolvers[name].get(req);
    }
    static resolvers = {
        REMOTE_ADDR (req: IncomingMessage): string {
            return req.headers['x-forwarded-for'] as string || req.connection.remoteAddress;
        },
        REMOTE_HOST (req: IncomingMessage): string {
            return req.headers['host'] as string || '';
        },
        SERVER_ADDR (req: IncomingMessage): string {
            return req.socket.localAddress || '';
        }
    }
}
