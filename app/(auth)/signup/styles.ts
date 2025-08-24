import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F2FA", // MD3 surface variant
    justifyContent: "center",
    padding: 24,
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 48,
  },
  logoIcon: {
    color: "#6750A4",
    marginBottom: 16,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A1A1A",
    fontFamily: "Roboto",
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  appSubtitle: {
    fontSize: 16,
    color: "#666666",
    fontFamily: "Roboto",
    textAlign: "center",
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
    elevation: 8,
    shadowColor: "#6750A4",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    borderWidth: 0.5,
    borderColor: "rgba(103, 80, 164, 0.1)",
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1A1A1A",
    fontFamily: "Roboto",
    textAlign: "center",
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  formSubtitle: {
    fontSize: 14,
    color: "#666666",
    fontFamily: "Roboto",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  textInput: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    fontSize: 16,
    fontFamily: "Roboto",
  },
  textInputFocused: {
    backgroundColor: "#FFFFFF",
    // borderWidth: 2,
    // borderColor: "#6750A4",
  },
  textInputError: {
    backgroundColor: "#FFEBEE",
    borderWidth: 2,
    borderColor: "#F44336",
  },
  passwordRequirements: {
    marginTop: 8,
    marginLeft: 4,
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  requirementIcon: {
    marginRight: 8,
  },
  requirementText: {
    fontSize: 12,
    fontFamily: "Roboto",
    fontWeight: "500",
  },
  requirementMet: {
    color: "#4CAF50",
  },
  requirementNotMet: {
    color: "#9E9E9E",
  },
  signUpButton: {
    backgroundColor: "#6750A4",
    borderRadius: 16,
    marginTop: 16,
    elevation: 4,
    shadowColor: "#6750A4",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  signUpButtonContent: {
    paddingVertical: 12,
  },
  signUpButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Roboto",
  },
  signUpButtonDisabled: {
    backgroundColor: "#E7E0EC",
    elevation: 0,
  },
  signUpButtonTextDisabled: {
    color: "#9E9E9E",
  },
  signInSection: {
    alignItems: "center",
    paddingVertical: 16,
  },
  signInText: {
    fontSize: 16,
    color: "#666666",
    fontFamily: "Roboto",
    marginBottom: 16,
    textAlign: "center",
  },
  signInButton: {
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#6750A4",
    backgroundColor: "transparent",
    minWidth: 200,
  },
  signInButtonContent: {
    paddingVertical: 8,
  },
  signInButtonText: {
    color: "#6750A4",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Roboto",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E7E0EC",
  },
  dividerText: {
    fontSize: 14,
    color: "#9E9E9E",
    fontFamily: "Roboto",
    paddingHorizontal: 16,
    fontWeight: "500",
  },
  successMessage: {
    backgroundColor: "#E8F5E8",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#4CAF50",
  },
  successText: {
    fontSize: 14,
    color: "#2E7D32",
    fontFamily: "Roboto",
    fontWeight: "500",
  },
});

export default styles;
