
import { API_BASE_URL } from "../config/api";
import type { UserCoordinates } from "./locationService";

export type PlaceCategory = "bars" | "cinemas" | "bowling";

export type Place = {
    id: string;
    name: string;
    address: string;
    latitude: number | null;
    longitude: number | null;
};

type GetPlacesParams = {
    coordinates: UserCoordinates;
    radius: number;
    category: PlaceCategory;
};

type PlacesResponse = {
    places: Place[];
};

export async function getPlaces({
                                    coordinates,
                                    radius,
                                    category,
                                }: GetPlacesParams): Promise<Place[]> {
    if (!Number.isInteger(radius) || radius < 1 || radius > 50) {
        throw new Error("Invalid search radius");
    }

    const params = new URLSearchParams({
        lat: String(coordinates.latitude),
        lng: String(coordinates.longitude),
        radius: String(radius),
        category,
    });

    const response = await fetch(
        `${API_BASE_URL}/places?${params.toString()}`
    );

    if (!response.ok) {
        throw new Error(
            `Places API request failed: ${response.status}`
        );
    }

    const data: PlacesResponse = await response.json();

    if (!Array.isArray(data.places)) {
        throw new Error("Invalid places API response");
    }

    return data.places;
}
