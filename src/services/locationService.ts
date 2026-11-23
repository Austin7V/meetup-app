
import * as Location from "expo-location";

export type UserCoordinates = {
    latitude: number;
    longitude: number;
};

export async function getUserCoordinates(): Promise<UserCoordinates> {
    const { status } =
        await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
        throw new Error("LOCATION_PERMISSION_DENIED");
    }

    const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
    });

    return {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
    };
}
