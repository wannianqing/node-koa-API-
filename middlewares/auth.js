const basicAuth = require('basic-auth');
const jwt = require('jsonwebtoken');
const { Forbbiden } = require('../app/utils/http-exception');
class Auth{
    get m(){
        return async (ctx,next) => {
            const userToken = basicAuth(ctx.req);

            const {screctKey} = global.config.signScrect;

            let errMsg = 'token不合法';
            if(!userToken || !userToken.name){
                throw new Forbbiden(errMsg);
            }
            
            try {
                var jwtObj = jwt.verify(userToken.name,screctKey);
            } catch (error) {
                if(error.name == 'TokenExpiredError'){
                    errMsg = 'token已过期';
                }
                throw new Forbbiden(errMsg);
            }
            ctx.auth = {
                uid:jwtObj.uid,
                scope:jwtObj.scope
            }
            
            await next();
        }
    }
}

module.exports = Auth;