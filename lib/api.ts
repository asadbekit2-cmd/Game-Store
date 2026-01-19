import { Game, Review } from "./data";

const API_URL = "/api";

export async function fetchLibrary() {
    const response = await fetch("/api/library");
    if (!response.ok) {
        throw new Error("Failed to fetch library");
    }
    return response.json();
}

export async function addToLibrary(gameId: string) {
    const response = await fetch("/api/library/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameId }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Failed to add to library:", response.status, errorData);
        throw new Error(errorData.error || "Failed to add to library");
    }

    return response.json();
}

export async function fetchProfile() {
    const response = await fetch("/api/profile");
    if (!response.ok) {
        throw new Error("Failed to fetch profile");
    }
    return response.json();
}

export async function fetchGames(filters?: { category?: string; isNew?: boolean; isTrending?: boolean; search?: string }) {
    const searchParams = new URLSearchParams();
    if (filters?.category) searchParams.append("category", filters.category);
    if (filters?.isNew) searchParams.append("isNew", "true");
    if (filters?.isTrending) searchParams.append("isTrending", "true");
    if (filters?.search) searchParams.append("search", filters.search);

    const res = await fetch(`${API_URL}/games?${searchParams.toString()}`, {
        cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch games");
    return res.json();
}

export async function fetchGame(id: string) {
    const res = await fetch(`${API_URL}/games/${id}`, {
        cache: "no-store",
    });

    if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error("Failed to fetch game");
    }
    return res.json();
}

export async function createGame(data: any) {
    const res = await fetch(`${API_URL}/games`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Failed to create game:", res.status, errorData);
        throw new Error(errorData.error || "Failed to create game");
    }
    return res.json();
}

export async function updateGame(id: string, data: any) {
    const res = await fetch(`${API_URL}/games/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Failed to update game:", res.status, errorData);
        throw new Error(errorData.error || "Failed to update game");
    }
    return res.json();
}

export async function deleteGame(id: string) {
    const res = await fetch(`${API_URL}/games/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete game");
    return res.json();
}

export async function fetchReviews(gameId?: string) {
    const searchParams = new URLSearchParams();
    if (gameId) searchParams.append("gameId", gameId);

    const res = await fetch(`${API_URL}/reviews?${searchParams.toString()}`, {
        cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch reviews");
    return res.json();
}

export async function createReview(data: any) {
    const res = await fetch(`${API_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to create review");
    return res.json();
}

export async function deleteReview(id: string) {
    const res = await fetch(`${API_URL}/reviews?id=${id}`, {
        method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete review");
    return res.json();
}
