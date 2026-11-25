
import type { Language } from "./translations";

// RU: Общие переводы интерфейса выбора заведений.
// DE: Gemeinsame Übersetzungen für die Ortsauswahl.
export const placePickerCommonTranslations = {
    ru: {
        close: "Закрыть",
        radiusLabel: "Радиус поиска",
        distanceUnit: "км",
        locationTitle: "Моё местоположение",
        locationDescription:
            "Будет определено через GPS iPhone после нажатия кнопки поиска.",
        resultsCount: "Результатов",
        confirmPlace: "Подтвердить выбор",
    },

    de: {
        close: "Schließen",
        radiusLabel: "Suchradius",
        distanceUnit: "km",
        locationTitle: "Mein Standort",
        locationDescription:
            "Dein Standort wird nach dem Start der Suche über das iPhone-GPS ermittelt.",
        resultsCount: "Ergebnisse",
        confirmPlace: "Auswahl bestätigen",
    },

    en: {
        close: "Close",
        radiusLabel: "Search radius",
        distanceUnit: "km",
        locationTitle: "My location",
        locationDescription:
            "Your location will be detected using your iPhone GPS after starting the search.",
        resultsCount: "Results",
        confirmPlace: "Confirm selection",
    },
} satisfies Record<Language, Record<string, string>>;
