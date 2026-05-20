const mongoose = require('mongoose');

const ProResumeSchema = new mongoose.Schema({

    personalInfo: {
        fullName: { type: String, required: true },
        jobTitle: { type: String }, 
        email: { type: String, required: true },
        phone: { type: String },
        linkedin: { type: String },
        github: { type: String },
        location: { type: String },
       summary: { type: String } 
    },


    experience: [{
        jobTitle: { type: String },
        company: { type: String },
        startDate: { type: String },
        endDate: { type: String },
        description: { type: String } 
    }],

    education: {
        degree: { type: String },
        institution: { type: String },
        field: {type: String},
        year: { type: String }
    },

    projects: [{
        title: { type: String },
        techStack: { type: String },
        description: { type: String }
    }],

   
    skills: [String], 
    certifications: {type: String},

}, {timestamps: true});

module.exports = mongoose.model('ProResume', ProResumeSchema);