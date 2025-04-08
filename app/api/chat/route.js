import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is missing" },
        { status: 500 }
      );
    }

    // Build the prompt
    const systemPrompt =
      "You are MedCare AI, a trusted medical assistant. Answer clearly and concisely.";
    const userMessages = messages.map((msg) => msg.text).join("\n");
    const finalPrompt = `${systemPrompt}\n${userMessages}`;

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: finalPrompt }] }],
        }),
      }
    );

    const data = await response.json();
    console.log("Raw Gemini response:", JSON.stringify(data, null, 2));

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "No response from Gemini";

    return NextResponse.json({ response: reply });
  } catch (error) {
    console.error("Gemini fetch error:", error.message);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
