import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRoute from "./routes/user.route.js"
import reviewRoute from "./routes/review.route.js"
import orderRoute from "./routes/order.route.js"
import messageRoute from "./routes/message.route.js"
import gigRoute from "./routes/gig.route.js"
import conversationRoute from "./routes/conversation.route.js"
import authRoute from "./routes/authentication.route.js"
import cookieParser from "cookie-parser";
import helmet from 'helmet'
import cors from "cors"

const app = express();
dotenv.config(); 
mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGO);

app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'img-src': ["'self'", 'data:']
      }
    }
  }));
  
app.use(cors({origin:"http://127.0.0.1:5173", credentials:true}))
app.use(express.json())
app.use(cookieParser())





// MOUNTING ROUTES------------------------------------------------------------------------------------------ 
// using app.use() to mount Router instances to 
// specific paths in the application
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/orders", orderRoute);
app.use("/api/messages", messageRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/conversations", conversationRoute);

/*
    using app.post() is suitable for defining routes
    that apply globally to the entire application,
    while using router.post() along with app.use() is 
    useful for modularizing your application and 
    grouping related routes together based on functionality
*/
//----------------------------------------------------------------------------------------------------------


app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).send(errorMessage)
})

app.listen(8800, ()=>{
    console.log("backend server is running!")
})