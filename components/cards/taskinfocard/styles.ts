import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    margin: 16,
    backgroundColor: "#FFFFFF",
    elevation: 2,
  },
  cardContent: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  assignmentSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  assignmentItem: {
    flex: 1,
    marginHorizontal: 4,
  },
  assignmentRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    marginRight: 8,
  },
  assignmentText: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 2,
  },
  name: {
    fontSize: 14,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
});

export default styles;
