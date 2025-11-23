import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { gameId } = body;

        if (!gameId) {
            return NextResponse.json({ error: "Game ID is required" }, { status: 400 });
        }

        const userId = (session.user as any).id;

        // Add game to user's library
        await prisma.user.update({
            where: { id: userId },
            data: {
                library: {
                    connect: { id: gameId }
                }
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error adding to library:", error);
        return NextResponse.json(
            { error: "Failed to add game to library" },
            { status: 500 }
        );
    }
}
