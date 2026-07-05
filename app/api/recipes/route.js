import { NextResponse } from "next/server";
import ai from "@/lib/gemini";

export async function POST(request) {
  try {
    const body = await request.json();

    const prompt = `
You are NutriNest AI.

The user has these ingredients:

${body.ingredients}

Generate exactly ONE recipe.

Rules:
- Use the given ingredients as much as possible.
- If an ingredient is missing, list it separately.
- Recipes should be simple and practical.
- Return ONLY valid JSON.
- Do not include markdown.
- Do not write explanations.

JSON Format:

{
  "title": "",
  "description": "",
  "prepTime": "",
  "cookTime": "",
  "difficulty": "",
  "ingredientsUsed": [],
  "missingIngredients": [],
  "steps": []
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let text = response.text;

    // Remove markdown if Gemini wraps the JSON
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const recipe = JSON.parse(text);

    return NextResponse.json(recipe);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}