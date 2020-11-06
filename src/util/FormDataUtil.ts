export namespace FormDataUtil {
    export function map(body, files?) {
        let json = null;

        if (body) {
            for (let key in body) {
                let val = body[key];
                json = setVal(json, key, val);
            }
        }
        if (files) {
            for (let key in files) {
                let val = files[key];
                json = setVal(json, key, val);
            }
        }
        return json;
    }

    /**
     * key:
     *  foo[1]name
     *  foo.[1].name
     *  [0].url.foo
     *  [0]url.foo
     */

    function setVal(json, path: string, val) {
        if (json == null) {
            json = nextIsArray(path) ? [] : {};
        }

        let ctx = json;
        do {
            let [ prop, rest ] = getAccessor(path);
            if (prop[0] === '[') {

                let endI = prop.indexOf(']', 1);
                let idx = Number(prop.substring(1, endI).trim());
                if (rest == null) {
                    ctx[idx] = val;
                    break;
                }

                let x = ctx[idx];
                if (x == null) {
                    x = nextIsArray(rest) ? [] : {};
                    ctx[idx] = x;
                }
                ctx = x;
                path = rest;
                continue;
            }
            if (rest == null) {
                ctx[prop] = val;
                break;
            }
            let x = ctx[prop];
            if (x == null) {
                x = nextIsArray(rest) ? [] : {};
                ctx[prop] = x;
            }
            ctx = x;
            path = rest;
        } while (path != null)

        return json;
    }

    function nextIsArray (path) {
        if (path[0] === '[') {
            return true;
        }
        return false;
    }

    function getAccessor (path: string) {
        // Start from second position, as [ can be part of current accessor
        let bracketI = path.indexOf('[', 1);
        let dotI = path.indexOf('.');
        if (dotI === -1 && bracketI === -1) {
            return [path, null];
        }
        if (dotI > -1 && bracketI > -1) {
            let min = Math.min(dotI, bracketI);

            let prop = path.substring(0, min);
            let rest = path.substring(
                min === dotI ? ( min + 1) : (min)
            );
            return [prop, rest];
        }
        if (dotI > -1) {
            let prop = path.substring(0, dotI);
            let rest = path.substring(dotI + 1);
            return [prop, rest];
        }
        if (bracketI > -1) {
            let prop = path.substring(0, bracketI);
            let rest = path.substring(bracketI);
            return [prop, rest];
        }
    }
}
