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

router.get("/userprofiles", async (req, res) => {
  await UserCVDetails.find({}, function(err, profs) {
    var profiles = [];
    profs.forEach(function(prof) {
      (profileModel = {
        _id: prof._id,
        defaultProfile: prof.defaultProfile,
        createdDate:
          prof.createdDate != null
            ? new Date(prof.createdDate)
                .toISOString()
                .replace(/T/, " ")
                .replace(/\..+/, "")
            : "",
        lastUpdatesDate:
          prof.lastUpdatesDate != null
            ? new Date(prof.lastUpdatesDate)
                .toISOString()
                .replace(/T/, " ")
                .replace(/\..+/, "")
            : ""
      }),
        profiles.push(profileModel);
    });

    if (profiles.length === 0) {
      return res.status(404).send("Cannot find user profiles");
    }

    res.send(profiles);
  });
});

router.post("/", async (req, res) => {
  let cvDetails = new UserCVDetails({
    user: {
      name: req.body.fullName,
      mobile: req.body.mobile,
      email: req.body.email,
      address: req.body.address,
      myself: req.body.mySelf
    }
  });
  await cvDetails.save();
  res.send(cvDetails);
});

function runUpdate(obj) {
  return new Promise((resolve, reject) => {
    //you update code here

    UserCVDetails.findOneAndUpdate(
      prof._id,
      {
        defaultProfile: true
      },
      { useFindAndModify: false } //To Return Updated Document
    )
      .then(result => resolve())
      .catch(err => reject(err));
  });
}

router.put("/setDefaultProfile/:id", async (req, res) => {
  try {
    const profiles = await UserCVDetails.updateMany(
      {},
      { defaultProfile: false }
    );

    if (!profiles)
      return res.status(404).send("Update moview status not success.");

    const defaultPfofile = await UserCVDetails.findOneAndUpdate(
      { _id: req.params.id },
      { defaultProfile: true },
      { new: true, useFindAndModify: false }
    );

    if (!defaultPfofile)
      return res
        .status(404)
        .send(
          "The movie with the given ID - " + req.params.id + " was not found."
        );

    res.send(defaultPfofile);
  } catch (err) {
    return res.status(404).send("Faild To Update. - " + err.message);
  }
});

router.get("/getcv", async (req, res) => {
  let cvDetails = await UserCVDetails.find({ defaultProfile: true });

  if (cvDetails.length === 0) {
    return res.status(404).send("Cannot find default CV Details");
  }
  const userCVDetails = cvDetails[0];

  const doc = new pdfkit();
  doc.pipe(fs.createWriteStream("CV_Ishara_Madawa.pdf"));

  doc.fontSize(30).text(userCVDetails.user.name, 30, 30, {
    lineBreak: true
  });

  doc
    .fontSize(13)
    .font("Helvetica-Bold")
    .text("Mobile : ", 30, 60);

  doc
    .fontSize(13)
    .font("Helvetica-Bold")
    .text("Address : ", 30, 75);

  doc
    .fontSize(13)
    .font("Helvetica-Bold")
    .text("E-Mail : ", 30, 90);

  doc
    .moveTo(30, 105)
    .lineTo(580, 105)
    .stroke();

  doc
    .text("About Me", 30, 115)
    .font("Times-Roman", 13)
    .text(userCVDetails.user.myself, {
      //  width: 412,
      align: "justify",
      indent: 30,
      columns: 1,
      //height: 300,
      ellipsis: true
    });

  doc.text("This is a footer", 20, doc.page.height - 50, {
    lineBreak: false
  });

  doc.end();

  res.setHeader("Content-type", "application/pdf");
  res.setHeader(
    "Content-disposition",
    "attachment; filename=CV_Ishara_Madawa.pdf"
  );

  doc.pipe(res);
});

//CV Details Seed API
// router.post("/", async (req, res) => {
//   let cvDetails = new UserCVDetails({
//     user: {
//       name: "Ishara Madawa Kumararathna",
//       mobile: ["+94712197222"],
//       email: "dev.madawa@gmail.com",
//       address: "No 21, Supreme City, Karundupona, Kegalla",
//       blogging: [
//         {
//           site: "Codestreetblog",
//           url: "http://codestreetblog.blogspot.com/",
//           iconPath: "./../../utils/icon/Blogger.png"
//         }
//       ],
//       profileImage: [
//         {
//           imageFrom: "localhost",
//           path: "./../utils/img/profile.png",
//           isActive: false,
//           isLocal: true
//         },
//         {
//           imageFrom: "facebook",
//           path: "https://graph.facebook.com/100000510573524/picture?type=large",
//           isActive: true,
//           isLocal: false
//         }
//       ],
//       myself:
//         "I am an enthusiastic Software Engineer that have experience in software development in Sri Lanka as well as Abu Dhabi(UAE) and have 3+ years’ experience. I'm mainly focused on architecture, design and development web platforms.",
//       social: [
//         {
//           site: "LinkedIn",
//           url: "https://www.linkedin.com/in/ishara-madawa-0608558a/",
//           iconPath: "./../../utils/icon/linkedin-icon.png"
//         },
//         {
//           site: "Facebook",
//           url: "https://www.facebook.com/ishara.madawa",
//           iconPath: "./../../utils/icon/facebook-icon.png"
//         },
//         {
//           site: "@isharamadawa",
//           url: "https://twitter.com/isharamadawa",
//           iconPath: "./../../utils/icon/twitter-icon.png"
//         }
//       ]
//     },
//     svn: [
//       {
//         site: "GitHub",
//         url: "https://github.com/IsharaMadawa",
//         iconPath: "./../../utils/icon/github-icon.png"
//       },
//       {
//         site: "BitBucket",
//         url: "https://bitbucket.org/MadXish/",
//         iconPath: "./../../utils/icon/bitbucket-icon.png"
//       }
//     ],
//     currentCompany: "Data Management Systems (PVT) Ltd",
//     currentPosition: "Software Engineer",
//     experience: [
//       {
//         organizationShortName: "DMS",
//         organization: "Data Management Systems (PVT) Ltd.",
//         country: "Sri Lanka",
//         position: "Software Engineer",
//         details: "",
//         duration: "2016 July - Currently",
//         responsibilities: [
//           "Responsible in Integrated Security System in Sri Lanka Port Authority entire system design and develop Web API, RFID Module, Workflows, SDK and Active Directory, Deployments,Integrations.",
//           "Develop and maintain responsibility in Inventory and Purchasing process in ERP System (In-House development project).",
//           "Responsible in all research and development process in .Net base technologies and SDKs and Integration, Maintain.",
//           "Responsible in Integration, developing in all Active directory, SQL server, ELK Stack, SonarQube, Jenkins.",
//           "Responsible in leading small group towards project goals.",
//           "Modify and Support all .Net Base Systems at DMS (PVT) Ltd."
//         ]
//       },
//       {
//         organizationShortName: "ZHO",
//         organization: "Zayed Higher Organization",
//         country: "Abu Dhabi, United Arab Emirates",
//         position: "Software Engineer - Web",
//         details: "Contract Base",
//         duration: "2018 April - 2019 April",
//         responsibilities: [
//           "Responsible in develop, testing, integration and maintain Wjhtna system in Zayad Higher Organization",
//           "Managing, Communicating with Outsources projects companies and maintain application release process."
//         ]
//       }
//     ],
//     education: [
//       {
//         institute:
//           "National School of Business Management affiliated with Plymouth University",
//         title: "BSc(Hons) in Software Engineering",
//         details: "",
//         marks: "Second Class Upper division",
//         duration: "2013 April - 2016 June"
//       },
//       {
//         institute: "Data Information Bureau",
//         title: "Higher Diploma in Software Engineering",
//         details: "",
//         marks: "",
//         duration: "2009 January - 2009 September"
//       }
//     ],
//     certifications: [],
//     awards: [],
//     interest: [
//       "I follow a number of sci-fi and fantasy, Animation genre movies and television shows, music, even cooking :D. and I spend a large amount of my free time exploring the latest technology in the web and mobile development world. And testing things for fun.",
//       "Apart from being a developing stuff, I enjoy my time being outdoors. Riding bike, Traveling, etc.",
//       "Most recently I’m following on WebRTC, NodeJS, React, Cloud platforms like heroku, AWS and mobile application development using react native and Flutter. And i have interest in fields like WebAssembly."
//     ],
//     skillSet: [
//       {
//         title: "UI",
//         skills: ["ReactJS", "JavaScript", "(ES6+)", "jQuery", "HTML", "CSS"]
//       },
//       {
//         title: "Backend",
//         skills: ["C#", "NodeJS", "C++ (QT)"]
//       },
//       {
//         title: "Frameworks",
//         skills: [
//           "ASP.net Web API",
//           "ASP.net MVC5",
//           "Workflow Foundation",
//           "WCF",
//           "AD",
//           "SignalR",
//           "Express"
//         ]
//       },
//       {
//         title: "Other",
//         skills: ["OWIN", "OAuth", "ASP.net Identity", "MSMQ", "Log4net"]
//       },
//       {
//         title: "Database",
//         skills: ["SQL Server", "Oracle 12C", "SQLite", "Mongo"]
//       },
//       {
//         title: "Reporting",
//         skills: ["SSRS", "Crystal Report", "BIRT", "RDLC"]
//       },
//       {
//         title: "Hosting/Platforms",
//         skills: ["IIS", "Heroku"]
//       },
//       {
//         title: "Tools",
//         skills: ["IDWorks"]
//       },
//       {
//         title: "Collaboration",
//         skills: ["GIT", "TFS", "ELS Stack", "Jenkins", "SonarQube", "JIRA"]
//       }
//     ],
//     projects: [
//       {
//         name: "My Digital CV",
//         title: "Digital CV - Ishara Madawa",
//         company: "Hobby",
//         details:
//           "This is one of my live hosted projects that I have created for learning purpose and also fun. Written Using ReactJS and NodeJS backend with mongo DB. Hosted in Heroku free tier and MLab for mongo db hosting.",
//         link: "http://isharamadawa.herokuapp.com",
//         github: [
//           "https://github.com/IsharaMadawa/DigitalCV_Server",
//           "https://github.com/IsharaMadawa/DigitalCV_Web"
//         ],
//         MostReasonHighlights: true,
//         myProjects: true
//       },
//       {
//         name: "MadXAudio",
//         title: "Group Audio Conference App",
//         company: "Hobby",
//         details:
//           "This is another one of my live hosted project that i have created for learning purpose and also fun. Web Application is JavaScript  application hosted as PHP app in Heroku and NodeJS backend with WebRTC libraries (RTCMulticonnection). Hosted in Heroku free tier. I created this application when i was in Abu Dhabi (UAE) for my personal use. This application is using socket.io server as a signaling server and WebRTC libraries fir capturing audio and video streams from client application. I have study and learned lots of things my self about RTC technologies.",
//         link: "https://madxaudio.herokuapp.com",
//         github: [
//           "https://github.com/IsharaMadawa/madxaudio-web",
//           "https://github.com/IsharaMadawa/madxaudio-api"
//         ],
//         MostReasonHighlights: true,
//         myProjects: true
//       },
//       {
//         name: "Wjhtna",
//         title:
//           "Compleate System for track progress students individually in ZHO",
//         company: "ZHO",
//         details:
//           "Track progress of students that have disabilities in Zayed Higher Organization. Create several plans between students, parents and teachers and management. Wjhtna is collection of separate systems under one domain.",
//         MostReasonHighlights: true,
//         myProjects: false
//       },
//       {
//         name: "Integrated Security System - Sri Lanka Port Authority",
//         title: "",
//         company: "DMS",
//         details:
//           "Security System for issuing passes for internal and external users.",
//         MostReasonHighlights: false,
//         myProjects: false
//       },
//       {
//         name:
//           "Integrated Security System - Sri Lanka Port Authority - RFID Module",
//         title: "",
//         company: "DMS",
//         details:
//           "Security System for issuing passes for internal and external users, Vehicles including RFID base tags etc.",
//         responsibility: "Develop, Maintain and deploy RFID project.",
//         MostReasonHighlights: false,
//         myProjects: false
//       },
//       {
//         name: "Middleware for Mires Global",
//         title: "",
//         company: "DMS",
//         details:
//           "This middle layer web service act as an intermediary interface between Airline Reservation and car Rental Companies",
//         responsibility: "",
//         MostReasonHighlights: false,
//         myProjects: false
//       },
//       {
//         name: "ERP System – In House Development",
//         title: "",
//         company: "DMS",
//         details:
//           "This middle layer web service act as an intermediary interface between Airline Reservation and car Rental Companies",
//         responsibility: "",
//         MostReasonHighlights: false,
//         myProjects: false
//       }
//     ],
//     referees: [
//       {
//         title: "Mr.",
//         name: "Ziad Hawamdeh",
//         position: "Senior Principal Analyst",
//         organization: "Zayed Higher Organization",
//         email: "ziad.hawamdeh",
//         mobileNo: ["00971565554042"],
//         address: "United Arab Emirates"
//       },
//       {
//         title: "Mr.",
//         name: "Nimesh Fonseka",
//         position: "Senior Software Engineer",
//         organization: "Kerk Solutions(PVT) Ltd",
//         email: "nimesh.fonseka22",
//         mobileNo: ["0094779766240"],
//         address: "Sri Lanka"
//       }
//     ]
//   });
//   await cvDetails.save();
//   res.send(cvDetails);
// });

module.exports = router;
