import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { auth } from "@/auth";

// DELETE Ingredient
export async function DELETE(request, context) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    const client = await clientPromise;
    const db = client.db("nutrinest");

    const result = await db.collection("pantry").deleteOne({
      _id: new ObjectId(id),
      userEmail: session.user.email,
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "Ingredient not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Ingredient deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function PUT(request, context) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await request.json();

    const client = await clientPromise;
    const db = client.db("nutrinest");

    const result = await db.collection("pantry").updateOne(
      {
        _id: new ObjectId(id),
        userEmail: session.user.email,
      },
      {
        $set: {
          ingredient: body.ingredient,
          amount: Number(body.amount),
          unit: body.unit,
          minimumAmount: Number(body.minimumAmount),
          expiry: body.expiry,
        },
      },
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "Ingredient not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Ingredient updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    );
  }
}
