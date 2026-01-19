import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const game = await prisma.game.findUnique({
            where: { id },
            include: {
                reviews: {
                    include: {
                        user: {
                            select: {
                                name: true,
                            }
                        }
                    },
                    orderBy: {
                        createdAt: "desc"
                    }
                }
            },
        });

        if (!game) {
            return NextResponse.json(
                { error: "Game not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(game);
    } catch (error) {
        console.error("Error fetching game:", error);
        return NextResponse.json(
            { error: "Failed to fetch game" },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !(session.user as any).isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();
        const { title, description, price, originalPrice, category, rating, image, tags, isNew, isTrending, magnetLink, torrentLink, directDownloadLink } = body;

        // Safely handle tags - if it's a string, split it; if it's already an array, use it; otherwise empty array
        const processedTags = typeof tags === 'string'
            ? tags.split(",").map((t: string) => t.trim()).filter(Boolean)
            : Array.isArray(tags) ? tags : [];

        const game = await prisma.game.update({
            where: { id },
            data: {
                title,
                description,
                price: parseFloat(price),
                originalPrice: originalPrice ? parseFloat(originalPrice) : null,
                category,
                rating: parseFloat(rating),
                image,
                tags: processedTags,
                screenshots: body.screenshots || [],
                isNew,
                isTrending,
                magnetLink: magnetLink || null,
                torrentLink: torrentLink || null,
                directDownloadLink: directDownloadLink || null,
            } as any,
        });

        return NextResponse.json(game);
    } catch (error) {
        console.error("Error updating game:", error);
        return NextResponse.json(
            { error: "Failed to update game", details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !(session.user as any).isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        await prisma.game.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Game deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete game" }, { status: 500 });
    }
}
