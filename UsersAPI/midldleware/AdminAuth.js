var jwt = require("jsonwebtoken");
var secret = "sdsdifokdfiodsiosdfd";



module.exports = function(req,res,next){   //aqui estamos fazendo um middleware para login,autorizando apenas quem é adm,nao precisa se preocupar muito com este codigo

    const authToken = req.headers['authorization'];

    if(authToken != undefined){
        const bearer = authToken.split(' ');
        var token = bearer[1];         

        try{
            var decoded = jwt.verify(token,secret); 

            if(decoded.role == 1){    //role 0 = pessoa normal, role =1 é admin,ai autoriza
                next(); //passa a requisição para rotas
            }else{
                res.status(403);
                res.send("você não é um administrador");
                return;
            }  
        }catch(err){
            res.status(403);
            res.send("nao autorizado");
            return;
        }
        

       

    }else{
        res.status(403);
        res.send("nao autorizado");
        return;
    }




}