import { Class } from '../dependency'

type ISecureObj = boolean | {
    role?: string
    claim?: string
    roles?: string[]
    claims?: string[]
};

export const secure_canAccess = function(req, secure: ISecureObj){

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
    if (secure.role != null && isInRole(user, secure.role) === false) {
        return false;
    }
    if (secure.roles != null && isInRoleAny(user, secure.roles) === false) {
        return false;
    }
    if (secure.claim != null && hasClaim(user, secure.claim) === false) {
        return false;
    }
    if (secure.claims != null && hasClaimAny(user, secure.claims) === false) {
        return false;
    }
    return true;
};

function isInRole (user, role: string) {
    if (typeof user.isInRole === 'function') {
        return user.isInRole(role);
    }
    let roles = user.roles as (string | { name: string})[];
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
function isInRoleAny (user, roles: string[]) {
    for (let i = 0; i < roles.length; i++) {
        if (isInRole(user, roles[i])) {
            return true;
        }
    }
    return false;
}


function hasClaim (user, claim: string) {
    if (typeof user.hasClaim === 'function') {
        return user.hasClaim(claim);
    }
    let claims = user.claims as (string | { name: string})[];
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
function hasClaimAny (user, claims: string[]) {
    for (let i = 0; i < claims.length; i++) {
        if (hasClaim(user, claims[i])) {
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

