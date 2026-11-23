
import type { Language } from "./translations";

// RU: Переводы интерфейса и сообщений поиска баров.
// DE: Übersetzungen für die Barsuche und Fehlermeldungen.
export const barPickerTranslations = {
    ru: {
        title: "Поиск баров",
        close: "Закрыть",
        description:
            "Выберите расстояние, на котором хотите найти бары рядом с вами.",
        radiusLabel: "Радиус поиска",
        distanceUnit: "км",
        locationTitle: "Моё местоположение",
        locationDescription:
            "Будет определено через GPS iPhone после нажатия кнопки поиска.",
        searchButton: "Найти бары",

        radiusErrorTitle: "Радиус поиска",
        radiusErrorMessage:
            "Поиск до 100 км пока недоступен. Выберите радиус до 50 км.",

        noBarsTitle: "Бары не найдены",
        noBarsMessage: "Попробуйте увеличить радиус поиска.",

        resultsTitle: "Найдено баров",

        locationErrorTitle: "Нет доступа к геолокации",
        locationErrorMessage:
            "Разрешите Meetup доступ к местоположению в настройках iPhone.",

        searchErrorTitle: "Ошибка поиска",
        searchErrorMessage:
            "Не удалось найти бары. Проверьте подключение к серверу.",
        selectBar: "Выберите бар из списка",
        confirmBar: "Подтвердить выбор",
        selectedBar: "Выбранный бар",
        resultsCount: "Результатов",
    },

    de: {
        title: "Bars suchen",
        close: "Schließen",
        description:
            "Wähle die Entfernung aus, in der du Bars in deiner Nähe finden möchtest.",
        radiusLabel: "Suchradius",
        distanceUnit: "km",
        locationTitle: "Mein Standort",
        locationDescription:
            "Dein Standort wird nach dem Start der Suche über das iPhone-GPS ermittelt.",
        searchButton: "Bars finden",

        radiusErrorTitle: "Suchradius",
        radiusErrorMessage:
            "Die Suche bis 100 km ist noch nicht verfügbar. Bitte wähle einen Radius bis 50 km.",

        noBarsTitle: "Keine Bars gefunden",
        noBarsMessage: "Versuche, den Suchradius zu vergrößern.",

        resultsTitle: "Gefundene Bars",

        locationErrorTitle: "Standortzugriff verweigert",
        locationErrorMessage:
            "Erlaube Meetup den Standortzugriff in den iPhone-Einstellungen.",

        searchErrorTitle: "Suchfehler",
        searchErrorMessage:
            "Bars konnten nicht geladen werden. Überprüfe die Verbindung zum Server.",
        selectBar: "Wähle eine Bar aus der Liste",
        confirmBar: "Auswahl bestätigen",
        selectedBar: "Ausgewählte Bar",
        resultsCount: "Ergebnisse",
    },

    en: {
        title: "Find bars",
        close: "Close",
        description:
            "Choose the distance within which you want to find nearby bars.",
        radiusLabel: "Search radius",
        distanceUnit: "km",
        locationTitle: "My location",
        locationDescription:
            "Your location will be detected using your iPhone GPS after starting the search.",
        searchButton: "Find bars",

        radiusErrorTitle: "Search radius",
        radiusErrorMessage:
            "Searches up to 100 km are not available yet. Please select a radius up to 50 km.",

        noBarsTitle: "No bars found",
        noBarsMessage: "Try increasing the search radius.",

        resultsTitle: "Bars found",

        locationErrorTitle: "Location access denied",
        locationErrorMessage:
            "Allow Meetup to access your location in your iPhone settings.",

        searchErrorTitle: "Search error",
        searchErrorMessage:
            "Unable to load bars. Check your connection to the server.",
        selectBar: "Select a bar from the list",
        confirmBar: "Confirm selection",
        selectedBar: "Selected bar",
        resultsCount: "Results",
    },
} satisfies Record<Language, Record<string, string>>;
