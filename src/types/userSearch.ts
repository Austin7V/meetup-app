
import type { SearchCategoryId } from "../constants/searchCategories";
import type { GamePlatformId } from "../constants/gamePlatforms";
import type { Place } from "../services/placesApi";

export type UserSearchProfile = {
    id: string;
    nickname: string;
    age: number;
    about: string | null;
    interests: string[];
    photoUrl: string | null;
};

export type PeopleSearchFilters = {
    category: SearchCategoryId;

    platform?: GamePlatformId;
    gameIds?: number[];

    place?: Place;
};

export type PeopleSearchResult = {
    profiles: UserSearchProfile[];
};
