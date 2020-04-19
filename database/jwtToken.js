const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const idModel = require('../database/idModel');

async function jwtToken(idValue){
    const salt = await bcrypt.genSalt(3);
 
    idValue = await bcrypt.hash(idValue,salt);
    const jwt = await generateAuthToken(idValue);
    const obj = {hashedId : idValue , jwtToken : jwt};
    await idModel.create(obj)
    return jwt;
}

function generateAuthToken(idValue){
    const obj = {id:idValue}
    const jwtToken = jwt.sign(obj , "CovidExtricate");
    return jwtToken;
}

module.exports = jwtToken