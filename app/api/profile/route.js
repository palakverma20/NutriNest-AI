import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("nutrinest");

    const profile = await db.collection("profiles").findOne({
      userEmail: email,
    });

    return NextResponse.json({
      success: true,
      profile,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const {
      userEmail,
      phone,
      dateOfBirth,
      gender,
      dietaryPreference,
      cookingExperience,
      spicePreference,
      language,
    } = body;

    const client = await clientPromise;
    const db = client.db("nutrinest");

    await db.collection("profiles").updateOne(
      { userEmail },
      {
        $set: {
          phone,
          dateOfBirth,
          gender,
          dietaryPreference,
          cookingExperience,
          spicePreference,
          language,
        },
      },
      { upsert: true }
    );

    return NextResponse.json({
      success: true,
      message: "Profile saved successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}