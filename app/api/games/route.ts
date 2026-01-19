import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category");
        const isNew = searchParams.get("isNew") === "true";
        const isTrending = searchParams.get("isTrending") === "true";
        const search = searchParams.get("search");

        const where: any = {};

        if (category) {
            where.category = {
                equals: category,
                mode: "insensitive",
            };
        }

        if (isNew) {
            where.isNew = true;
        }

        if (isTrending) {
            where.isTrending = true;
        }

        if (search) {
            where.OR = [
                { title: { contains: search, mode: "insensitive" } },
                { description: { contains: search, mode: "insensitive" } },
                { category: { contains: search, mode: "insensitive" } },
            ];
        }

        const games = await prisma.game.findMany({
            where,
            include: {
                reviews: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(games);
    } catch (error) {
        console.error("Error fetching games:", error);
        return NextResponse.json(
            { error: "Failed to fetch games" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user || !(session.user as any).isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { title, description, price, originalPrice, category, rating, image, tags, isNew, isTrending, magnetLink, torrentLink, directDownloadLink } = body;

        // Basic validation
        if (!title || !price || !category) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Safely handle tags - if it's a string, split it; if it's already an array, use it; otherwise empty array
        const processedTags = typeof tags === 'string'
            ? tags.split(",").map((t: string) => t.trim()).filter(Boolean)
            : Array.isArray(tags) ? tags : [];

        const game = await prisma.game.create({
            data: {
                title,
                description: description || "",
                price: parseFloat(price),
                originalPrice: originalPrice ? parseFloat(originalPrice) : null,
                category,
                rating: parseFloat(rating) || 0,
                image: image || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2070",
                tags: processedTags,
                isNew: isNew || false,
                isTrending: isTrending || false,
                screenshots: body.screenshots || [],
                magnetLink: magnetLink || null,
                torrentLink: torrentLink || null,
                directDownloadLink: directDownloadLink || null,
            } as any,
        });

        return NextResponse.json(game, { status: 201 });
    } catch (error) {
        console.error("Error creating game:", error);
        return NextResponse.json(
            { error: "Failed to create game", details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
