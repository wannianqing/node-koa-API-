const Router = require('koa-router');
const User = require('../models/User');
const RegisterValidate = require('../validators/RegisterValidate');
const router = new Router();

router.post('/register',async (ctx) => {
    const v = new RegisterValidate(ctx.request.body);

    const username = v.get('username');
    const password = v.get('password');

    await User.verifyAccountRepeat(username);

    const result = await User.create({username,password})
    if(result){
        ctx.body = {
            code:200,
            msg:'success',
            data:1
        }
    }else{
        ctx.body = {
            code:400,
            msg:'fail'
        }
    }
})

module.exports = router;