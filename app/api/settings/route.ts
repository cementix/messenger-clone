import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    const body = await req.json();
    const { name, image } = body;

    if (!currentUser) return new NextResponse("Unauthorized", { status: 401 });

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        image,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log(error, "ERROR_SETTINGS");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
