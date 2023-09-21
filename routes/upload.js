const express = require("express");
const router = express.Router();

const {imageUpload,videoUpload,imageReducerUpload,localFileUpload} = require("../controllers/fileUpload");

router.post("/imageupload",imageUpload);
router.post("/videoupload",videoUpload);
router.post("/imagereducerupload",imageReducerUpload);
router.post("/localfileupload",localFileUpload);

module.exports = router;