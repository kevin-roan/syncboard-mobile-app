import * as React from "react";
import styles from "./styles";
import { View, Text } from "react-native";

interface Props {
  title: string;
  onDrawerButtonPress: () => void;
}

const DashboardNavigation: React.FC<Props> = ({
  title,
  onDrawerButtonPress,
}) => {
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
    </View>
  );
};

export default DashboardNavigation;
