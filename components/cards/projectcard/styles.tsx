import { StyleSheet } from "react-native";

const colors = {
  primary: "#6750A4",
  secondary: "#F7F2FA",
  text: "#1A1A1A",
  subText: "#666666",
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 2,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardContent: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  projectName: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    flex: 1,
    marginRight: 12,
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  statusChip: {
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    minWidth: 80,
    alignItems: "center",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  // Status-specific styles
  statusActive: {
    backgroundColor: colors.secondary,
  },
  statusActiveText: {
    color: colors.primary,
  },
  statusPending: {
    backgroundColor: "#FFF8E1",
  },
  statusPendingText: {
    color: "#F57F17",
  },
  statusCompleted: {
    backgroundColor: "#E8F5E8",
  },
  statusCompletedText: {
    color: "#2E7D32",
  },
  statusOnHold: {
    backgroundColor: "#FFF3E0",
  },
  statusOnHoldText: {
    color: "#EF6C00",
  },
  statusCancelled: {
    backgroundColor: "#FFEBEE",
  },
  statusCancelledText: {
    color: "#C62828",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  projectInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  infoText: {
    fontSize: 14,
    color: colors.subText,
    fontWeight: "500",
    marginLeft: 6,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  actionButton: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: colors.secondary,
  },
  actionIcon: {
    color: colors.subText,
  },
});

export default styles;
