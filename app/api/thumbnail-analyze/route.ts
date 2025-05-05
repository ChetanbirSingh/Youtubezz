import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageUrl } = body;

    if (!imageUrl || typeof imageUrl !== "string") {
      return NextResponse.json({ error: "Invalid or missing imageUrl" }, { status: 400 });
    }

    const visionRes = await fetch(
      `https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_VISION_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          requests: [
            {
              image: {
                source: {
                  imageUri: imageUrl,
                },
              },
              features: [
                { type: "LABEL_DETECTION", maxResults: 5 },
                { type: "WEB_DETECTION", maxResults: 5 },
              ],
            },
          ],
        }),
      }
    );

    const data = await visionRes.json();

    if (!visionRes.ok) {
      console.error("❌ Google Vision API Error:", data);
      return NextResponse.json({ error: "Vision API call failed", detail: data }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("❌ Server error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}