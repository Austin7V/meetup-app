
import { API_BASE_URL } from "../config/api";
import type { UserCoordinates } from "./locationService";

export type Bar = {
    id: string;
    name: string;
    address: string;
    latitude: number | null;
    longitude: number | null;
};

type BarsResponse = {
    bars: Bar[];
};

type GetBarsParams = {
    coordinates: UserCoordinates;
    radius: number;
};

export async function getBars({
                                  coordinates,
                                  radius,
                              }: GetBarsParams): Promise<Bar[]> {

    if (!Number.isInteger(radius) || radius < 1 || radius > 50) {
        throw new Error("Invalid search radius");
    }

    const params = new URLSearchParams({
        lat: String(coordinates.latitude),
        lng: String(coordinates.longitude),
        radius: String(radius),
    });

    const response = await fetch(
        `${API_BASE_URL}/bars?${params.toString()}`
    );

    if (!response.ok) {
        throw new Error(
            `Bars API request failed: ${response.status}`
        );
    }

    const data: BarsResponse = await response.json();

    if (!Array.isArray(data.bars)) {
        throw new Error("Invalid bars API response");
    }

    return data.bars;
}
