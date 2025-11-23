import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const gameId = searchParams.get("gameId");

        const where = gameId ? { gameId } : {};

        const reviews = await prisma.review.findMany({
            where,
            include: {
                user: {
                    select: {
                        name: true,
                        image: true,
                    },
                },
                game: {
                    select: {
                        title: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        const formattedReviews = reviews.map((review: any) => ({
            id: review.id,
            user: review.user.name,
            avatar: review.user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${review.user.name}`,
            rating: review.rating,
            comment: review.comment,
            date: new Date(review.createdAt).toLocaleDateString(),
            gameId: review.gameId,
            gameTitle: review.game?.title,
        }));

        return NextResponse.json(formattedReviews);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { gameId, rating, comment } = body;

        const user = await prisma.user.findUnique({
            where: { email: session.user.email! },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const review = await prisma.review.create({
            data: {
                rating: parseInt(rating),
                comment,
                gameId,
                userId: user.id,
                avatar: user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`,
                date: new Date().toLocaleDateString(),
            },
            include: {
                user: {
                    select: { name: true, image: true },
                },
            },
        });

        return NextResponse.json(review);
    } catch (error) {
        return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user || !(session.user as any).isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Review ID required" }, { status: 400 });
        }

        await prisma.review.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Review deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
    }
}
