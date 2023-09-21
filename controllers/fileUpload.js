const File = require("../models/file");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async(req,res) => {
    try{

        // fetch file from request
        const file = req.files.file;
        console.log("file aa gye ", file);
         
        // create path where file need to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`; // files folder -> controllers
        console.log("path -> " , path);
        
        // add path to the move function
        file.mv(path,(err) => {
            console.log(err);
        })

        res.json({
            success:true,
            message:"local file upload successfully"
        })

    }
    catch(error){
        console.log(error);
        return res.status(400),json({
            success:false,
            message:"something went wrong"
        })
    }
}

function isFileTypeSupported(fileType,supportedTypes){
    return supportedTypes.includes(fileType);
}

async function uploadFileToCloudinary(file,folder,quality){
    const options = {folder};

    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

exports.imageUpload = async(req,res) => {
    try{
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split(".")[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"file format not supported"
            })
        }

        const response = await uploadFileToCloudinary(file,"files");   // files is the folder name in cloudinary
        console.log(response);

        const fileData = await File.create({
            name,tags,email,imageUrl:response.secure_url
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"image successfully uploaded"
        })
    }
    catch(error){
        console.error(error);
        return res.status(400).json({
            success:false,
            message:"something went wrong"
        })

    }
}

exports.videoUpload = async(req,res) => {
    try{
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file = req.files.videoFile;
        console.log(file);

        const supportedTypes = ["mp4","mov"];
        const fileType = file.name.split(".")[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"file format not supported"
            })
        }

        const response = await uploadFileToCloudinary(file,"files");
        console.log(response);

        const fileData = await File.create({
            name,tags,email,imageUrl:response.secure_url
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"video successfully uploaded"
        })
    }
    catch(error){
        console.error(error);
        return res.status(400).json({
            success:false,
            message:"something went wrong"
        })

    }
}

exports.imageReducerUpload = async(req,res) => {
    try{
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file = req.files.imageFile;
        console.log(file);

        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split(".")[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:"file format not supported"
            })
        }

        const response = await uploadFileToCloudinary(file,"files",30);
        console.log(response);

        const fileData = await File.create({
            name,tags,email,imageUrl:response.secure_url
        })

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"image successfully uploaded"
        })
    }
    catch(error){
        console.error(error);
        return res.status(400).json({
            success:false,
            message:"something went wrong"
        })

    }
}