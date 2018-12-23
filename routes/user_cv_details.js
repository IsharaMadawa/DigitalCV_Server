const { UserCVDetails } = require("../models/user_cv_details");
const fs = require("fs");
const pdfkit = require("pdfkit");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  let cvDetails = await UserCVDetails.find({ defaultProfile: true });

  if (cvDetails.length === 0) {
    return res.status(404).send("Cannot find default CV Details");
  }

  res.send(cvDetails);
});

router.get("/getcv", async (req, res) => {
  //Get Default Profile Details
  let cvDetails = await UserCVDetails.find({ defaultProfile: true });

  if (cvDetails.length === 0) {
    return res.status(404).send("Cannot find default CV Details");
  }

  const doc = new pdfkit();
  doc.pipe(fs.createWriteStream("CV_Ishara_Madawa.pdf"));
  // Set a title and pass the X and Y coordinates
  doc.fontSize(15).text(cvDetails[0].user.name, 50, 50);
  // Set the paragraph width and align direction
  doc.text(
    "Wally Gator is a swinging alligator in the swamp. He's the greatest percolator when he really starts to romp. There has never been a greater operator in the swamp. See ya later, Wally Gator.",
    {
      width: 410,
      align: "left"
    }
  );
  doc.end();

  res.setHeader("Content-type", "application/pdf");
  res.setHeader(
    "Content-disposition",
    "attachment; filename=CV_Ishara_Madawa.pdf"
  );

  doc.pipe(res);
});

router.post("/", async (req, res) => {
  let cvDetails = new UserCVDetails({
    user: {
      name: "Ishara Madawa Kumararathna"
    },
    currentCompany: "DMS",
    skills: ["skillOne", "skilltwo"],
    experience: [
      {
        organizationShortName: "DMS",
        organization: "Data Management Systems(PVT) Ltd.",
        country: "Sri Lanka",
        position: "Software Engineer",
        details:"DMS Details"
      },
      {
        organizationShortName: "ZHO",
        organization: "Zayad Higher Organization",
        country: "UAE",
        position: "Software Engineer",
        details:"ZHO Details"
      }
    ],
    skillSet: [
      {
        title: "UI",
        skills: ["Javascript", "HTML", "CSS"]
      },
      {
        title: "Backend",
        skills: ["C#", "NodeJS", "C++"]
      }
    ],
    projects: [
      {
        name: "IEP",
        title: "For ZHO",
        details: "ZHO Project Details"
      }
    ],
    referees:[
        {
            title:"Mr.",
            name:"M.Kumararathna",
            position:"Owner",
            organization:"Mahawatta Tex",
            email:"nomail@gmail.com",
            mobileNo:["0094i362247211"],
            address:"Bulathkohupitiya"
        }
    ]
  });
  await cvDetails.save();
  res.send(cvDetails);
});

module.exports = router;
