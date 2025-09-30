import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, View } from "react-native";
import { useTheme } from "../themeprovider";
import styles from "./styles";

interface Props {
  children: React.ReactNode;
}
const ScreenLayout: React.FC<Props> = ({ children }) => {
  const { theme } = useTheme();

  const _styles = styles(theme);
  return (
    <SafeAreaView style={_styles.container} className="bg-black flex-1">
      <StatusBar translucent barStyle={"dark-content"} />
      {children}
    </SafeAreaView>
  );
};

export default ScreenLayout;
