import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// DELETE FAMILY MEMBER
export async function DELETE(request, context) {
  try {
    const { id } = await context.params;

    const client = await clientPromise;
    const db = client.db("nutrinest");

    const result = await db.collection("familyMembers").deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

// UPDATE FAMILY MEMBER
export async function PUT(request, context) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    const client = await clientPromise;
    const db = client.db("nutrinest");

    const result = await db.collection("familyMembers").updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: body,
      }
    );

    console.log("Update Result:", result);

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}