
import { useLocalSearchParams, useRouter } from "expo-router";

import SearchResultsScreen from "../src/screens/SearchResultsScreen";
import type { Language } from "../src/i18n/translations";
import type { PeopleSearchFilters } from "../src/types/userSearch";

export default function SearchResultsRoute() {
    const router = useRouter();

    const params = useLocalSearchParams<{
        language?: string;
        category?: string;
        platform?: string;
        gameIds?: string;
        placeId?: string;
    }>();

    const language: Language =
        params.language === "de" || params.language === "en"
            ? params.language
            : "ru";

    const category = params.category as
        | PeopleSearchFilters["category"]
        | undefined;

    return (
        <SearchResultsScreen
            language={language}
            onBack={() => router.back()}
        />
    );
}
