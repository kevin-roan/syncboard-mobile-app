import { FONT } from "@/constants/Typography";
import { Text, StyleSheet } from "react-native";

interface Props {
  title: string;
}

const Heading: React.FC<Props> = (title) => {
  return <Text style={styles.title}>{title || "Heading 1"}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: FONT.MEDIUM,
  },
});

export default Heading;
