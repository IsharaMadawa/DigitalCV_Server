const mongoose = require("mongoose");

const UserCVDetailsSchema = new mongoose.Schema({
  user: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      blog: {
        type: String
      },
      email: {
        type: String
      },
      address: {
        type: String
      },
      Mobile: [String],
      social: [
        {
          type: new mongoose.Schema({
            site: {
              type: String
            },
            url: {
              type: String
            }
          })
        }
      ]
    }),
    required: true
  },
  currentCompany: String,
  currentPosition: String,
  svn: [
    {
      type: new mongoose.Schema({
        site: {
          type: String
        },
        url: {
          type: String
        }
      })
    }
  ],
  skills: [String],
  defaultProfile: {
    type: Boolean,
    default: true
  },
  experience: [
    {
      type: new mongoose.Schema({
        organizationShortName: {
          type: String,
          required: true
        },
        organization: {
          type: String,
          required: true
        },
        country: {
          type: String,
          required: true
        },
        position: {
          type: String,
          required: true
        },
        details: {
          type: String
        },
        responsibilities: [String],
        duration: String
      })
    }
  ],
  education: [
    {
      type: new mongoose.Schema({
        institute: {
          type: String,
          required: true
        },
        title: {
          type: String,
          required: true
        },
        details: {
          type: String
        },
        marks: {
          type: String
        },
        duration: {
          type: String
        }
      })
    }
  ],
  certifications: [String],
  awards: [String],
  interest: [String],
  skillSet: [
    {
      type: new mongoose.Schema({
        title: {
          type: String,
          required: true
        },
        skills: [String]
      }),
      required: true
    }
  ],
  projects: [
    {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true
        },
        title: {
          type: String
        },
        company: String,
        details: {
          type: String,
          required: true
        },
        url: String,
        github: [String],
        MostReasonHighlights: Boolean
      })
    }
  ],
  referees: [
    {
      type: new mongoose.Schema({
        title: {
          type: String,
          required: true
        },
        name: {
          type: String,
          required: true
        },
        position: {
          type: String,
          required: true
        },
        organization: {
          type: String,
          required: true
        },
        email: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 255,
          unique: true
        },
        mobileNo: [String],
        address: {
          type: String
        }
      })
    }
  ]
});

const UserCVDetails = mongoose.model("UserCVDetails", UserCVDetailsSchema);
exports.UserCVDetails = UserCVDetails;
