import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../themeprovider';
import * as StatusBar from 'expo-status-bar';

interface Props {
  children: React.ReactNode;
}

const ScreenLayout: React.FC<Props> = ({ children }) => {
  const { theme, mode } = useTheme();
  StatusBar.setStatusBarStyle(mode === 'system' ? 'auto' : mode);

  return (
    <SafeAreaView
      style={{
        padding: 20,
        backgroundColor: theme.background,
        flex: 1,
      }}>
      {children}
    </SafeAreaView>
  );
};

export default ScreenLayout;
