
import type { Language } from "./translations";

export const searchResultsTranslations = {
    ru: {
        title: "Поиск людей",
        subtitle: "Найди компанию для совместного времяпровождения",
        emptyTitle: "Пока никого нет",
        emptyDescription:
            "Сейчас нет пользователей, которые подходят под твой поиск. Попробуй позже.",
        searching: "Поиск участников",
        back: "Назад",
    },
    de: {
        title: "Personen suchen",
        subtitle: "Finde Leute für gemeinsame Aktivitäten",
        emptyTitle: "Noch niemand gefunden",
        emptyDescription:
            "Momentan gibt es keine passenden Personen. Versuche es später erneut.",
        searching: "Teilnehmer suchen",
        back: "Zurück",
    },
    en: {
        title: "Find people",
        subtitle: "Find people to enjoy activities together",
        emptyTitle: "No one found yet",
        emptyDescription:
            "There are currently no matching users. Please try again later.",
        searching: "Searching for people",
        back: "Back",
    },
} satisfies Record<Language, Record<string, string>>;
