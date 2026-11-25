
import { StyleSheet } from "react-native";

// RU: Универсальные стили поиска и выбора заведений.
// DE: Universelle Styles für die Suche und Ortsauswahl.
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F8FC",
        paddingTop: 24,
    },
    header: {
        paddingHorizontal: 20,
        paddingBottom: 18,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },
    title: {
        fontSize: 23,
        fontWeight: "700",
        color: "#172033",
        flexShrink: 1,
    },
    close: {
        fontSize: 15,
        color: "#6478FF",
        marginLeft: 12,
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: 20,
        gap: 24,
        paddingBottom: 32,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: "#616B7D",
    },
    radiusCard: {
        padding: 20,
        borderRadius: 18,
        backgroundColor: "#FFFFFF",
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        color: "#172033",
    },
    radiusValue: {
        textAlign: "center",
        fontSize: 36,
        fontWeight: "700",
        color: "#6478FF",
        marginVertical: 18,
    },
    radiusLabels: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
    },
    hint: {
        fontSize: 13,
        color: "#8992A3",
    },
    locationCard: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        padding: 18,
        borderRadius: 18,
        backgroundColor: "#FFFFFF",
    },
    locationIcon: {
        fontSize: 26,
    },
    locationText: {
        flex: 1,
    },
    locationTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#172033",
    },
    locationDescription: {
        fontSize: 13,
        lineHeight: 19,
        color: "#8992A3",
        marginTop: 4,
    },

    // RU: Список найденных заведений.
    // DE: Liste der gefundenen Orte.
    resultsSection: {
        gap: 12,
    },
    resultsHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
    },
    resultsTitle: {
        fontSize: 19,
        fontWeight: "700",
        color: "#172033",
        flexShrink: 1,
    },
    resultsCount: {
        fontSize: 13,
        fontWeight: "600",
        color: "#6478FF",
    },
    resultsHint: {
        fontSize: 14,
        color: "#8992A3",
    },
    placeCard: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        borderWidth: 1.5,
        borderColor: "#E5E7EB",
        borderRadius: 16,
        backgroundColor: "#FFFFFF",
        padding: 16,
        minHeight: 78,
    },
    placeCardSelected: {
        borderColor: "#6478FF",
        backgroundColor: "#EEF0FF",
    },
    placeDetails: {
        flex: 1,
        gap: 6,
    },
    placeName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#172033",
    },
    placeAddress: {
        fontSize: 13,
        lineHeight: 19,
        color: "#616B7D",
    },
    selectionCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#D1D5DB",
        alignItems: "center",
        justifyContent: "center",
    },
    selectionCircleSelected: {
        backgroundColor: "#6478FF",
        borderColor: "#6478FF",
    },
    checkmark: {
        fontSize: 15,
        fontWeight: "700",
        color: "#FFFFFF",
    },

    // RU: Кнопки поиска и подтверждения.
    // DE: Schaltflächen für Suche und Bestätigung.
    footer: {
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 28,
        gap: 10,
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
    },
    searchButton: {
        backgroundColor: "#6478FF",
        borderRadius: 15,
        minHeight: 56,
        alignItems: "center",
        justifyContent: "center",
    },
    disabledButton: {
        opacity: 0.5,
    },
    searchButtonText: {
        fontSize: 17,
        fontWeight: "700",
        color: "#FFFFFF",
    },
    confirmButton: {
        backgroundColor: "#172033",
        borderRadius: 15,
        minHeight: 52,
        alignItems: "center",
        justifyContent: "center",
    },
    confirmButtonText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#FFFFFF",
    },
});
