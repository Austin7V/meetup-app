
import type { SearchCategoryId } from "../constants/searchCategories";
import type { Language } from "./translations";
import type { GamePlatformId } from "../constants/gamePlatforms";

export const searchTranslations = {
    ru: {
        title: "Найди свою компанию",
        subtitle: "Чем хочешь заняться сегодня?",
        categoriesTitle: "Выбери активность",
        distance: "Радиус поиска",
        kilometers: "км",
        comingSoon: "Скоро будет доступно",
        searchButton: "Найти людей",
        selectCategory: "Сначала выбери активность",

        categories: {
            gaming: "Игры",
            bars: "Бары",
            movies: "Кино",
            bowling: "Боулинг",
            walking: "Прогулки",
            parties: "Вечеринки",
        },
        platformTitle: "Выбери платформу",
        platformHint: "На чём ты играешь?",
        close: "Закрыть",

        platforms: {
            pc: "ПК",
            playstation: "PlayStation",
            xbox: "Xbox",
        },
    },

    de: {
        title: "Finde deine Leute",
        subtitle: "Was möchtest du heute unternehmen?",
        categoriesTitle: "Aktivität auswählen",
        distance: "Suchradius",
        kilometers: "km",
        comingSoon: "Bald verfügbar",
        searchButton: "Leute finden",
        selectCategory: "Wähle zuerst eine Aktivität",

        categories: {
            gaming: "Gaming",
            bars: "Bars",
            movies: "Kino",
            bowling: "Bowling",
            walking: "Spazieren",
            parties: "Partys",
        },
        platformTitle: "Plattform auswählen",
        platformHint: "Worauf spielst du?",
        close: "Schließen",

        platforms: {
            pc: "PC",
            playstation: "PlayStation",
            xbox: "Xbox",
        },
    },

    en: {
        title: "Find your people",
        subtitle: "What would you like to do today?",
        categoriesTitle: "Choose an activity",
        distance: "Search radius",
        kilometers: "km",
        comingSoon: "Coming soon",
        searchButton: "Find people",
        selectCategory: "Choose an activity first",

        categories: {
            gaming: "Gaming",
            bars: "Bars",
            movies: "Movies",
            bowling: "Bowling",
            walking: "Walking",
            parties: "Parties",
        },
        platformTitle: "Choose your platform",
        platformHint: "Where do you play?",
        close: "Close",

        platforms: {
            pc: "PC",
            playstation: "PlayStation",
            xbox: "Xbox",
        },
    },
} satisfies Record<
    Language,
    {
        title: string;
        subtitle: string;
        categoriesTitle: string;
        distance: string;
        kilometers: string;
        comingSoon: string;
        searchButton: string;
        selectCategory: string;
        categories: Record<SearchCategoryId, string>;
        platformTitle: string;
        platformHint: string;
        close: string;
        platforms: Record<GamePlatformId, string>;
    }
>;
