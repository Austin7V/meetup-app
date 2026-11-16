
import { StyleSheet } from "react-native";
import { theme } from "../theme/theme";

export const searchStyles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },

    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 12,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },

    brand: {
        fontSize: 16,
        fontWeight: "800",
        color: theme.colors.primary,
        letterSpacing: 2,
    },

    languageContainer: {
        flexDirection: "row",
        gap: 5,
    },

    languageButton: {
        paddingHorizontal: 11,
        paddingVertical: 7,
        borderRadius: 9,
        backgroundColor: "#E7ECF4",
    },

    languageButtonActive: {
        backgroundColor: theme.colors.primary,
    },

    languageText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#64748B",
    },

    languageTextActive: {
        color: "#FFFFFF",
    },

    title: {
        fontSize: 25,
        fontWeight: "800",
        color: theme.colors.title,
        marginBottom: 5,
    },

    subtitle: {
        fontSize: 14,
        color: "#728096",
        marginBottom: 16,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: theme.colors.title,
        marginBottom: 12,
    },

    categoryGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignContent: "flex-start",
        gap: 9,
    },

    category: {
        width: "48%",
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: "#E4E9F1",
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        padding: 6,
    },

    categorySelected: {
        backgroundColor: "#E8F0FF",
        borderColor: theme.colors.primary,
        borderWidth: 2,
    },

    categoryIcon: {
        fontSize: 27,
        marginBottom: 5,
    },

    categoryLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: theme.colors.title,
        textAlign: "center",
    },

    categoryLabelSelected: {
        color: theme.colors.primary,
    },

    bottomSection: {
        marginTop: "auto",
        paddingTop: 12,
    },

    distanceContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: theme.colors.surface,
        borderRadius: 13,
        paddingHorizontal: 15,
        paddingVertical: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#E4E9F1",
    },

    distanceTitle: {
        fontSize: 14,
        fontWeight: "600",
        color: theme.colors.title,
    },

    distanceValue: {
        fontSize: 13,
        color: "#728096",
    },

    button: {
        backgroundColor: theme.colors.primary,
        borderRadius: 14,
        minHeight: 49,
        justifyContent: "center",
        alignItems: "center",
    },

    buttonDisabled: {
        backgroundColor: "#A9B6CA",
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },
});
