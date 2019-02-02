const { cvFile } = require("../models/cvFile");
const express = require("express");
const router = express.Router();

//Get CV
router.get("/", async (req, res) => {
  let cv = await cvFile.find({ isActive: true });

  if (cv.length === 0) {
    return res.status(404).send("Cannot find default CV Details");
  }
  const cvPdf = cv[0];
  var file = Buffer.from(cvPdf.file, "base64");

  res.setHeader("Content-type", "application/pdf");
  res.setHeader(
    "Content-disposition",
    "attachment; filename=" + cvPdf.fileName
  );
  res.end(file);
});

//CV File upload API
router.post("/", async (req, res) => {
  let cv = new cvFile({
    title: req.body.title,
    remarks: req.body.remarks,
    fileName: req.body.fileName,
    file: req.body.file,
    isActive: req.body.isActive
  });
  await cv.save();
  res.send(cv);
});

module.exports = router;
