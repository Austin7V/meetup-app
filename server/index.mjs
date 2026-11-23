
import { createServer } from "node:http";

const PORT = 3002;
const API_KEY = process.env.RAWG_API_KEY;
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
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

    if (req.method === "GET" && requestUrl.pathname === "/bars") {

        const latitude = Number(requestUrl.searchParams.get("lat"));
        const longitude = Number(requestUrl.searchParams.get("lng"));
        const radius = Number(requestUrl.searchParams.get("radius"));

        if (
            !Number.isFinite(latitude) ||
            !Number.isFinite(longitude) ||
            latitude < -90 ||
            latitude > 90 ||
            longitude < -180 ||
            longitude > 180 ||
            !Number.isFinite(radius) ||
            radius < 1 ||
            radius > 50 ||
            !requestUrl.searchParams.has("lat") ||
            !requestUrl.searchParams.has("lng") ||
            !requestUrl.searchParams.has("radius")
        ) {
            sendJson(res, 400, {
                error: "Invalid coordinates or radius (1-50 km)",
            });
            return;
        }

        if (!GOOGLE_PLACES_API_KEY) {
            sendJson(res, 503, {
                error: "Google Places is not configured",
            });
            return;
        }

        const requestBody = {
            includedTypes: ["bar"],
            maxResultCount: 20,
            rankPreference: "DISTANCE",
            locationRestriction: {
                circle: {
                    center: { latitude, longitude },
                    radius: radius * 1000,
                },
            },
        };

        try {
            const response = await fetch(
                "https://places.googleapis.com/v1/places:searchNearby",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Goog-Api-Key": GOOGLE_PLACES_API_KEY,

                        "X-Goog-FieldMask":
                            "places.id,places.displayName,places.formattedAddress,places.location",
                    },
                    body: JSON.stringify(requestBody),
                    signal: AbortSignal.timeout(10000),
                }
            );

            if (!response.ok) {
                console.error("Google Places status:", response.status);

                sendJson(res, 502, {
                    error: "Places provider unavailable",
                });
                return;
            }

            const data = await response.json();

            const bars = (data.places ?? []).map((place) => ({
                id: place.id,
                name: place.displayName?.text ?? "",
                address: place.formattedAddress ?? "",
                latitude: place.location?.latitude ?? null,
                longitude: place.location?.longitude ?? null,
            }));

            sendJson(res, 200, { bars });
        } catch (error) {
            console.error(
                "Places request failed:",
                error instanceof Error ? error.message : error
            );

            sendJson(res, 502, {
                error: "Unable to load bars",
            });
        }

        return;
    }


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
