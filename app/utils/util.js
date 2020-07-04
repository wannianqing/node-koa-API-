const jwt = require('jsonwebtoken');

const validateNull = (val) => {
    if (typeof val === 'boolean') {
        return false
    }
    if (typeof val === 'number') {
        return false
    }
    if (val instanceof Array) {
        if (val.length === 0) return true
    } else if (val instanceof Object) {
        if (JSON.stringify(val) === '{}') return true
    } else {
        if (val === 'null' || val == null || val === 'undefined' || val === undefined || val === '') return true
        return false
    }
    return false
}

const generateToken = function(uid,scope){
    const {screctKey,expiresIn} = global.config.signScrect;
    let token = jwt.sign({uid,scope},screctKey,{
        expiresIn
    })
    return token;
}

module.exports = {
    validateNull,
    generateToken
}