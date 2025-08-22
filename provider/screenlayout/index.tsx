import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { PaperProvider } from "react-native-paper";

interface Props {
  children: React.ReactNode;
}

const ScreenLayout: React.FC<Props> = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PaperProvider>
        <StatusBar translucent barStyle={"dark-content"} />
        {children}
      </PaperProvider>
    </SafeAreaView>
  );
};

export default ScreenLayout;
