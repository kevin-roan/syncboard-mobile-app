import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "transparent",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.32)", // Material 3 scrim overlay
  },
  drawerContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 280, // Material 3 standard drawer width
    backgroundColor: "#fefbff", // Material 3 surface container low
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e7e0ec", // Material 3 outline variant
  },
  headerText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#49454f", // Material 3 on surface variant
    letterSpacing: 0.1,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  workspaceContainer: {
    flex: 1,
    paddingTop: 8,
  },
  workspaceItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 12,
    marginVertical: 2,
    borderRadius: 28,
  },
  workspaceItemActive: {
    backgroundColor: "#e8def8", // Material 3 secondary container
  },
  workspaceItemInactive: {
    backgroundColor: "transparent",
  },
  workspaceIcon: {
    marginRight: 12,
  },
  workspaceText: {
    fontSize: 14,
    letterSpacing: 0.1,
  },
  workspaceTextActive: {
    fontWeight: "500",
    color: "#21005d", // Material 3 on secondary container
  },
  workspaceTextInactive: {
    fontWeight: "400",
    color: "#1d1b20", // Material 3 on surface
  },
  bottomSection: {
    borderTopWidth: 1,
    borderTopColor: "#e7e0ec",
    paddingTop: 8,
    paddingBottom: 16,
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 12,
    borderRadius: 28,
  },
  settingsIcon: {
    marginRight: 12,
  },
  settingsText: {
    fontSize: 14,
    fontWeight: "400",
    color: "#1d1b20",
    letterSpacing: 0.1,
  },
});

// Color constants for easy maintenance
export const colors = {
  // Material 3 colors
  surfaceContainerLow: "#fefbff",
  outlineVariant: "#e7e0ec",
  onSurfaceVariant: "#49454f",
  onSurface: "#1d1b20",
  primary: "#6750a4",
  secondaryContainer: "#e8def8",
  onSecondaryContainer: "#21005d",
  scrim: "rgba(0, 0, 0, 0.32)",
};
