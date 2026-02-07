import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const analyzeArticle = async (title, content) => {
    try {
        const prompt = `You are an expert editor for a content platform called Novus.
Analyze the following article and return a JSON object with exactly two keys:
1. "summary": A compelling 2-sentence TL;DR summary of the article.
2. "aiTags": An array of 3 to 5 relevant, SEO-friendly tags (single words or short phrases, lowercase).

Article Title: ${title}
Article Content: ${content}

Respond ONLY with valid JSON. No markdown, no code fences, no extra text.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: prompt,
        });

        const text = response.text.trim();

        const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        const result = JSON.parse(cleaned);

        return {
            summary: result.summary || "",
            aiTags: Array.isArray(result.aiTags) ? result.aiTags.slice(0, 5) : [],
        };
    } catch (error) {
        console.error("AI analysis failed:", error.response ? JSON.stringify(error.response, null, 2) : error);
        return { summary: "", aiTags: [] };
    }
};