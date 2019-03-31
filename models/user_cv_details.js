const mongoose = require("mongoose");

const UserCVDetailsSchema = new mongoose.Schema({
  user: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      blogging: [
        {
          type: new mongoose.Schema({
            site: {
              type: String
            },
            url: {
              type: String
            },
            iconPath: {
              type: String
            }
          })
        }
      ],
      email: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      },
      mobile: [String],
      myself: {
        type: String,
        required: true
      },
      profileImage: [
        {
          type: new mongoose.Schema({
            imageFrom: {
              type: String
            },
            path: {
              type: String
            },
            isActive: {
              type: Boolean,
              default: false
            },
            isLocal: {
              type: Boolean,
              default: false
            }
          })
        }
      ],
      social: [
        {
          type: new mongoose.Schema({
            site: {
              type: String
            },
            url: {
              type: String
            },
            iconPath: {
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
        },
        iconPath: {
          type: String
        }
      })
    }
  ],
  skills: [String],
  defaultProfile: {
    type: Boolean,
    default: false
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
      })
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
          maxlength: 255
        },
        mobileNo: [String],
        address: {
          type: String
        }
      })
    }
  ],
  createdDate: {
    type: Date,
    default: new Date()
  },
  lastUpdatedDate: {
    type: Date,
  },
});

const UserCVDetails = mongoose.model("UserCVDetails", UserCVDetailsSchema);
exports.UserCVDetails = UserCVDetails;
