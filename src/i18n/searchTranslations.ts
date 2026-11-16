
import type { SearchCategoryId } from "../constants/searchCategories";
import type { Language } from "./translations";

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
    }
>;
