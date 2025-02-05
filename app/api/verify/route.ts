import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { token } = await request.json();
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  const res = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
    { method: "POST" }
  );
  const data = await res.json();

  if (data.success) {
    return Response.json({ success: true, score: data.score }); // v3 returns a score
  } else {
    return Response.json({ success: false }, { status: 400 });
  }
}
