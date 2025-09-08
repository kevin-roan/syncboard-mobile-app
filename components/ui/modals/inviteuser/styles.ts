import { StyleSheet } from "react-native";

const theme = {
  colors: {
    primary: "#6750A4",
    secondary: "#F7F2FA",
    text: "#1A1A1A",
    subText: "#666666",
    error: "#B3261E",
    surface: "#FFFFFF",
    backdrop: "rgba(0, 0, 0, 0.5)",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  triggerButton: {
    borderRadius: 24,
    elevation: 3,
  },
  triggerButtonContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  triggerButtonLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  surface: {
    width: "100%",
    maxWidth: 420,
    borderRadius: 28,
    backgroundColor: theme.colors.surface,
    maxHeight: "90%",
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  title: {
    fontWeight: "600",
    marginBottom: 4,
  },
  subtitle: {
    lineHeight: 20,
  },
  closeButton: {
    margin: 0,
    marginTop: -8,
  },
  headerDivider: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  content: {
    paddingHorizontal: 24,
  },
  textInput: {
    marginBottom: 8,
    backgroundColor: theme.colors.secondary,
  },
  textInputContent: {
    fontSize: 16,
  },
  errorText: {
    marginBottom: 16,
    marginLeft: 12,
    marginTop: 4,
  },
  roleSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontWeight: "600",
    marginBottom: 16,
  },
  roleCard: {
    marginBottom: 12,
    backgroundColor: theme.colors.secondary,
    borderWidth: 0,
  },
  selectedRoleCard: {
    borderWidth: 2,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.surface,
  },
  roleCardContent: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  roleOption: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  roleInfo: {
    flex: 1,
    marginLeft: 8,
  },
  roleTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  roleIcon: {
    margin: 0,
    marginRight: 8,
  },
  roleTitle: {
    fontWeight: "600",
  },
  roleDescription: {
    lineHeight: 18,
    paddingRight: 16,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 24,
    paddingVertical: 24,
    gap: 12,
  },
  cancelButton: {
    borderRadius: 20,
    borderColor: "#E0E0E0",
  },
  sendButton: {
    borderRadius: 20,
    elevation: 2,
  },
  buttonContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  cancelButtonLabel: {
    fontWeight: "500",
  },
  sendButtonLabel: {
    fontWeight: "600",
  },
});

export default styles;
