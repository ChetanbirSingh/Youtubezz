import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  const res = await fetch("https://api-inference.huggingface.co/models/facebook/bart-large-cnn", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: text }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Hugging Face API Error:", data);
    return NextResponse.json({ error: "Summarization failed" }, { status: 500 });
  }
  console.log(data)
  return NextResponse.json({ summary: data[0]?.summary_text ?? "No summary found" });
}
