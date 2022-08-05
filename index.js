//imported express library.
const express = require("express")
//app is to run the application by calling express function.
const app = express()
//To connect to our Server
const mongoose = require("mongoose")
//importing the dotenv file for fetching the secure url for connection to database
const dotenv = require("dotenv")
//instead of having all end points of here in the page,
// we are using a separate file for each route to user , productetc.
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")

dotenv.config()
//To connect to our MongoDB Database
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB CONNNECTION SUCCESSFUL!!! :) ")) //if connection successful then print this statement
    .catch((err) => {
        //else print this statement
        console.log(err) //prints the error
    })

//=========================================================

//ENDPOINTS:
app.get("/api/test", () => {
    console.log("Test is SUCCESSFUL!")
})

//To parse json objects as input
app.use(express.json())
//This means that whenever we go to the API end point /api/user , the application will use userRoute.
app.use("/api/user", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/products" , productRoute)

//=============================================================
//Port to see and listen to our runnning application
//If no port number in env file then start it at Port number : 5000
app.listen(process.env.PORT || 5000, () => {
    console.log("Backend server is running!")
})
