
import { createServer } from "node:http";

const PORT = 3002;
const API_KEY = process.env.RAWG_API_KEY;

if (!API_KEY) {
    throw new Error("RAWG_API_KEY is missing");
}

const platforms = {
    pc: 1,
    playstation: 2,
    xbox: 3,
};

function sendJson(res, status, data) {
    res.writeHead(status, {
        "Content-Type": "application/json; charset=utf-8",
    });

    res.end(JSON.stringify(data));
}

const server = createServer(async (req, res) => {
    const requestUrl = new URL(
        req.url ?? "/",
        "http://localhost"
    );

    if (req.method !== "GET" || requestUrl.pathname !== "/games") {
        sendJson(res, 404, { error: "Route not found" });
        return;
    }

    const platform = requestUrl.searchParams.get("platform");
    const search = (
        requestUrl.searchParams.get("search") ?? ""
    ).trim();

    if (!platform || !(platform in platforms)) {
        sendJson(res, 400, { error: "Invalid platform" });
        return;
    }

    const rawgUrl = new URL("https://api.rawg.io/api/games");

    rawgUrl.searchParams.set("key", API_KEY);
    rawgUrl.searchParams.set(
        "parent_platforms",
        String(platforms[platform])
    );
    rawgUrl.searchParams.set("page_size", "12");

    if (search) {
        rawgUrl.searchParams.set("search", search.slice(0, 100));
    }

    try {
        const response = await fetch(rawgUrl, {
            signal: AbortSignal.timeout(10000),
        });

        if (!response.ok) {
            console.error("RAWG status:", response.status);

            sendJson(res, 502, {
                error: "Game provider unavailable",
            });
            return;
        }

        const data = await response.json();

        const games = data.results.map((game) => ({
            id: game.id,
            name: game.name,
            image: game.background_image,
            genres: game.genres.map((genre) => genre.name),
            platforms: game.parent_platforms.map(
                (item) => item.platform.name
            ),
            rawgUrl: `https://rawg.io/games/${game.slug}`,
        }));

        sendJson(res, 200, { games });
    } catch (error) {
        console.error("RAWG request failed:", error instanceof Error ? error.message : error);

        sendJson(res, 502, {
            error: "Unable to load games",
        });
    }
});

server.listen(PORT, "0.0.0.0", () => {
    console.log(`Meetup API is running on port ${PORT}`);
});
