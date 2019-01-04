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
      address: "No 21, Supreme City, Karundupona, Kegalle",
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
    currentCompany: "Data Managment Systems(PVT) Ltd",
    currentPosition: "Software Engineer",
    experience: [
      {
        organizationShortName: "DMS",
        organization: "Data Management Systems(PVT) Ltd.",
        country: "Sri Lanka",
        position: "Software Engineer",
        details: "",
        duration: "2016 July - Currently",
        responsibilities: [
          "Responsible in Integrated Security System in Sri Lanka Port Authority entire system design and develop Web API, RFID Module, Workflows, SDK and Active Directory, Depolyments,Integrations.",
          "Develop and maintain responsibility in Inventory and Purchasing process in ERP System (In-House development project).",
          "Responsible in all research and development process in .Net base technologies and SDKs and Integration, Maintain.",
          "Responsible in Integration, developing in all Active directory, SQL server, ELK Stack, Sonarqube, Jenkins.",
          "Responsible in leading small group towards project goals.",
          "Modify and Support all .Net Base Systems at DMS (PVT) Ltd."
        ]
      },
      {
        organizationShortName: "ZHO",
        organization: "Zayad Higher Organization",
        country: "Abu Dabhi, United Arab Emirates",
        position: "Software Engineer - Web",
        details: "Contarct Base",
        duration: "2018 April - 2019 April",
        responsibilities: [
          ,
          "Responsible in develop, testing, integration and maintain all new systems in Zayad Higher Organization",
          "Managing, Communicating with Outsources projects companies and maintaine application release process."
        ]
      }
    ],
    skillSet: [
      {
        title: "UI",
        skills: ["ReactJS", "Javascript", "(ES6)", "Jquery", "HTML", "CSS"]
      },
      {
        title: "Backend",
        skills: ["C#", "NodeJS", "C++(QT)"]
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
        skills: ["IDWorks", "BizTalk(RFID)"]
      },
      {
        title: "Collaboration",
        skills: ["GIT", "TFS", "ELS Stack", "Jenkins", "SonarQube", "JIRA"]
      }
    ],
    projects: [
      {
        name: "Wajthna",
        title: "System for track progress students individually in ZHO",
        company: "DMS",
        details:
          "Track progress of students that have disabilities in Zayad Higher Organization. Create and maintain sevaral plans between students, parents and teachers and managment",
        MostReasonHighlights: true
      },
      {
        name: "Integrated Security System - Sri Lanka Port Authority",
        title: "",
        company: "DMS",
        details:
          "Security System for issuing passes for internal and external users.",
        MostReasonHighlights: false
      },
      {
        name:
          "Integrated Security System - Sri Lanka Port Authority - RFID Module",
        title: "",
        company: "DMS",
        details:
          "Security System for issuing passes for internal and external users, Vehicles including RFID base tags etc.",
        responsibility: "Develop, Maintain and deploy RFID project.",
        MostReasonHighlights: false
      },
      {
        name: "Middleware for Mires Global",
        title: "",
        company: "DMS",
        details:
          "This middle layer web service act as an intermediary interface between Airline Reservation and car Rental Companies",
        responsibility: "",
        MostReasonHighlights: false
      },
      {
        name: "ERP System – In House Development",
        title: "",
        company: "DMS",
        details:
          "This middle layer web service act as an intermediary interface between Airline Reservation and car Rental Companies",
        responsibility: "",
        MostReasonHighlights: false
      }
    ],
    referees: [
      {
        title: "Mr.",
        name: "Ziad Hawamdeh",
        position: "Senior Principal Analyst",
        organization: "Zayad Higher Organization",
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
