import { Tabs } from "expo-router";
import { BottomNavigation } from "react-native-paper";
import { useState } from "react";

export default function Layout() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "dashboard/index", title: "Dashboard", focusedIcon: "home" },
    { key: "profile/index", title: "Profile", focusedIcon: "account" },
  ]);

  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={({ navigation }) => (
        <BottomNavigation.Bar
          navigationState={{ index, routes }}
          onTabPress={({ route }) => {
            setIndex(routes.findIndex((r) => r.key === route.key));
            navigation.navigate(route.key as never);
          }}
        />
      )}
    >
      <Tabs.Screen name="dashboard/index" />
      <Tabs.Screen name="profile/index" />
    </Tabs>
  );
}
