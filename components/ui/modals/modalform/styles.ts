import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalOverlay: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 24,
    borderRadius: 20,
    padding: 24,
    elevation: 8,
    shadowColor: "#6750A4",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    borderWidth: 0.5,
    borderColor: "rgba(103, 80, 164, 0.1)",
  },
  header: {
    marginBottom: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1A1A1A",
    fontFamily: "Roboto",
    textAlign: "center",
    letterSpacing: 0.2,
  },
  inputContainer: {
    marginBottom: 24,
  },
  textInput: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    fontSize: 16,
    fontFamily: "Roboto",
    borderColor: "#6750A4",
    borderWidth: 0.5,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  textInputFocused: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderColor: "#6750A4",
  },
  textInputError: {
    backgroundColor: "#FFEBEE",
    borderWidth: 2,
    borderColor: "#F44336",
  },
  errorText: {
    fontSize: 12,
    color: "#F44336",
    fontFamily: "Roboto",
    marginTop: 8,
    marginLeft: 4,
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E7E0EC",
  },
  cancelButtonContent: {
    paddingVertical: 8,
  },
  cancelButtonText: {
    color: "#666666",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Roboto",
  },
  submitButton: {
    flex: 1,
    backgroundColor: "#6750A4",
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#6750A4",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  submitButtonContent: {
    paddingVertical: 8,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Roboto",
  },
  submitButtonDisabled: {
    backgroundColor: "#E7E0EC",
    elevation: 0,
  },
  submitButtonTextDisabled: {
    color: "#9E9E9E",
  },
});

export default styles;
