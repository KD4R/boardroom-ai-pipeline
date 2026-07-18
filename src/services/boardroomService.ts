/**
 * TODO:
 * - Verify active Gemini model ID
 * - Add retry logic for 429 errors
 * - Add fallback model support
 * - Add JSON repair mechanism
 */
// src/services/boardroomService.ts

import { GoogleGenAI } from "@google/genai";
import { validateBoardroomResponse } from "../ai/validator";
import { generateBoardroomPrompt } from "../prompts/boardroomPrompt";

import {
  StartupInput,
  BoardroomResponse,
} from "../types/boardroom";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function analyzeStartup(
  startup: StartupInput
): Promise<BoardroomResponse> {
  try {
    const prompt = generateBoardroomPrompt(startup);

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const rawText = response.text;

    if (!rawText) {
      throw new Error("Gemini returned an empty response.");
    }

    const cleanedResponse = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed: BoardroomResponse =
  JSON.parse(cleanedResponse);

if (!validateBoardroomResponse(parsed)) {
  throw new Error(
    "Invalid Boardroom response structure."
  );
}

return {
  ...parsed,
  createdAt: new Date().toISOString(),
};
  } catch (error) {
    console.error("Boardroom AI Error:", error);

    throw new Error(
      "Failed to generate boardroom analysis."
    );
  }
}