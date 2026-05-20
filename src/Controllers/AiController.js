const { GoogleGenerativeAI }  = require("@google/generative-ai");
const askGemini = require("../Helpers/AiHelper");

async function geminiSummaryResponse(req, res, next) {

  
const { summary, title } = req.body;

try{

const prompt = `You are an expert career coach and professional resume writer specializing in the ${title} field.

Your task: Transform the provided professional summary into a polished, ATS-friendly summary that is COMPLETE and ready to paste into a resume.

**Critical Instructions:**
1. REMOVE all placeholders like [mention...], [e.g...], [quantifiable...], [specific...]
2. REPLACE all brackets with realistic, professional content relevant to ${title}
3. If the summary mentions "key technologies" - fill it with 2-3 actual technologies common in ${title} roles
4. If the summary mentions "quantifiable achievement" - create a realistic achievement example (e.g., "improved performance by 25%", "reduced load time by 40%", "increased conversion by 15%")
5. If the summary mentions "specific metric" - add a realistic example
6. Keep it 3-5 sentences, 50-75 words maximum
7. Maintain professional, confident tone
8. NO brackets, NO placeholders, NO asking user for anything
9. Output ONLY the final summary text - nothing else

**Title/Role:** ${title}

**Original Summary:**
"${summary}"

**Final Output:**
Generate the COMPLETE, FINAL professional summary with all placeholders replaced. Ready to copy-paste. No brackets. No instructions.`;

let summarObj = {}

const response = await askGemini(prompt);

console.log(response);

if(response){
summarObj.summary = response.trim()
}

else {   
summarObj.summary = "Could not enhance summary at this moment.";
}

res.status(200).json({message: "Successfull", data:summarObj})

}


catch (error) {
  next(error)
}

}

async function geminiDescriptionResponse(req, res, next) {
  let {description, jobTitle, company} = req.body;

  try {
    
   const prompt = `
  You are an expert Resume Writer. Your task is to write 3 professional, high-impact bullet points for a "Work Experience" section.

  INPUT DATA:
  - Job Title: "${jobTitle}"
  - Company: "${company}"
  - Raw User Tasks: "${description}"

  STRICT RULES:
  1. Output must be exactly 3 points.
  2. Start each point with a strong Action Verb (e.g., Optimized, Developed, Managed).
  3. Keep points professional, concise, and result-oriented.
  4. DO NOT use brackets [ ] or placeholders.
  5. RETURN ONLY A VALID JSON OBJECT.

  JSON FORMAT:
  {
    "point1": "First professional bullet point",
    "point2": "Second professional bullet point",
    "point3": "Third professional bullet point"
  }
`;

const response = await askGemini(prompt);
console.log(response);

const startIndex = response.indexOf("{");
    const endIndex = response.lastIndexOf("}");

    if (startIndex !== -1 && endIndex !== -1) {
       
    const cleanJson = response.substring(startIndex, endIndex + 1);
        
    const parseData = JSON.parse(cleanJson);

    res.status(200).json({message: "Successfull", enhanceData: parseData})
  }


  } 
  
  catch (error) {
    next(error);
  }

}

async function geminiDescriptionFreshers(req, res, next) {
  let {description, project, stack} = req.body;

  try {
    
const prompt = `Act as a Senior Career Consultant and Professional Resume Writer. 
Your task is to enhance a project description for a Fresh Graduate's resume.

### INPUT DATA PROVIDED:
${project}
${stack}
${description}

### OBJECTIVE:
Transform the raw description into 3 high-impact, professional bullet points. 
The points must be universal enough to fit any field (Engineering, Medical, Tech, Business, etc.) based on the input.

### GUIDELINES FOR BULLETS:
- Start each bullet with a powerful Action Verb (e.g., Developed, Analyzed, Orchestrated, Conducted, Designed).
- Focus on the "Task", the "Action" taken, and the "Result/Impact" (STAR method).
- Use professional terminology relevant to the provided Methodology/Tools.
- Keep each bullet concise (max 20 words).
- Avoid "I" or "My" (e.g., instead of "I built", use "Developed").

### OUTPUT FORMAT (STRICT JSON):
You must respond ONLY with a JSON object. Do not include any conversational text or markdown blocks. 
Structure:
{
  "status": "success",
  "data": {
    "point1": "First enhanced bullet point here",
    "point2": "Second enhanced bullet point here",
    "point3": "Third enhanced bullet point here"
  }
}

### STRICT RULES:
- If the input is in Urdu/Roman Urdu, translate and enhance it into professional English.
- If the input is too vague, use your professional judgment to create plausible, high-impact bullets based on the Project Title and Tools provided.
- NO extra talk. NO explanations. ONLY the JSON.`

const response = await askGemini(prompt);
console.log(response);

const startIndex = response.indexOf("{");
    const endIndex = response.lastIndexOf("}");

    if (startIndex !== -1 && endIndex !== -1) {
       
    const cleanJson = response.substring(startIndex, endIndex + 1);
        
    const parseData = JSON.parse(cleanJson);

    res.status(200).json({message: "Successfull", data: parseData})
  }


  } 
  
  catch (error) {
    next(error);
  }

}

async function geminiObjectiveFreshers(req, res, next) {
  

try{

const { objective } = req.body;

    console.log("[v0] RECEIVED OBJECTIVE:", objective);

    const prompt = `IMPORTANT: This is a NEW request. Do NOT reference any previous responses.

You are an expert professional resume writer with 15+ years of experience writing career objectives across Technology, Healthcare, Engineering, Finance, Marketing, and Management industries.

Your task: Transform the user's career objective into a compelling, polished, 3-sentence professional career objective.

**IDENTIFY THE FIELD:**
Look at the user's input and identify the industry/field:
- Technology: code, developer, programmer, software, javascript, react, node, python, IT, web
- Healthcare: doctor, nurse, medical, health, MBBS, BDS, hospital, patient, clinical
- Engineering: engineer, civil, mechanical, electrical, structural, construction, CAD
- Finance: finance, accounting, CA, CPA, banking, investment, auditor, budget
- Marketing: marketing, sales, branding, campaign, digital, SEO, social media, advertising
- Management: project manager, operations, HR, management, leadership, team lead
- If none match: Use GENERAL BUSINESS

**OUTPUT EXACTLY 3 SENTENCES:**
Sentence 1: The specific role + key expertise (Make it clear what position they want)
Sentence 2: 2-3 relevant skills/achievements unique to their field (Use industry keywords)
Sentence 3: Career aspiration + value they want to deliver (Show commitment to growth)

**STRICT REQUIREMENTS:**
✓ ZERO brackets [], NO [like this], NO placeholders
✓ NO generic filler phrases ("seeking a challenging role", "utilize my skills")
✓ Use strong action verbs: drive, optimize, accelerate, innovate, transform, deliver, advance
✓ Use industry-specific terminology and keywords
✓ Sound confident, professional, and realistic
✓ Each sentence must have substance and specific information
✓ NO explanations, NO alternatives, NO questions to user
✓ Output ONLY the 3-sentence objective - nothing else

**USER'S OBJECTIVE:**
"${objective}"

**GENERATE THE 3-SENTENCE PROFESSIONAL OBJECTIVE NOW:**`;

 console.log("[v0] SENDING PROMPT TO GEMINI");

const response = await askGemini(prompt);
console.log(response);

res.status(200).json({message: "Successfull", update: response})

}


catch (error) {
  next(error)
}
    
  

}


module.exports = {geminiSummaryResponse, geminiDescriptionResponse, geminiDescriptionFreshers, geminiObjectiveFreshers}