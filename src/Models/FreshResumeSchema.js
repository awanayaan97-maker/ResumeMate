const mongoose = require('mongoose');

const FreshResumeSchema = new mongoose.Schema({
    personalInfo: {
        fullName: String,
        jobTitle: String,
        email: String,
        phone: String,
        location: String,
        linkedin: String,
        github: String,
    },

    objective:{type: String},

    education: {
        degree: String,
        institute: String,
        field: String,
        gradYear: String,
        GPA: String
    },

    projects: [{ 
        name: String, 
        techStack: String, 
        description: String,
        link : String
    }],

    skills: [String], 

    certifications:{type: String},
    onlineCourses:{type: String},
    Achievements:{type: String},
    Languages: [String],

    internship: {
        position: String,
        company: String,
        startDate: String,
        endDate: String,
        description: String
    }
});


module.exports = mongoose.model('FreshResume', FreshResumeSchema);