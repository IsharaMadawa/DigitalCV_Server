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

  doc.text("This is a Header", 20, doc.page.height - 50, {
    lineBreak: true
  });

  doc.fontSize(15).text(cvDetails[0].user.name, 50, 50);

  // Set the paragraph width and align direction
  doc.text(
    "Wally Gator is a swinging alligator in the swamp. He's the greatest percolator when he really starts to romp. There has never been a greater operator in the swamp. See ya later, Wally Gator.",
    {
      width: 410,
      align: "left"
    }
  );

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

router.post("/", async (req, res) => {
  let cvDetails = new UserCVDetails({
    user: {
      name: "Ishara Madawa Kumararathna",
      mobile: ["+94712197222"],
      email: "dev.madawa@gmail.com",
      address: "No 21, Supreme City, Karundupona, Kegalla",
      blog: "http://codestreetblog.blogspot.com/",
      social: [
        {
          site: "LinkedIn",
          url: "https://www.linkedin.com/in/ishara-madawa-0608558a/"
        },
        {
          site: "Facebook",
          url: "https://www.facebook.com/ishara.madawa"
        }
      ]
    },
    svn: [
      {
        site: "GitHub",
        url: "https://github.com/IsharaMadawa"
      },
      {
        site: "BitBucket",
        url: "https://bitbucket.org/MadXish/"
      }
    ],
    currentCompany: "Data Management Systems (PVT) Ltd",
    currentPosition: "Software Engineer",
    experience: [
      {
        organizationShortName: "DMS",
        organization: "Data Management Systems (PVT) Ltd.",
        country: "Sri Lanka",
        position: "Software Engineer",
        details: "",
        duration: "2016 July - Currently",
        responsibilities: [
          "Responsible in Integrated Security System in Sri Lanka Port Authority entire system design and develop Web API, RFID Module, Workflows, SDK and Active Directory, Deployments,Integrations.",
          "Develop and maintain responsibility in Inventory and Purchasing process in ERP System (In-House development project).",
          "Responsible in all research and development process in .Net base technologies and SDKs and Integration, Maintain.",
          "Responsible in Integration, developing in all Active directory, SQL server, ELK Stack, SonarQube, Jenkins.",
          "Responsible in leading small group towards project goals.",
          "Modify and Support all .Net Base Systems at DMS (PVT) Ltd."
        ]
      },
      {
        organizationShortName: "ZHO",
        organization: "Zayed Higher Organization",
        country: "Abu Dhabi, United Arab Emirates",
        position: "Software Engineer - Web",
        details: "Contract Base",
        duration: "2018 April - 2019 April",
        responsibilities: [
          ,
          "Responsible in develop, testing, integration and maintain all new systems in Zayad Higher Organization",
          "Managing, Communicating with Outsources projects companies and maintain application release process."
        ]
      }
    ],
    education:[],
    interest :[
  "I follow a number of sci-fi and fantasy, Animation genre movies and television shows, music, even cooking :D. and I spend a large amount of my free time exploring the latest technology in the web and mobile development world. And testing things for fun.",
  "Apart from being a developing stuff, I enjoy my time being outdoors. Riding bike, Traveling, etc."
  ],
    skillSet: [
      {
        title: "UI",
        skills: ["ReactJS", "JavaScript", "(ES6+)", "jQuery", "HTML", "CSS"]
      },
      {
        title: "Backend",
        skills: ["C#", "NodeJS", "C++ (QT)"]
      },
      {
        title: "Frameworks",
        skills: [
          "ASP.net Web API",
          "ASP.net MVC5",
          "Workflow Foundation",
          "WCF",
          "AD",
          "SignalR",
          "Express"
        ]
      },
      {
        title: "Other",
        skills: ["OWIN", "OAuth", "ASP.net Identity", "MSMQ", "Log4net"]
      },
      {
        title: "Database",
        skills: ["SQL Server", "Oracle 12C", "SQLite", "Mongo"]
      },
      {
        title: "Reporting",
        skills: ["SSRS", "Crystal Report", "BIRT", "RDLC"]
      },
      {
        title: "Hosting/Platforms",
        skills: ["IIS", "Heroku"]
      },
      {
        title: "Tools",
        skills: ["IDWorks"]
      },
      {
        title: "Collaboration",
        skills: ["GIT", "TFS", "ELS Stack", "Jenkins", "SonarQube", "JIRA"]
      }
    ],
    projects: [
      {
        name: "My Digital CV",
        title: "Digital CV - Ishara Madawa",
        company: "",
        details:
          "This is one of my live hosted projects that I have created for learning purpose and also fun. Web Application Using ReactJS and NodeJS backend with mongo DB. Hosted in Heroku free tier and MLab for mongo db hosting. this site including create cv automatically based on db data and updating  data via admin dashboard",
        link: "http://isharamadawa.herokuapp.com",
        github: [
          "https://github.com/IsharaMadawa/DigitalCV_Server",
          "https://github.com/IsharaMadawa/DigitalCV_Web"
        ],
        MostReasonHighlights: true,
        myProjects: true
      },
      {
        name: "MadXAudio",
        title: "Group Audio Conference App",
        company: "",
        details:
          "This is another one of my live hosted project that i have created for learning purpose and also fun. Web Application is JavaScript  application hosted as PHP app in Heroku and NodeJS backend with WebRTC libraries (RTCMulticonnection). Hosted in Heroku free tier. I created this application when i was in Abu Dhabi (UAE) for my personal use. This application is using socket.io server as a signaling server and WebRTC libraries fir capturing audio and video streams from client application. I have study and learned lots of thigs my self about RTC technologies.",
        link: "https://madxaudio.herokuapp.com",
        github: [
          "https://github.com/IsharaMadawa/madxaudio-web",
          "https://github.com/IsharaMadawa/madxaudio-api"
        ],
        MostReasonHighlights: true,
        myProjects: true
      },
      {
        name: "Wajthna",
        title: "System for track progress students individually in ZHO",
        company: "DMS",
        details:
          "Track progress of students that have disabilities in Zayed Higher Organization. Create and several sevaral plans between students, parents and teachers and management. Wjathna is collection of separate systems under one domain.",
        MostReasonHighlights: true,
        myProjects: false
      },
      {
        name: "Integrated Security System - Sri Lanka Port Authority",
        title: "",
        company: "DMS",
        details:
          "Security System for issuing passes for internal and external users.",
        MostReasonHighlights: false,
        myProjects: false
      },
      {
        name:
          "Integrated Security System - Sri Lanka Port Authority - RFID Module",
        title: "",
        company: "DMS",
        details:
          "Security System for issuing passes for internal and external users, Vehicles including RFID base tags etc.",
        responsibility: "Develop, Maintain and deploy RFID project.",
        MostReasonHighlights: false,
        myProjects: false
      },
      {
        name: "Middleware for Mires Global",
        title: "",
        company: "DMS",
        details:
          "This middle layer web service act as an intermediary interface between Airline Reservation and car Rental Companies",
        responsibility: "",
        MostReasonHighlights: false,
        myProjects: false
      },
      {
        name: "ERP System – In House Development",
        title: "",
        company: "DMS",
        details:
          "This middle layer web service act as an intermediary interface between Airline Reservation and car Rental Companies",
        responsibility: "",
        MostReasonHighlights: false,
        myProjects: false
      }
    ],
    referees: [
      {
        title: "Mr.",
        name: "Ziad Hawamdeh",
        position: "Senior Principal Analyst",
        organization: "Zayed Higher Organization",
        email: "ziad.hawamdeh@zho.ae",
        mobileNo: ["00971565554042"],
        address: "United Arab Emirates"
      },
      {
        title: "Mr.",
        name: "Nimesh Fonseka",
        position: "Senior Software Engineer",
        organization: "Kerk Solutions(PVT) Ltd",
        email: "nimesh.fonseka22@gmail.com",
        mobileNo: ["0094779766240"],
        address: "Sri Lanka"
      }
    ]
  });
  await cvDetails.save();
  res.send(cvDetails);
});

module.exports = router;
