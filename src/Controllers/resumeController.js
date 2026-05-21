const ProResume = require("../Models/ProResumeSchema");
const FreshResume = require("../Models/FreshResumeSchema")
const askGemini = require("../Helpers/AiHelper");

async function FresherResumeSave(req, res, next) {

try{

let {internshipPosition} = req.body

let internshipData = null

if(internshipPosition && internshipPosition.trim() !== ""){

internshipData = {
    position: req.body.internshipPosition,
    company: req.body.internshipCompany,
    startDate: req.body.internshipStartDate,
    endDate: req.body.internshipEndDate,
    description: req.body.internshipDes
}}

let projectsArray = [];

if (req.body.project1 && req.body.project1.trim() !== "") {
    projectsArray.push({
        name: req.body.project1,
        techStack: req.body.techStack1,
        description: req.body.projectDescription1,
        link : req.body.projectLink1
    });
}

if (req.body.project2 && req.body.project2.trim() !== "") {
    projectsArray.push({
        name: req.body.project2,
        techStack: req.body.techStack2,
        description: req.body.projectDescription2,
        link : req.body.projectLink2
    });
}


let fresherResumeData = {

  personalInfo: {
    fullName : req.body.fullName,
    jobTitle : req.body.jobTitle,
    email: req.body.email,
    phone:  req.body.phone,
    location: req.body.location,
    linkedin: req.body.linkedin,
    github:  req.body.github
  },

   objective: req.body.objective,

   education:{
    degree: req.body.degree, 
    institute: req.body.institute,
    gradYear: req.body.gradYear,
    GPA: req.body.GPA
   },

   certifications: req.body.certificationsName || "", 
    onlineCourses: req.body.onlineCourses || "",
    Achievements: req.body.Achievements || "",
    skills: req.body.PreviewSkills || [],
    Languages: req.body.fresherPreviewLanguages || [],

    internship: internshipData,

    projects: projectsArray

}

let resumeData = await FreshResume.create(fresherResumeData);
console.log(resumeData);


res.status(200).json({message: "Successfull", Data:resumeData})

}

catch(error){
next(error)
}

}


const ProResumeSave = async (req, res, next) => {
try {


let experienceArray = [];

if (req.body.expJobTitle1 && req.body.expJobTitle1.trim() !== "") {
    experienceArray.push({
        jobTitle: req.body.expJobTitle1,
        company: req.body.expCompany1,
        description: req.body.expDescription1,
        startDate: req.body.expStartDate1,
        endDate: req.body.expEndDate1
    });
}

if (req.body.expJobTitle2 && req.body.expJobTitle2.trim() !== "") {
    experienceArray.push({
        jobTitle: req.body.expJobTitle2,
        company: req.body.expCompany2,
        description: req.body.expDescription2,
        startDate: req.body.expStartDate2,
        endDate: req.body.expEndDate2
    });
}

let projectsArray = []

if(req.body.projectName1 && req.body.projectName1.trim() !== ""){
    projectsArray.push({
    title: req.body.projectName1,
    techStack: req.body.techStack1,
    description: req.body.projectDes1
    })
}

if(req.body.projectName2 && req.body.projectName2.trim() !== ""){
    projectsArray.push({
    title: req.body.projectName2,
    techStack: req.body.techStack2,
    description: req.body.projectDes2
    })
}


        const proResumeData = {
            personalInfo: {
                fullName: req.body.fullName,
                jobTitle: req.body.jobTitle,
                email: req.body.email,
                phone: req.body.phone,
                linkedin: req.body.linkedin,
                github: req.body.github,
                location: req.body.location,
                summary: req.body.summary 
            },
            
            education: {
                degree: req.body.degree,
                institution: req.body.institution,
                field: req.body.fieldOfStudy,
                year: req.body.year
            },

            experience: experienceArray, 
            projects: projectsArray,

            skills: req.body.skills || [],
            certifications: req.body.certifications || ""
        };

let resumeData = await ProResume.create(proResumeData);
console.log(resumeData);

        res.status(201).json({
            success: true,
            message: "Professional Resume saved successfully!",
            data: resumeData
        });

    } 
    
    catch (error) {
     next(error)
    }
};

module.exports = {ProResumeSave, FresherResumeSave}