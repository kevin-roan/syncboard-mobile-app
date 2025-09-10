import { Stack } from "expo-router";

const TaskLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          title: "Task Details",
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
};

export default TaskLayout;
