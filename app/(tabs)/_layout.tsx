import { Tabs, router } from 'expo-router';
import { View, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useInputModal } from '@/provider/inputprovider';

export default function Layout() {
  return (
    <Tabs
      initialRouteName="dashboard/index"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}>
      <Tabs.Screen name="dashboard/index" />
      <Tabs.Screen name="profile/index" />
    </Tabs>
  );
}

function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const isHomeActive = state.index === 0;
  const isProfileActive = state.index === 1;

  const { toggleModal } = useInputModal();

  return (
    <View className="flex-row items-center justify-around bg-neutral-800 pb-4 pt-2">
      <TabButton
        label="Home"
        icon="home-outline"
        activeIcon="home"
        isActive={isHomeActive}
        onPress={() => navigation.navigate(state.routes[0].name)}
      />

      <ExtraButton label="Create Project" onPress={() => toggleModal('project')} />

      <TabButton
        label="Profile"
        icon="account-outline"
        activeIcon="account"
        isActive={isProfileActive}
        onPress={() => navigation.navigate(state.routes[1].name)}
      />
    </View>
  );
}

function TabButton({
  label,
  icon,
  activeIcon,
  isActive,
  onPress,
}: {
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  activeIcon: keyof typeof MaterialCommunityIcons.glyphMap;
  isActive: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      className="w-20 items-center justify-center"
      onPress={onPress}
      accessibilityRole="button">
      <MaterialCommunityIcons
        name={isActive ? activeIcon : icon}
        size={22}
        color={isActive ? '#ffffff' : '#9ca3af'}
      />
      <Text className={isActive ? 'mt-1 text-xs text-white' : 'mt-1 text-xs text-gray-400'}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function ExtraButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <View className="items-center justify-center">
      <TouchableOpacity
        className="h-14 w-14 items-center justify-center rounded-full bg-gray-200"
        onPress={onPress}
        accessibilityRole="button">
        <MaterialCommunityIcons name="plus" size={26} color="#333333" />
      </TouchableOpacity>
      <Text className="mt-2 text-sm text-gray-400">{label}</Text>
    </View>
  );
}
