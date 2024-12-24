import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

app.use(express.json({limit: "20kb"}))
app.use(express.urlencoded({extended: true, limit: "20kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import userRouter from './routes/user.routes.js'


//routes declaration
// we were writing app.get here and our work was getting done because through the app youwere writing routes here, as well as controllers, but now things have been seprated you can remove the router if you have taken it then now to bring the router you will have to bring middleware,and this is compulsory as well as this is the exact syntax......
app.use("/api/v1/users", userRouter)


// http://localhost:8000/api/v1/users/register

export { app }