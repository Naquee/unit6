const express = require("express");
const {connection} = require("./config/db");
const { authentication } = require("./Middleware/authentication");
const { todoRouter } = require("./routes/todo.route");
const { userRouter } = require("./routes/user.route");

require("dotenv").config();


const app = express();

const port =8200;

app.use(express.json())

app.get("/", (req,res) => {
    res.send("home Page")
})

app.use("/user",userRouter)
app.use(authentication)
app.use("/todos", todoRouter)

app.listen(port, () => {
    try{
        connection;
        console.log("connected to db successful")
    }
    catch(err){
      console.log("Error to connect to db")
      console.log(err)
    }
    console.log(`server running on ${port}`)
   
})