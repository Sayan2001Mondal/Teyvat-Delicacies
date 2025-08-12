import { NextResponse } from "next/server";
import { account } from "@/hooks/utils/appwrite";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Create Appwrite session
    const session = await account.createEmailPasswordSession(email, password);

    // Save in cookies
    const res = NextResponse.json({ success: true, session });
    res.cookies.set("token", session.secret, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    return res;
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
