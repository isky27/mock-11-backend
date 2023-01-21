const express = require('express');
const JWT = require("jsonwebtoken")
const argon2 = require("argon2")
const UserModel = require("./user.model")
const router = express.Router()

router.post('/signup', async (req, res) => {
    const { name,email, password } = req.body;
    const hash = await argon2.hash(password)
    const userexist = await UserModel.findOne({ email })
    try {
        if (userexist) {
            return res.status(400).send({ message: "User already exist" })
        }
        const newUser = await UserModel.create({ name,email, password: hash })
        newUser.save()
        return res.status(201).send({ message: "User created successfully" })
    } catch (error) {
        return res.status(404).send({ message: error.message })
    }

});

const SECRETKEY = "MOCK12"
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (user) {
        if (await argon2.verify(user.password, password)) {
            const token = JWT.sign({ id: user._id }, SECRETKEY, { expiresIn: "7 days" });
            return res.status(200).send({ message: "Login successfully", token })
        } else {
            return res.status(401).send({ message: "Invalid Credentials" })
        }
    }
    return res.status(401).send({ message: "Invalid Credentials or User is not Registerd" })

})

router.get("/getProfile", async(req,res)=>{

    const token = 

})


module.exports = router;


