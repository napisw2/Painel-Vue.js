var User = require("../models/User");
const PasswordToken = require("../models/PasswordToken");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

var secret = "sdsdifokdfiodsiosdfd";   //é a chave da criptografia do nosso token

class UserController{

    async index(req,res){
        var users = await User.findAll();  //sempre usando await, por ser uma funcao assincrona
        res.json(users);
    }

    async findUser(req,res){
        var id = req.params.id;
        var user = await User.findById(id);
        if(user == undefined){
            res.json({});
            res.status(504);
        }else{

            res.status(200);
            res.json(user);

        }
    }

    async create(req, res){
        var {email, name, password} = req.body;

        if(email == undefined || email == '' || email == ' '){
            res.status(400);
            res.json({err: "O e-mail é inválido!"})
            return;
        }

        var emailExists = await User.findEmail(email);

        if(emailExists){
            res.status(406);
            res.json({err: "O e-mail já está cadastrado!"})
            return;
        }

        
        await User.new(email,password,name);
        
        res.status(200);
        res.send("Tudo OK!");
    }

    async edit(req,res){
        var {id,name,role,email} = req.body;
        var result = await User.update(id,email,name,role);
        if(result != undefined){
            if(result.status){
                res.status(200);
                res.send("Tudo Ok");
            }else{
                res.status(406);
                res.send(result.err);
            }
        }else{
            res.status(406);
            res.send("Ocorreu um erro no servidor");
        }
    }

    async remove(req,res){
        var id = req.params.id;

        var result = await User.delete(id);

        if(result.status){
            res.status(200);
            res.send("Tudo certo");
        }else{
            res.status(406);
            res.send(result.err);
        }
    }
    
    async recoverPassword(req,res){
        var email = req.body.email;
        
        var result = await PasswordToken.create(email);
        
        if(result.status){

            console.log(result.token);
            res.status(200);
            res.send("token :  " + result.token);

        }else{
            res.status(406);
            res.send(result.err);
        }
    }

    async changePassword(req,res){
        var token = req.body.token;
        var password = req.body.password;

        var isTokenValid = await PasswordToken.validate(token);          //aqui retorna verdadeiro ou falso
        
        if(isTokenValid.status){
            await User.changePassword(password,isTokenValid.token.user_id,isTokenValid.token.token);
            res.status(200);
            res.send("senha alterada");

        }else{
            res.status(406);
            res.send("Token inválido");
        }


    }

    async login(req,res){
        var{email,password} = req.body;

        var user = await User.findByEmail(email);

        if(user != undefined){

            var resultado = await bcrypt.compare(password,user.password); //metodo de comparaçao do bcrypt, q possui a criptografia

            if(resultado){
                var token = jwt.sign({email: user.email ,role: user.role},secret); /// gerando token
                res.status(200);
                res.send({token: token});
            }else{
                res.status(406);
                res.json({err: " Senha incorreta "});
            }

        }else{
            res.status(406);
            res.json({status: false, err: "o usuario não existe"});
        }
    }

    

}

module.exports = new UserController();