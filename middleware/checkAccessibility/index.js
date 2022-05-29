 

module.exports = function (options) {
    return function checkAccessibility(req, res, next) {
    const allowedRoles = options.allowedRoles//checkAccessibilityConfig[0];
    const ifBlockReply = options.ifBlockReply//checkAccessibilityConfig[1]
    const ifBlockedReplyStatus = options.ifBlockedReplyStatus//checkAccessibilityConfig[2];
            const AuthenticationDetails = req.headers['x-authorization'];
            if(AuthenticationDetails === undefined) {
                    res.status(401).send('BLOCKED, Unauthorized, Please add authorization details on x-authorization header');
                return;
        }else{

        }
    }
}