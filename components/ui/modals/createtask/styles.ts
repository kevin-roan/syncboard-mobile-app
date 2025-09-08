import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalOverlay: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginVertical: 40,
    borderRadius: 24,
    maxHeight: "90%",
    elevation: 12,
    shadowColor: "#6750A4",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(103, 80, 164, 0.08)",
  },

  scrollContainer: {
    padding: 24,
    paddingBottom: 16,
  },

  header: {
    marginBottom: 32,
    alignItems: "center",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A1A1A",
    fontFamily: "Roboto",
    textAlign: "center",
    letterSpacing: 0.3,
  },

  inputContainer: {
    marginBottom: 24,
    position: "relative",
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    fontFamily: "Roboto",
    marginBottom: 8,
    letterSpacing: 0.1,
  },

  textInput: {
    backgroundColor: "#FAFAFA",
    borderRadius: 16,
    fontSize: 16,
    fontFamily: "Roboto",
    borderColor: "#E0E0E0",
    borderWidth: 1.5,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: "#1A1A1A",
    minHeight: 56,
  },

  textInputFocused: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2.5,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderColor: "#6750A4",
    fontSize: 16,
    fontFamily: "Roboto",
    color: "#1A1A1A",
    minHeight: 56,
    elevation: 2,
    shadowColor: "#6750A4",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  textInputError: {
    backgroundColor: "#FFF8F8",
    borderWidth: 2.5,
    borderColor: "#E53E3E",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    fontFamily: "Roboto",
    color: "#1A1A1A",
    minHeight: 56,
  },

  textAreaInput: {
    minHeight: 120,
    textAlignVertical: "top",
    paddingTop: 16,
  },

  errorText: {
    fontSize: 13,
    color: "#E53E3E",
    fontFamily: "Roboto",
    marginTop: 6,
    marginLeft: 4,
    fontWeight: "500",
  },

  // Dropdown Styles
  dropdownButton: {
    backgroundColor: "#FAFAFA",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    paddingHorizontal: 16,
    paddingVertical: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 56,
  },

  dropdownButtonFocused: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2.5,
    borderColor: "#6750A4",
    elevation: 2,
    shadowColor: "#6750A4",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  dropdownButtonError: {
    backgroundColor: "#FFF8F8",
    borderWidth: 2.5,
    borderColor: "#E53E3E",
  },

  dropdownText: {
    fontSize: 16,
    fontFamily: "Roboto",
    color: "#1A1A1A",
    flex: 1,
  },

  dropdownPlaceholder: {
    color: "#999999",
    fontStyle: "italic",
  },

  dropdownList: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginTop: 8,
    elevation: 6,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    maxHeight: 200,
  },

  dropdownScrollView: {
    maxHeight: 200,
  },

  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F0F0F0",
    backgroundColor: "#FFFFFF",
  },

  dropdownItemSelected: {
    backgroundColor: "#F3F0FF",
    borderBottomColor: "#6750A4",
  },

  dropdownItemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    fontFamily: "Roboto",
    marginBottom: 2,
  },

  dropdownItemNameSelected: {
    color: "#6750A4",
  },

  dropdownItemEmail: {
    fontSize: 14,
    color: "#666666",
    fontFamily: "Roboto",
  },

  dropdownItemEmailSelected: {
    color: "#6750A4",
    opacity: 0.8,
  },

  // Character Counter
  characterCounter: {
    alignItems: "flex-end",
    marginBottom: 8,
    marginTop: -16,
  },

  characterCounterText: {
    fontSize: 12,
    color: "#999999",
    fontFamily: "Roboto",
  },

  // Button Styles
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },

  cancelButton: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
  },

  cancelButtonContent: {
    paddingVertical: 12,
    height: 56,
  },

  cancelButtonText: {
    color: "#666666",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Roboto",
    letterSpacing: 0.2,
  },

  submitButton: {
    flex: 1,
    backgroundColor: "#6750A4",
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#6750A4",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  submitButtonContent: {
    paddingVertical: 12,
    height: 56,
  },

  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Roboto",
    letterSpacing: 0.2,
  },

  submitButtonDisabled: {
    backgroundColor: "#E0E0E0",
    elevation: 0,
    shadowOpacity: 0,
  },

  submitButtonTextDisabled: {
    color: "#999999",
  },
});

export default styles;
