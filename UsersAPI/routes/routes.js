var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");
var AdminAuth = require("../midldleware/AdminAuth");


router.get('/',HomeController.index); // aqui estamos chamando uma funcao chamada index que fica dentro do arquivo homecontroller
router.post('/user', UserController.create); //quando acessamos a /user , chamamos a funcao create do usercontroller
router.get("/user",AdminAuth,UserController.index);
router.get("/user/:id",AdminAuth,UserController.findUser);
router.put("/user",AdminAuth,UserController.edit);                  
router.delete("/user/:id",AdminAuth,UserController.remove);
router.post("/recoverpassword",UserController.recoverPassword);
router.post("/changepassword",UserController.changePassword);
router.post("/login",UserController.login);
router.post("/validate",AdminAuth,HomeController.validate);

module.exports = router;