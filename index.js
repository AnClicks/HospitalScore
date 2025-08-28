const express = require("express");
const {PORT} = require("./config")

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

app.use("/api/v1/user",userRoutes);
app.use("/api/v1/admin",adminRoutes);






app.listen(PORT,()=>{
    console.log(`The backend is running on http://localhost:${3000}/`);
})