var knex = require("../database/connection");
var bcrypt = require("bcrypt");
const PasswordToken = require("./PasswordToken");

class User{             //usado para cadastro de novos usuarios em nossa tabela users

    async findAll(){   //lista todos os usuarios
        try{
            var result = await knex.select("id","email","role","name").table("users");   //nao queremos passar a senha, entao colocamos ponto a ponto dos dados
            return result;
        }catch(err){
            console.log();
            return [];
        }
    }

    async findById(id){
        try{
            var result = await knex.select("id","email","role","name").where({id:id}).table("users");  //o id recebido como parametro será o que será transmitido no id do banco
            
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }
        }catch(err){
            console.log();
            return undefined;
        }
    }

    async findByEmail(email){
        try{
            var result = await knex.select("id","email","password","role","name").where({email:email}).table("users");  //o id recebido como parametro será o que será transmitido no id do banco
            
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }
        }catch(err){
            console.log();
            return undefined;
        }
    }

    async new(email,password,name){   
        try{
            var hash = await bcrypt.hash(password,10); //recebe senha e o numero de criptografia que ela vai gerar
        }catch(err){
            console.log(err);
        }                                                            //await usado para ser assincrono
        await knex.insert({email,password: hash,name,role: 0}).table("users") //role : 0  => todo novo usuario cadastrado será comum
        //aqui estamos recebendo o email,nome e senha, usando a criptografia na senha e inserindo na tabela
    }

    async findEmail(email){
        try{
            var result = await knex.select("*").from("users").where({email: email});  //select(*) = selecione todos
            
            if(result.length > 0 ){
                return true;
            }else{
                return false;
            }

        }catch(err){
            console.log(err);
            return false;
        }   
    }
    async update (id,email,name,role){

        var user = await this.findById(id);
        
        if(user != undefined){

            var editUser = {}; 

            if(email != undefined){            
               
                if(email != user.email){  //user.email é o email atual do usuario ,email é o que vem no parametro
                    var result = await this.findEmail(email);       //verificando se o email ja nao existe em outro usuario
                    if(result == false){   //se resultado == false, significa que o email nao existe,entao pode ser usado
                        editUser.email = email;
                    }else{
                        return {status: false,err: "o e-mail já está cadastrado ! "};
                    }
                }
            }

            if(name != undefined){
                editUser.name = name;
            }

            if(role != undefined){
                editUser.role = role;
            }

            try{
                await knex.update(editUser).where({id: id}).table("users"); //recebendo dados e atualizando
                return {status: true}
            }catch(err){
                return {status: false,err: err};
            }
        }else{
            return {status: false,err: "o usuario não existe ! "};
        }
    }

    async delete(id){

        var user = await this.findById(id);
        if(user != undefined){

            try{
                await knex.delete().where({id: id}).table("users");
                return {status: true};
            }catch(err){
                return {status: false,err: err};
            }

        }else{
            return {status: false,err: "O usuaário não existe,portanto não pode ser deletado."};
        }
    }

    async changePassword(newPassword,id,token){
        var hash = await bcrypt.hash(newPassword,10);
        await knex.update({password: hash}).where({id: id}).table("users");
        await PasswordToken.setUsed(token);
    }

}

module.exports = new User();