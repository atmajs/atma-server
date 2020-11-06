import { Class } from '../dependency'

type ISecureObj = boolean | {
    role?: (string | IRequestCheck)
    claim?: (string | IRequestCheck)
    roles?: (string | IRequestCheck)[]
    claims?: (string | IRequestCheck)[]
};

type IRequestCheck = (req) => boolean

type IRoledUser = {
    isInRole? (role: string): boolean
    roles?: (string | { name: string})[]
}

type IClaimsUser = {
    hasClaim ? (claim: string): boolean
    claims?: (string | { name: string})[]
}

export function secure_canAccess (req, secure: ISecureObj){
    if (secure == null) {
        return true;
    }
    if (typeof secure === 'boolean') {
        return secure === false ? true : (req.session != null || req.user != null);
    }
    let user = req.user;
    if (user == null) {
        return false;
    }
    if (secure.role != null && isInRole(req, user, secure.role) === false) {
        return false;
    }
    if (secure.roles != null && isInRoleAny(req, user, secure.roles) === false) {
        return false;
    }
    if (secure.claim != null && hasClaim(req, user, secure.claim) === false) {
        return false;
    }
    if (secure.claims != null && hasClaimAny(req, user, secure.claims) === false) {
        return false;
    }
    return true;
};

function isInRole (req, user: IRoledUser, role: (string | IRequestCheck)) {
    if (typeof role === 'function') {
        return role(req)
    }
    if (typeof user.isInRole === 'function') {
        return user.isInRole(role);
    }
    let roles = user.roles;
    if (roles == null) {
        return false;
    }
    for (let i = 0; i < roles.length; i++) {
        let x = roles[i];
        if (typeof x === 'string') {
            if (x === role) {
                return true;
            }
            continue;
        }
        if (x.name === role) {
            return true;
        }
    }
    return false;
}
function isInRoleAny (req, user, roles: (string | IRequestCheck)[]) {
    for (let i = 0; i < roles.length; i++) {
        if (isInRole(req, user, roles[i])) {
            return true;
        }
    }
    return false;
}


function hasClaim (req, user: IClaimsUser, claim: (string | IRequestCheck)) {
    if (typeof claim === 'function') {
        return claim(req);
    }

    if (typeof user.hasClaim === 'function') {
        return user.hasClaim(claim);
    }
    let claims = user.claims;
    if (claims == null) {
        return false;
    }
    for (let i = 0; i < claims.length; i++) {
        let x = claims[i];
        if (typeof x === 'string') {
            if (x === claim) {
                return true;
            }
            continue;
        }
        if (x.name === claim) {
            return true;
        }
    }
    return false;
}
function hasClaimAny (req, user, claims: (string | IRequestCheck)[]) {
    for (let i = 0; i < claims.length; i++) {
        if (hasClaim(req, user, claims[i])) {
            return true;
        }
    }
    return false;
}

export const service_validateArgs = function(body, args, isStrict?) {
	if (body == null)
		return new Error('Message Body is not defined');

	return Class.validate(body, args, isStrict);
};

