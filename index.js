const express = require("express");
const {PORT,MONGO_URI} = require("./config");
const { default: mongoose } = require("mongoose");
const { userRouter } = require("./routes/user");
const { adminRouter } = require("./routes/admin")

// console.log(PORT)
const app = express();

//Home route
app.get("/",(req,res)=>{
    res.send(
        "<h1>The backend is up</h1>"
    )
})

            //middleware
//for body parser in all routes
app.use(express.json());

app.use("/api/v1/user",userRouter);
app.use("/api/v1/admin",adminRouter);

async function main(){
    try{
        await mongoose.connect(MONGO_URI)
        app.listen(PORT,()=>{
            console.log("Database Connected")
            console.log(`The backend is running on http://localhost:${3000}/`);
        })
    }
    catch(err){
        console.log("Unable to connect to the Database.")
    }
}
main()






