
import type { Language } from "./translations";

export const gamePickerTranslations = {
    ru: {
        title: "Выбери игры",
        search: "Поиск игры...",
        loading: "Загружаем игры...",
        empty: "Игры не найдены",
        error: "Не удалось загрузить игры. Проверь сервер.",
        cancel: "Закрыть",
        confirm: "Готово",
        source: "Данные и изображения: RAWG",
        selectedCount: "Выбрано",
        showSelected: "Выбранные",
        showAll: "Все игры",
        noneSelected: "Ты пока не выбрал ни одной игры",
    },

    de: {
        title: "Spiele auswählen",
        search: "Spiel suchen...",
        loading: "Spiele werden geladen...",
        empty: "Keine Spiele gefunden",
        error: "Spiele konnten nicht geladen werden. Server prüfen.",
        cancel: "Schließen",
        confirm: "Fertig",
        source: "Daten und Bilder: RAWG",
        selectedCount: "Ausgewählt",
        showSelected: "Ausgewählte",
        showAll: "Alle Spiele",
        noneSelected: "Noch keine Spiele ausgewählt",
    },

    en: {
        title: "Choose games",
        search: "Search games...",
        loading: "Loading games...",
        empty: "No games found",
        error: "Couldn't load games. Check the server.",
        cancel: "Close",
        confirm: "Done",
        source: "Data and images: RAWG",
        selectedCount: "Selected",
        showSelected: "Selected games",
        showAll: "All games",
        noneSelected: "No games selected yet",
    },
} satisfies Record<Language, Record<string, string>>;
