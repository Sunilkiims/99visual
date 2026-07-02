import { NextResponse } from "next/server";
import crypto from "crypto";

function sign(value: string) {
  return crypto
    .createHmac("sha256", process.env.CAPTCHA_SECRET!)
    .update(value)
    .digest("hex");
}

export async function GET() {
  const a = Math.floor(Math.random() * 10) + 1; // 1-10
  const b = Math.floor(Math.random() * 10) + 1; // 1-10
  const answer = (a + b).toString();

  // token = "timestamp:signature", so we can also expire old tokens
  const timestamp = Date.now().toString();
  const token = `${timestamp}:${sign(`${answer}:${timestamp}`)}`;

  return NextResponse.json({
    question: `${a} + ${b} = ?`,
    token,
  });
}