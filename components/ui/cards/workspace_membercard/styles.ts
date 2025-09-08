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
    alignItems: "center",
    marginBottom: 16,
  },

  avatarContainer: {
    marginRight: 16,
  },

  avatar: {
    backgroundColor: colors.secondary,
  },

  avatarText: {
    backgroundColor: colors.primary,
  },

  avatarLabel: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },

  userInfo: {
    flex: 1,
    marginRight: 12,
  },

  userName: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 4,
    letterSpacing: 0.5,
  },

  userEmail: {
    fontSize: 14,
    color: colors.subText,
    fontWeight: "400",
  },

  roleChip: {
    height: 32,
    borderRadius: 16,
  },

  roleChipText: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  defaultChip: {
    backgroundColor: colors.secondary,
  },

  adminChip: {
    backgroundColor: "#FFE8E8",
  },

  managerChip: {
    backgroundColor: "#E8F4FF",
  },

  footer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },

  joinedContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  joinedLabel: {
    fontSize: 14,
    color: colors.subText,
    fontWeight: "500",
  },

  joinedDate: {
    fontSize: 14,
    color: colors.text,
    fontWeight: "600",
  },
});

export default styles;
