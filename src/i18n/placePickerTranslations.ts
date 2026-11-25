
import type { Language } from "./translations";
import type { PlaceCategory } from "../services/placesApi";

type CategoryTranslations = {
    title: string;
    description: string;
    searchButton: string;
    resultsTitle: string;
    selectBar: string;
};

export const placePickerTranslations: Record<
    Language,
    Record<PlaceCategory, CategoryTranslations>
> = {
    ru: {
        bars: {
            title: "Поиск баров",
            description:
                "Выберите расстояние, на котором хотите найти бары рядом с вами.",
            searchButton: "Найти бары",
            resultsTitle: "Найденные бары",
            selectBar: "Выберите бар из списка",
        },
        cinemas: {
            title: "Поиск кинотеатров",
            description:
                "Выберите расстояние, на котором хотите найти кинотеатры рядом с вами.",
            searchButton: "Найти кинотеатры",
            resultsTitle: "Найденные кинотеатры",
            selectBar: "Выберите кинотеатр из списка",
        },
        bowling: {
            title: "Поиск боулинга",
            description:
                "Выберите расстояние, на котором хотите найти боулинг рядом с вами.",
            searchButton: "Найти боулинг",
            resultsTitle: "Найденные боулинг-центры",
            selectBar: "Выберите заведение из списка",
        },
    },

    de: {
        bars: {
            title: "Bars suchen",
            description:
                "Wähle die Entfernung aus, in der du Bars in deiner Nähe finden möchtest.",
            searchButton: "Bars finden",
            resultsTitle: "Gefundene Bars",
            selectBar: "Wähle eine Bar aus der Liste",
        },
        cinemas: {
            title: "Kinos suchen",
            description:
                "Wähle die Entfernung aus, in der du Kinos in deiner Nähe finden möchtest.",
            searchButton: "Kinos finden",
            resultsTitle: "Gefundene Kinos",
            selectBar: "Wähle ein Kino aus der Liste",
        },
        bowling: {
            title: "Bowling suchen",
            description:
                "Wähle die Entfernung aus, in der du Bowlingcenter in deiner Nähe finden möchtest.",
            searchButton: "Bowlingcenter finden",
            resultsTitle: "Gefundene Bowlingcenter",
            selectBar: "Wähle ein Bowlingcenter aus der Liste",
        },
    },

    en: {
        bars: {
            title: "Find bars",
            description:
                "Choose the distance within which you want to find nearby bars.",
            searchButton: "Find bars",
            resultsTitle: "Bars found",
            selectBar: "Select a bar from the list",
        },
        cinemas: {
            title: "Find cinemas",
            description:
                "Choose the distance within which you want to find nearby cinemas.",
            searchButton: "Find cinemas",
            resultsTitle: "Cinemas found",
            selectBar: "Select a cinema from the list",
        },
        bowling: {
            title: "Find bowling alleys",
            description:
                "Choose the distance within which you want to find nearby bowling alleys.",
            searchButton: "Find bowling alleys",
            resultsTitle: "Bowling alleys found",
            selectBar: "Select a bowling alley from the list",
        },
    },
};


export const cinemaSearchMessages = {
    ru: {
        noResultsTitle: "Кинотеатры не найдены",
        noResultsMessage: "Попробуйте увеличить радиус поиска.",
        errorTitle: "Ошибка поиска",
        errorMessage:
            "Не удалось загрузить кинотеатры. Проверьте подключение к серверу.",
        selectedCinema: "Выбранный кинотеатр",
    },
    de: {
        noResultsTitle: "Keine Kinos gefunden",
        noResultsMessage: "Versuche, den Suchradius zu vergrößern.",
        errorTitle: "Suchfehler",
        errorMessage:
            "Kinos konnten nicht geladen werden. Überprüfe die Verbindung zum Server.",
        selectedCinema: "Ausgewähltes Kino",
    },
    en: {
        noResultsTitle: "No cinemas found",
        noResultsMessage: "Try increasing the search radius.",
        errorTitle: "Search error",
        errorMessage:
            "Unable to load cinemas. Check your connection to the server.",
        selectedCinema: "Selected cinema",
    },
} satisfies Record<Language, Record<string, string>>;


export const bowlingSearchMessages = {
    ru: {
        selectedPlace: "Выбранный боулинг",
        noResultsTitle: "Боулинг не найден",
        noResultsMessage: "Попробуйте увеличить радиус поиска.",
        errorTitle: "Ошибка поиска",
        errorMessage: "Не удалось загрузить заведения. Проверьте подключение к серверу.",
    },
    de: {
        selectedPlace: "Ausgewähltes Bowlingcenter",
        noResultsTitle: "Keine Bowlingcenter gefunden",
        noResultsMessage: "Versuche, den Suchradius zu vergrößern.",
        errorTitle: "Suchfehler",
        errorMessage: "Bowlingcenter konnten nicht geladen werden. Überprüfe die Verbindung zum Server.",
    },
    en: {
        selectedPlace: "Selected bowling alley",
        noResultsTitle: "No bowling alleys found",
        noResultsMessage: "Try increasing the search radius.",
        errorTitle: "Search error",
        errorMessage: "Unable to load bowling alleys. Check your connection to the server.",
    },
} satisfies Record<Language, Record<string, string>>;
