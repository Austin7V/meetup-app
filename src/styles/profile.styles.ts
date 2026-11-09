import { StyleSheet } from "react-native";
import { theme } from "../theme/theme";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    paddingHorizontal: theme.spacing.page,
    paddingTop: 14,
    paddingBottom: 28,
    flexGrow: 1,
  },
  languages: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing.section,
  },
  brand: {
    fontSize: theme.fontSize.input,
    fontWeight: "900",
    letterSpacing: 2,
    color: theme.colors.primary,
  },
  languageButtons: {
    flexDirection: "row",
    backgroundColor: theme.colors.muted,
    borderRadius: theme.radius.md,
    padding: theme.spacing.xs,
  },
  languageButton: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.sm,
  },
  languageActive: {
    backgroundColor: theme.colors.surface,
  },
  languageText: {
    fontSize: theme.fontSize.caption,
    fontWeight: "700",
    color: theme.colors.secondary,
  },
  languageTextActive: {
    color: theme.colors.primary,
  },
  title: {
    fontSize: theme.fontSize.title,
    fontWeight: "800",
    color: theme.colors.title,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.fontSize.body,
    color: theme.colors.secondary,
    lineHeight: 21,
    marginBottom: theme.spacing.page,
  },
  input: {
    minHeight: 49,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    fontSize: theme.fontSize.input,
    color: theme.colors.title,
    marginBottom: 11,
  },
  dateText: {
    fontSize: theme.fontSize.input,
    color: theme.colors.title,
  },
  placeholder: {
    color: theme.colors.placeholder,
  },
  sectionHeader: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: theme.fontSize.section,
    fontWeight: "700",
    color: theme.colors.title,
  },
  sectionHint: {
    fontSize: theme.fontSize.caption,
    color: theme.colors.placeholder,
    marginTop: theme.spacing.xs,
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: theme.spacing.xxl,
  },
  category: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  categorySelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  categoryText: {
    fontSize: theme.fontSize.chip,
    fontWeight: "500",
    color: theme.colors.body,
  },
  categoryTextSelected: {
    fontSize: theme.fontSize.chip,
    fontWeight: "600",
    color: theme.colors.surface,
  },
  aboutInput: {
    minHeight: 72,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.xl,
    paddingVertical: theme.spacing.xl,
    alignItems: "center",
    marginTop: 9,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.disabled,
  },
  buttonText: {
    color: theme.colors.surface,
    fontSize: theme.fontSize.button,
    fontWeight: "700",
  },
  ageText: {
    fontSize: theme.fontSize.age,
    color: theme.colors.title,
    marginBottom: theme.spacing.page,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: theme.colors.overlay,
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: theme.radius.modal,
    borderTopRightRadius: theme.radius.modal,
    paddingBottom: 25,
    paddingHorizontal: theme.spacing.xl,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: theme.spacing.xxl,
  },
  modalAction: {
    color: theme.colors.primary,
    fontSize: theme.fontSize.button,
    fontWeight: "600",
  },
  datePicker: {
    height: 215,
  },
});
