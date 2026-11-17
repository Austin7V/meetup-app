
import { StyleSheet } from "react-native";
import { theme } from "../theme/theme";

export const gamePickerStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.45)",
    },

    sheet: {
        height: "78%",
        backgroundColor: theme.colors.surface,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 20,
        paddingTop: 22,
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 18,
    },

    title: {
        fontSize: 22,
        fontWeight: "800",
        color: theme.colors.title,
    },

    closeText: {
        fontSize: 15,
        color: theme.colors.primary,
        fontWeight: "600",
    },

    searchInput: {
        height: 48,
        backgroundColor: "#F5F7FB",
        borderRadius: 12,
        paddingHorizontal: 15,
        color: theme.colors.title,
        fontSize: 15,
        marginBottom: 14,
    },

    list: {
        flex: 1,
    },

    listContent: {
        paddingBottom: 12,
    },

    gameRow: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginBottom: 8,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: "#E4E9F1",
    },

    gameRowSelected: {
        backgroundColor: "#E8F0FF",
        borderColor: theme.colors.primary,
    },

    gameImage: {
        width: 60,
        height: 60,
        borderRadius: 9,
        backgroundColor: "#E4E9F1",
    },

    imagePlaceholder: {
        width: 60,
        height: 60,
        borderRadius: 9,
        backgroundColor: "#E4E9F1",
        alignItems: "center",
        justifyContent: "center",
    },

    gameInfo: {
        flex: 1,
        paddingHorizontal: 12,
    },

    gameName: {
        fontSize: 15,
        fontWeight: "700",
        color: theme.colors.title,
    },

    gameGenres: {
        fontSize: 12,
        color: "#728096",
        marginTop: 4,
    },

    checkmark: {
        fontSize: 22,
        color: theme.colors.primary,
        fontWeight: "700",
    },

    messageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    message: {
        color: "#728096",
        textAlign: "center",
        marginTop: 12,
    },

    source: {
        color: "#728096",
        textAlign: "center",
        fontSize: 12,
        paddingVertical: 12,
    },

    confirmButton: {
        backgroundColor: theme.colors.primary,
        borderRadius: 14,
        paddingVertical: 15,
        alignItems: "center",
    },

    confirmText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },
});
