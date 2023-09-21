const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    },

})

fileSchema.post("save", async function(doc){  // doc -> name,email,tags,imageurl
    try{
        console.log("doc",doc);

        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            },
        })

        let info = await transporter.sendMail({
            from:"kritish jangir",
            to:doc.email,
            subject:"new file uploaded in cloudinary",
            html:`<h2>hello</h2> <p>file uploaded</p> View here: <a href="${doc.imageUrl}">${doc.imageUrl}</a>`
        })

        console.log("info",info);
    }
    catch(error){
        console.error(error);
    }
})


module.exports = mongoose.model("File",fileSchema);