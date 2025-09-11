import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import {
  Appbar,
  Text,
  Surface,
  FAB,
  ActivityIndicator,
  useTheme,
} from "react-native-paper";

const TaskLayout = () => {
  return (
    <Stack>
      <StatusBar />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default TaskLayout;
