
import { StyleSheet } from "react-native";

// RU: Стили экрана результатов поиска.
// DE: Styles für die Suchergebnisse.
export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#F7F8FC",
    },
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
    },
    backButton: {
        alignSelf: "flex-start",
        paddingVertical: 10,
        marginBottom: 28,
    },
    backText: {
        color: "#6478FF",
        fontSize: 16,
        fontWeight: "600",
    },
    title: {
        fontSize: 30,
        fontWeight: "700",
        color: "#172033",
    },
    subtitle: {
        fontSize: 15,
        lineHeight: 22,
        color: "#616B7D",
        marginTop: 8,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 80,
        gap: 14,
    },
    emptyIcon: {
        fontSize: 64,
    },
    emptyTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#172033",
        textAlign: "center",
    },
    emptyDescription: {
        fontSize: 15,
        color: "#616B7D",
        lineHeight: 23,
        textAlign: "center",
        maxWidth: 310,
    },
});
