
import { API_BASE_URL } from "../config/api";
import type { GamePlatformId } from "../constants/gamePlatforms";

export type Game = {
    id: number;
    name: string;
    image: string | null;
    genres: string[];
    platforms: string[];
    rawgUrl: string;
};

type GamesResponse = {
    games: Game[];
};

type GetGamesParams = {
    platform: GamePlatformId;
    search?: string;
};

export async function getGames({
                                   platform,
                                   search = "",
                               }: GetGamesParams): Promise<Game[]> {
    const query = new URLSearchParams({
        platform,
        search: search.trim(),
    });

    const response = await fetch(
        `${API_BASE_URL}/games?${query.toString()}`
    );

    if (!response.ok) {
        throw new Error(
            `Games API request failed: ${response.status}`
        );
    }

    const data: GamesResponse = await response.json();

    if (!Array.isArray(data.games)) {
        throw new Error("Invalid games API response");
    }

    return data.games;
}
