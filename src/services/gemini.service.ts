import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY || "");

const getModel = () => genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Helper to clean AI response
const cleanResponse = (text: string) => text.replace(/```json|```/g, "").trim();

export const generateSocialContent = async (topic: string, platform: string, tone: string) => {
    const model = getModel();
    const prompt = `You are an expert social media strategist. 
    Topic: ${topic}
    Platform: ${platform}
    Tone: ${tone}
    Task: Generate a high-performing post. Return ONLY the text content.`;

    try {
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("Gemini Error:", error);
        throw error;
    }
};

export const repurposeContent = async (originalContent: string, targetPlatform: string) => {
    const model = getModel();
    const prompt = `Repurpose this content for ${targetPlatform}. Maintain the core message but optimize for ${targetPlatform}'s audience and format.
    Content: ${originalContent}
    Return ONLY the new content.`;

    try {
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("Gemini Repurpose Error:", error);
        throw error;
    }
};

export const generateContentStrategy = async (niche: string, goal: string) => {
    const model = getModel();
    const prompt = `Generate a 7-day content strategy for the niche: ${niche}. 
    Goal: ${goal}
    Return valid JSON in this format: 
    { "week": [ { "day": "Day 1", "platform": "tiktok", "contentType": "Educational", "prompt": "...", "reason": "..." } ] }`;

    try {
        const result = await model.generateContent(prompt);
        return JSON.parse(cleanResponse(result.response.text()));
    } catch (error) {
        console.error("Gemini Strategy Error:", error);
        throw error;
    }
};

export const getAudienceInsights = async (niche: string) => {
    const model = getModel();
    const prompt = `Provide 3 deep audience insights for the niche: ${niche}.
    Return valid JSON: { "painPoints": [], "aspirations": [], "trendingTopics": [] }`;

    try {
        const result = await model.generateContent(prompt);
        return JSON.parse(cleanResponse(result.response.text()));
    } catch (error) {
        console.error("Gemini Insights Error:", error);
        throw error;
    }
};

export const fetchTrendingNews = async (niche: string) => {
    const model = getModel();
    const prompt = `What are the top 3 trending news or viral topics in the ${niche} niche right now?
    Return valid JSON: [ { "title": "...", "summary": "...", "url": "#", "source": "News", "timeAgo": "2h ago" } ]`;

    try {
        const result = await model.generateContent(prompt);
        return JSON.parse(cleanResponse(result.response.text()));
    } catch (error) {
        console.error("Gemini Trends Error:", error);
        return [];
    }
};

export const analyzeContentForVirality = async (content: string) => {
    const model = getModel();
    const prompt = `Analyze this content for virality potential. Provide a score (1-100) and suggestions.
    Content: ${content}
    Return valid JSON: { "score": 85, "reasoning": "...", "hookSuggestions": [], "ctaSuggestions": [], "hashtagSuggestions": [] }`;

    try {
        const result = await model.generateContent(prompt);
        return JSON.parse(cleanResponse(result.response.text()));
    } catch (error) {
        console.error("Gemini Virality Error:", error);
        throw error;
    }
};

export const analyzeCompetitor = async (url: string) => {
    const model = getModel();
    const prompt = `Analyze the content strategy and branding of this URL: ${url}.
    Return a summary of their strengths, weaknesses, and a recommended counter-strategy.`;

    try {
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error("Gemini Competitor Error:", error);
        throw error;
    }
};

// Video Editor AI Methods
export const generateTeaserPrompt = async (script: string) => {
    const model = getModel();
    const prompt = `Generate a cinematic visual prompt for a 5-second video teaser based on this script: ${script}. 
    Focus on lighting, camera angle, and mood.`;
    const result = await model.generateContent(prompt);
    return result.response.text();
};

export const generateSceneDescription = async (sceneNumber: number, context: string) => {
    const model = getModel();
    const prompt = `Describe scene ${sceneNumber} for a video about ${context}. Include visual elements and transitions.`;
    const result = await model.generateContent(prompt);
    return result.response.text();
};

export const suggestSoundtrack = async (mood: string, duration: number) => {
    const model = getModel();
    const prompt = `Suggest a type of background music for a ${duration}s video with a ${mood} mood. Describe the instruments and tempo.`;
    const result = await model.generateContent(prompt);
    return result.response.text();
};

export const generateVoiceoverScript = async (baseText: string, tone: string) => {
    const model = getModel();
    const prompt = `Convert this text into a natural, engaging voiceover script with a ${tone} tone. 
    Text: ${baseText}
    Include [pause] markers where appropriate.`;
    const result = await model.generateContent(prompt);
    return result.response.text();
};

export const generateCaptions = async (audioContext: string) => {
    const model = getModel();
    const prompt = `Generate SRT format captions for this content: ${audioContext}. 
    Ensure high readability and sync markers.`;
    const result = await model.generateContent(prompt);
    return result.response.text();
};

export const rewriteText = async (text: string, style: string) => {
    const model = getModel();
    const prompt = `Rewrite this text in a ${style} style. 
    Text: ${text}`;
    const result = await model.generateContent(prompt);
    return result.response.text();
};

// Business AI Methods
export const generateSponsorshipPitch = async (brandName: string, niche: string, metrics: string) => {
    const model = getModel();
    const prompt = `Write a professional sponsorship pitch email to ${brandName}. 
    My niche: ${niche}. 
    My metrics: ${metrics}.
    Return valid JSON: { "subject": "...", "emailBody": "...", "keySellingPoints": [] }`;
    const result = await model.generateContent(prompt);
    return JSON.parse(cleanResponse(result.response.text()));
};

export const generateLegalDoc = async (docType: string, partyNames: string) => {
    const model = getModel();
    const prompt = `Generate a draft for a ${docType} agreement between ${partyNames}. Use standard legal terminology.`;
    const result = await model.generateContent(prompt);
    return result.response.text();
};

export const generateOutsourcingBrief = async (role: string, task: string) => {
    const model = getModel();
    const prompt = `Generate a detailed freelancer brief for a ${role} to perform task: ${task}.
    Include expectations, style guide, and delivery requirements.`;
    const result = await model.generateContent(prompt);
    return result.response.text();
};
export const generateEngagementSuggestions = async (niche: string) => {
    const model = getModel();
    const prompt = `Generate 3 high-engagement questions and 3 poll ideas for the niche: ${niche}.
    Return valid JSON: { "questions": [], "polls": [] }`;
    const result = await model.generateContent(prompt);
    return JSON.parse(cleanResponse(result.response.text()));
};
