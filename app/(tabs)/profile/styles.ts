import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFBFE", // MD3 surface color
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 24,
    backgroundColor: "#F7F2FA", // MD3 surface variant
    marginBottom: 8,
  },
  avatar: {
    marginBottom: 16,
    backgroundColor: "#6750A4", // MD3 primary color
  },
  displayName: {
    fontSize: 24,
    fontWeight: "400",
    color: "#1D1B20", // MD3 on-surface
    marginBottom: 4,
    fontFamily: "Roboto", // MD3 typography
  },
  email: {
    fontSize: 16,
    color: "#49454F", // MD3 on-surface-variant
    marginBottom: 8,
    fontFamily: "Roboto",
  },
  memberSince: {
    fontSize: 14,
    color: "#79747E", // MD3 outline
    fontFamily: "Roboto",
  },
  menuSection: {
    backgroundColor: "#FFFBFE",
    paddingVertical: 8,
  },
  menuItem: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E7E0EC", // MD3 outline variant
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuIcon: {
    marginRight: 16,
    color: "#49454F",
  },
  menuText: {
    fontSize: 16,
    color: "#1D1B20",
    fontFamily: "Roboto",
    flex: 1,
  },
  menuChevron: {
    color: "#79747E",
  },
  actionSection: {
    padding: 24,
    marginTop: "auto",
  },
  logoutButton: {
    backgroundColor: "#B3261E", // MD3 error color
    borderRadius: 20, // MD3 full corner radius for buttons
  },
  logoutButtonContent: {
    paddingVertical: 8,
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Roboto",
  },
});

export default styles;
