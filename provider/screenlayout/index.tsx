import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

interface Props {
  children: React.ReactNode;
}

const ScreenLayout: React.FC<Props> = ({ children }) => {
  return (
    <SafeAreaView>
      <StatusBar
        translucent
        backgroundColor={"white"}
        barStyle={"dark-content"}
      />
      {children}
    </SafeAreaView>
  );
};

export default ScreenLayout;
