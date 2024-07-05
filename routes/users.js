const express= require("express");
const usersControllers=require("../controllers/usersControllers");
const router=express.Router();


router
.route("/")
.get(usersControllers.getUsers)
.post(usersControllers.createUsers);


router
.route("/:id")
.get(usersControllers.getUsersByID)
//.delete(usersControllers.deleteUsers)
//.put(usersControllers.updateUsers);

module.exports=router;