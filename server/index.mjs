
import { createServer } from "node:http";

const PORT = 3002;

const RAWG_API_KEY = process.env.RAWG_API_KEY;
const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;


if (!RAWG_API_KEY) {
    throw new Error("RAWG_API_KEY is missing");
}

const platforms = {
    pc: 1,
    playstation: 2,
    xbox: 3,
};

const placeTypes = {
    bars: "bar",
    cinemas: "movie_theater",
    bowling: "bowling_alley",
};

function sendJson(res, status, data) {
    res.writeHead(status, {
        "Content-Type": "application/json; charset=utf-8",
    });

    res.end(JSON.stringify(data));
}

function parseLocationParams(searchParams) {
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    const radiusValue = searchParams.get("radius");

    if (
        lat === null ||
        lng === null ||
        radiusValue === null ||
        !lat.trim() ||
        !lng.trim() ||
        !radiusValue.trim()
    ) {
        return null;
    }

    const latitude = Number(lat);
    const longitude = Number(lng);
    const radius = Number(radiusValue);

    if (
        !Number.isFinite(latitude) ||
        !Number.isFinite(longitude) ||
        latitude < -90 ||
        latitude > 90 ||
        longitude < -180 ||
        longitude > 180 ||
        !Number.isInteger(radius) ||
        radius < 1 ||
        radius > 50
    ) {
        return null;
    }

    return { latitude, longitude, radius };
}

async function searchPlaces({
                                latitude,
                                longitude,
                                radius,
                                type,
                            }) {
    const requestBody = {
        includedTypes: [type],
        maxResultCount: 20,
        rankPreference: "DISTANCE",
        locationRestriction: {
            circle: {
                center: {
                    latitude,
                    longitude,
                },
                radius: radius * 1000,
            },
        },
    };

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

        throw new Error("Places provider unavailable");
    }

    const data = await response.json();

    return (data.places ?? []).map((place) => ({
        id: place.id,
        name: place.displayName?.text ?? "",
        address: place.formattedAddress ?? "",
        latitude: place.location?.latitude ?? null,
        longitude: place.location?.longitude ?? null,
    }));
}


const server = createServer(async (req, res) => {
    const requestUrl = new URL(
        req.url ?? "/",
        "http://localhost"
    );

    const isPlacesRoute =
        requestUrl.pathname === "/places" ||
        requestUrl.pathname === "/bars" ||
        requestUrl.pathname === "/cinemas";

    if (req.method === "GET" && isPlacesRoute) {
        const category =
            requestUrl.pathname === "/bars"
                ? "bars"
                : requestUrl.pathname === "/cinemas"
                    ? "cinemas"
                    : requestUrl.searchParams.get("category");

        if (!category || !(category in placeTypes)) {
            sendJson(res, 400, {
                error: "Invalid place category",
            });
            return;
        }

        const location = parseLocationParams(
            requestUrl.searchParams
        );

        if (!location) {
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

        try {
            const places = await searchPlaces({
                ...location,
                type: placeTypes[category],
            });

             if (requestUrl.pathname === "/bars") {
                sendJson(res, 200, { bars: places });
                return;
            }

            if (requestUrl.pathname === "/cinemas") {
                sendJson(res, 200, { cinemas: places });
                return;
            }

            sendJson(res, 200, { places });
        } catch (error) {
            console.error(
                "Places request failed:",
                error instanceof Error ? error.message : error
            );

            sendJson(res, 502, {
                error: "Unable to load places",
            });
        }

        return;
    }


    if (
        req.method !== "GET" ||
        requestUrl.pathname !== "/games"
    ) {
        sendJson(res, 404, {
            error: "Route not found",
        });
        return;
    }

    const platform = requestUrl.searchParams.get("platform");

    const search = (
        requestUrl.searchParams.get("search") ?? ""
    ).trim();

    if (!platform || !(platform in platforms)) {
        sendJson(res, 400, {
            error: "Invalid platform",
        });
        return;
    }

    const rawgUrl = new URL(
        "https://api.rawg.io/api/games"
    );

    rawgUrl.searchParams.set("key", RAWG_API_KEY);

    rawgUrl.searchParams.set(
        "parent_platforms",
        String(platforms[platform])
    );

    rawgUrl.searchParams.set("page_size", "12");

    if (search) {
        rawgUrl.searchParams.set(
            "search",
            search.slice(0, 100)
        );
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
            genres: game.genres.map(
                (genre) => genre.name
            ),
            platforms: game.parent_platforms.map(
                (item) => item.platform.name
            ),
            rawgUrl: `https://rawg.io/games/${game.slug}`,
        }));

        sendJson(res, 200, { games });
    } catch (error) {
        console.error(
            "RAWG request failed:",
            error instanceof Error ? error.message : error
        );

        sendJson(res, 502, {
            error: "Unable to load games",
        });
    }
});

server.listen(PORT, "0.0.0.0", () => {
    console.log(`Meetup API is running on port ${PORT}`);
});
