const Router = require('koa-router');
const User = require('../models/User');
const LoginValidate = require('../validators/LoginValidate');

const { generateToken } = require('../utils/util');
const router = new Router();

router.post('/login',async (ctx,next) => {
    const v = new LoginValidate(ctx.request.body);
    const username = v.get('username');
    const password = v.get('password');

    const user = await User.verifyAccountPassword(username,password);
    // const token = generateToken(9,2);
    if(user){
        const uid = user.id;
        const token = generateToken(uid,2);

        ctx.body = {
            code:200,
            msg:'success',
            token:token
        }
    }

    
});

module.exports = router;