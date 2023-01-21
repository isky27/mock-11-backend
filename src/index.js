require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connection = require("./config/db");

const userRouter = require("./features/user/user.Route")

const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/user', userRouter)

app.listen(PORT, async()=>{
    await connection();
     console.log(`http://locahost:${PORT}`)
})