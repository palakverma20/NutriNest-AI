import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { auth } from "@/auth";

export async function POST(request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const client = await clientPromise;
    const db = client.db("nutrinest");

    const ingredient = {
      userEmail: session.user.email,
      ingredient: body.ingredient,
      amount: Number(body.amount),
      unit: body.unit,
      minimumAmount: Number(body.minimumAmount),
      expiry: body.expiry,
      createdAt: new Date(),
    };

    const result = await db.collection("pantry").insertOne(ingredient);

    return NextResponse.json(
      {
        message: "Ingredient added successfully",
        result,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST API Error:", error);

    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db("nutrinest");

    const ingredients = await db
      .collection("pantry")
      .find({ userEmail: session.user.email })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(ingredients, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
