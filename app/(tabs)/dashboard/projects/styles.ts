import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  tasksContainer: {
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingBottom: 100,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default styles;

