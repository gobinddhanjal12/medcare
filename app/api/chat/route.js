import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Groq API key is missing" },
        { status: 500 }
      );
    }

    const systemPrompt =
      "You are MedCare AI, a trusted medical assistant. Answer clearly and concisely.";

    const chatMessages = [
      {
        role: "system",
        content: systemPrompt,
      },
      ...messages.map((msg) => ({
        role: msg.isUser ? "user" : "assistant",
        content: msg.text,
      })),
    ];

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: chatMessages,
          temperature: 0.7,
          max_tokens: 1024,
        }),
      }
    );

    const data = await response.json();

    console.log(
      "Raw Groq response:",
      JSON.stringify(data, null, 2)
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          error: data?.error?.message || "Groq API Error",
          data,
        },
        {
          status: response.status,
        }
      );
    }

    const reply =
      data?.choices?.[0]?.message?.content?.trim() ||
      "No response from AI";

    return NextResponse.json({
      response: reply,
    });
  } catch (error) {
    console.error("Groq fetch error:", error);

    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}
