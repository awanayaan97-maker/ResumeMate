const { GoogleGenerativeAI }  = require("@google/generative-ai");


const genAI = new GoogleGenerativeAI(process.env.API_KEY2);

async function askGemini(userPrompt) {

try {
    
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });


const result = await model.generateContent(userPrompt);
 const response = await result.response;
  
 
return response.text();

} 

catch (error) {
    console.error("Error inside askGemini utility:", error.message);
    throw error; 
}


}

module.exports = askGemini


