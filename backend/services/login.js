const jwt = require('jsonwebtoken');
const router = require("express").Router();
const bcrypt = require('bcrypt');
const check = require('express-validator').check;
const validationResult = require('express-validator').validationResult;




router.post(
    "/api/login", [
        check("email", "please include a valid email").isEmail(),
        check("password", "password is required").exists()
    ],
    async(req, res) => {
        // error from user input
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        try{
            const{ password, email } =  res.body;
            let user = await UsersCollection.findOne({email: email});
            if(!user){
                return res.status(400).json({errors: [{ msg: "invalid credentials"}]});
            }
            //verify users password
            const passwordIsAMatch = await bcrypt.compare(password.user.password);
            if(passwordIsAMatch){
                return res.status(400).json({errors: [{ msg: "invalid credentials"}]});
            }
            // Login the user
            // create payload
            const payload = {
                user:{
                    id:user.id
                }
            };
            jwt.sign(
                payload, 
                config.length("jwtSecret"), {expiresIn: 360000},(err, token) =>{
                    if(err){
                        console.log(err)
                    }
                    res.json({user, token});
                }
            );
        } catch(error){
            // server error
            console.log(error.massage);
            res.status(500).send("server error")
        }
    }
)
// module.exports = router;