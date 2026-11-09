import AsyncStorage from "@react-native-async-storage/async-storage";

const PROFILE_STORAGE_KEY = "@meetup/profile";

export type StoredProfile = {
    nickname: string;
    birthDate: string;
    about: string;
    interests: string[];
};

export async function saveProfile(
    profile: StoredProfile
): Promise<void> {
    await AsyncStorage.setItem(
        PROFILE_STORAGE_KEY,
        JSON.stringify(profile)
    );
}

export async function loadProfile(): Promise<StoredProfile | null> {
    const data = await AsyncStorage.getItem(PROFILE_STORAGE_KEY);

    if (!data) {
        return null;
    }

    try {
        const profile: unknown = JSON.parse(data);

        if (
            typeof profile !== "object" ||
            profile === null ||
            !("nickname" in profile) ||
            typeof profile.nickname !== "string" ||
            !("birthDate" in profile) ||
            typeof profile.birthDate !== "string" ||
            !("about" in profile) ||
            typeof profile.about !== "string" ||
            !("interests" in profile) ||
            !Array.isArray(profile.interests) ||
            !profile.interests.every(
                (interest: unknown) => typeof interest === "string"
            )
        ) {
            return null;
        }

        return profile as StoredProfile;
    } catch {
        return null;
    }
}

export async function deleteProfile(): Promise<void> {
    await AsyncStorage.removeItem(PROFILE_STORAGE_KEY);
}