import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            console.error("Add to library: No session or user");
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { gameId } = body;

        if (!gameId) {
            console.error("Add to library: Missing gameId");
            return NextResponse.json({ error: "Game ID is required" }, { status: 400 });
        }

        const userId = (session.user as any).id;

        if (!userId) {
            console.error("Add to library: No userId in session", session.user);
            return NextResponse.json({ error: "User ID not found in session" }, { status: 400 });
        }

        console.log(`Adding game ${gameId} to library for user ${userId}`);

        // Check if game exists
        const game = await prisma.game.findUnique({
            where: { id: gameId }
        });

        if (!game) {
            console.error(`Add to library: Game ${gameId} not found`);
            return NextResponse.json({ error: "Game not found" }, { status: 404 });
        }

        // Add game to user's library
        await prisma.user.update({
            where: { id: userId },
            data: {
                library: {
                    connect: { id: gameId }
                }
            }
        });

        console.log(`Successfully added game ${gameId} to library for user ${userId}`);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error adding to library:", error);
        return NextResponse.json(
            { error: "Failed to add game to library", details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
