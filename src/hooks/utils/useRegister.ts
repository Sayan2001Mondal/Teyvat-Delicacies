import { NextResponse } from "next/server";
import { account, ID } from "@/hooks/utils/appwrite";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();
    const user = await account.create(ID.unique(), email, password, name);

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
