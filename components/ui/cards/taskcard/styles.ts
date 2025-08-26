import { Colors } from "@/constants/Colors";
import { FONT } from "@/constants/Typography";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "rgba(0,0,0,0.4)",
    elevation: 10,
  },
  title: {
    fontSize: FONT.MEDIUM,
    fontWeight: "bold",
    color: Colors.light.text,
  },
  badge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 20,
    shadowColor: Colors.primary,
    alignSelf: "flex-end",
  },
  badgeText: {
    color: "white",
    fontSize: FONT.SMALL,
  },
  description: {
    fontSize: FONT.SMALL,
    color: Colors.subText,
  },
  cardHead: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default styles;
