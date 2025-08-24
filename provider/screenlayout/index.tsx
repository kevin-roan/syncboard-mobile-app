import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

interface Props {
  children: React.ReactNode;
}

const ScreenLayout: React.FC<Props> = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar translucent barStyle={"dark-content"} />
      {children}
    </SafeAreaView>
  );
};

export default ScreenLayout;
