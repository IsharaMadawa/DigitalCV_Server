const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserCVDetailsSchema = new mongoose.Schema({
  user: {
    type: new mongoose.Schema({
      name: {
        type: String,
        required: true
      }
    }),
    required: true
  },
  currentCompany: String,
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
        specialPoints: [String],
        details: {
          type: String
        }
      })
    }
  ],
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
          type: String,
          required: true
        },
        details: {
          type: String,
          required: true
        }
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
