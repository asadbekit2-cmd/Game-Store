import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = (session.user as any).id;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                library: {
                    orderBy: {
                        createdAt: "desc"
                    }
                }
            }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user.library);
    } catch (error) {
        console.error("Error fetching library:", error);
        return NextResponse.json(
            { error: "Failed to fetch library" },
            { status: 500 }
        );
    }
}
