import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFBFE", // MD3 surface
    borderRadius: 12, // MD3 medium corner radius
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: "#E7E0EC", // MD3 outline variant
  },
  cardContent: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  projectName: {
    fontSize: 18,
    fontWeight: "500",
    color: "#1D1B20", // MD3 on-surface
    fontFamily: "Roboto",
    flex: 1,
    marginRight: 12,
    lineHeight: 24,
  },
  statusChip: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    minWidth: 80,
    alignItems: "center",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "Roboto",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  // Status-specific styles
  statusActive: {
    backgroundColor: "#E8F5E8", // Light green background
  },
  statusActiveText: {
    color: "#1B5E20", // Dark green text
  },
  statusPending: {
    backgroundColor: "#FFF3E0", // Light orange background
  },
  statusPendingText: {
    color: "#E65100", // Dark orange text
  },
  statusCompleted: {
    backgroundColor: "#E3F2FD", // Light blue background
  },
  statusCompletedText: {
    color: "#0D47A1", // Dark blue text
  },
  statusOnHold: {
    backgroundColor: "#F3E5F5", // Light purple background
  },
  statusOnHoldText: {
    color: "#4A148C", // Dark purple text
  },
  statusCancelled: {
    backgroundColor: "#FFEBEE", // Light red background
  },
  statusCancelledText: {
    color: "#B71C1C", // Dark red text
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  projectInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  infoText: {
    fontSize: 14,
    color: "#79747E", // MD3 outline
    fontFamily: "Roboto",
    marginLeft: 4,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  actionButton: {
    padding: 8,
    borderRadius: 20,
  },
  actionIcon: {
    color: "#79747E",
  },
});

export default styles;
