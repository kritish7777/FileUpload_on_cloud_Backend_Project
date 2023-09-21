const express = require("express");
const fileupload = require("express-fileupload");
const app = express();
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}));
app.use(express.json());

require("dotenv").config();
const PORT = process.env.PORT || 4000;

const dbConnect = require("./config/database");
dbConnect();

require("./config/cloudinary").cloudinaryConnect();

const upload = require("./routes/upload");
app.use("/api/v1/upload",upload);

app.listen(PORT,() => {
    console.log(`server is started at ${PORT}`);
})