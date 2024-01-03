var knex = require("../database/connection");
var User = require("./User");

class PasswordToken{

    async create(email) {
        var user = await User.findByEmail(email);
        if (user != undefined) {
            try {
                var token = Date.now();
                await knex.insert({
                    user_id: user.id,
                    used: 0,  //0 representando false 
                    token: token
                }).table("passwordtokens");

                return { status: true, token: token };

            } catch (err) {

                console.log(err);
                return { status: false, err: err }

            }
        } else {
            return { status: false, err: " O e-mail não existe no banco de dados" }
        }
    }

    async validate(token) {   //teste para validação do token
        try {
            var result = await knex.select().where({ token: token }).table("passwordtokens");

            if (result.length > 0) {
                var tk = result[0];

                if (tk.used) {    //se ele for usado, significa que nao podemos usar novamente,entao return false
                    return { status: false };
                } else {
                    return { status: true, token: tk };
                }
            } else {
                return { status: false };
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async setUsed(token){
        await knex.update({used: 1}).where({token: token}).table("passwordtokens");
    }
}

module.exports = new PasswordToken();