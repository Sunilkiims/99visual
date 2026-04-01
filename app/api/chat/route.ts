import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(req: Request) {
  const { message } = await req.json();

  console.log("User message:", message);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `
You are an AI assistant for 99 Visual.

99 Visual is a digital solutions company offering:
- Website Development
- Web Applications
- Digital Marketing & SEO
- 3D Visualization
- CAD, GIS, LiDAR & Photogrammetry
- IT Consulting

The website is https://99visual.com.

Your job is to help visitors understand services and guide them to contact the company.
`,
      },
      {
        role: "user",
        content: message,
      },
    ],
  });

  return NextResponse.json({
    reply: completion.choices[0].message.content,
  });
}