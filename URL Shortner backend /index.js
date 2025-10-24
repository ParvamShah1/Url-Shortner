const express = require("express")
const urlRoute = require("./router/url")
const userRoute = require("./router/user")
const {connectToMongoDB} = require("./connect")
const app = express();
const PORT = 8001;
const cors = require("cors");
const cookieParser = require("cookie-parser")
const Comment = require("./models/comments")
connectToMongoDB("mongodb://127.0.0.1:27017/url-shortner")
.then(() => console.log("MongoDb Connected!"))

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.use((req, res, next) => {
  console.log('Cookies:', req.cookies);
  console.log('URL:', req.url);
  next();
});

app.use("/url",urlRoute);
app.use("/user",userRoute);




app.listen(PORT,() => console.log(`Server Started on port ${PORT}`))