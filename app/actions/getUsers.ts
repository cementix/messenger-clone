import prisma from "@/lib/db";
import getSession from "./getSession";

export default async function getUsers() {
  const session = await getSession();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: session.user.email as string,
        },
      },
    });
    return users;
  } catch (error) {
    return [];
  }
}
