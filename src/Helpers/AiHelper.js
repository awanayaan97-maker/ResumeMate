const { GoogleGenerativeAI } = require("@google/generative-ai");

// 🔥 VERCEL FIX: Tasalli karlo ke yeh naam Vercel ke Dashboard wale naam se match karta ho!
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || process.env.API_KEY2);

async function askGemini(userPrompt) {
    try {
        // Model name check: gemini-2.5-flash-lite bilkul sahi hai
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

        const result = await model.generateContent(userPrompt);
        const response = await result.response;
        
        return response.text();
    } catch (error) {
        console.error("Error inside askGemini utility:", error.message);
        throw error; 
    }
}

module.exports = askGemini;