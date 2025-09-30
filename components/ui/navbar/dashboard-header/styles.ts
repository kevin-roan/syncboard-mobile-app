import { FONT, FONT_FAMILY } from "@/constants/Typography";
import { StyleSheet } from "react-native";

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    left: {
      gap: 10,
    },
    title: {
      fontSize: FONT.LARGE,
      fontFamily: FONT_FAMILY.REGULAR,
    },
    right: {
      gap: 10,
    },
  });

export default styles;
