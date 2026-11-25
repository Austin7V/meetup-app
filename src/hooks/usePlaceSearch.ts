
import { useCallback, useRef, useState } from "react";

import { getUserCoordinates } from "../services/locationService";
import {
    getPlaces,
    type Place,
    type PlaceCategory,
} from "../services/placesApi";

export function usePlaceSearch(category: PlaceCategory) {
    const [places, setPlaces] = useState<Place[]>([]);
    const [loading, setLoading] = useState(false);

    const requestInProgress = useRef(false);

    const search = useCallback(
        async (radius: number): Promise<Place[] | null> => {
            if (requestInProgress.current) {
                return null;
            }

            if (
                !Number.isInteger(radius) ||
                radius < 1 ||
                radius > 50
            ) {
                throw new Error("Invalid search radius");
            }

            requestInProgress.current = true;
            setLoading(true);
            setPlaces([]);

            try {
                const coordinates = await getUserCoordinates();

                const results = await getPlaces({
                    category,
                    coordinates,
                    radius,
                });

                setPlaces(results);

                return results;
            } finally {
                requestInProgress.current = false;
                setLoading(false);
            }
        },
        [category]
    );

    return {
        places,
        loading,
        search,
    };
}
