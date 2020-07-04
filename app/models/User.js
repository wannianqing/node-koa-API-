const { Sequelize,Model } = require('sequelize');
const bcrypt = require('bcrypt');
const connect = require('../utils/db');
const { ParameterException } = require('../utils/http-exception');

class User extends Model{
    static async verifyAccountRepeat(username){
        const user = await User.findOne({
            where:{
                username
            }
        })
        if(user){
            throw new ParameterException('用户已存在')
        }
        return user;
    }

    static async verifyAccountPassword(username,password){
        const user = await User.findOne({
            where:{
                username
            }
        })
        if(!user){
            throw new ParameterException('用户不存在')
        }
        const database_password = user.password;
        const compare = bcrypt.compareSync(password,database_password);
        if(!compare){
            throw new ParameterException('用户名密码错误')
        }
        return user;
    }
}

User.init({
    username:Sequelize.STRING,
    password:{
        type:Sequelize.STRING,
        set(val){
            const salt = bcrypt.genSaltSync(10);
            const pwd = bcrypt.hashSync(val,salt);
            this.setDataValue('password',pwd);
        }
    }
},{
    sequelize:connect,
    tableName:'user'
})

module.exports = User;