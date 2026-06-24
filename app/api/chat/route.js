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

    const systemPrompt = `
You are MedCare AI, a professional medical assistant.

Rules:
- Answer only health and medical questions.
- Be clear, accurate, and concise.
- If symptoms are provided, suggest possible causes but do not provide a definitive diagnosis.
- Recommend consulting a healthcare professional for serious symptoms.
- Do not tell users to search online unless explicitly asked.
- Respond in plain text only.
- Do not mention that you are an AI unless asked.
`;

    console.log("Incoming Messages:", messages);

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

    console.log(
      "Groq Messages:",
      JSON.stringify(chatMessages, null, 2)
    );

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
          temperature: 0.3,
          max_tokens: 1000,
        }),
      }
    );

    const data = await response.json();

    console.log(
      "Raw Groq Response:",
      JSON.stringify(data, null, 2)
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          error: data?.error?.message || "Groq API Error",
          details: data,
        },
        {
          status: response.status,
        }
      );
    }

    const reply =
      data?.choices?.[0]?.message?.content?.trim() ||
      "Sorry, I couldn't generate a response.";

    return NextResponse.json({
      response: reply,
      data: data,
      response: data?.choices,
    });
  } catch (error) {
    console.error("Groq Route Error:", error);

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
