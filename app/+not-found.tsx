import { View, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Button } from 'react-native-paper';
import { Text } from '@/components/ui/text';
import ScreenLayout from '@/provider/screenlayout';

const NotFound = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleRedirect = () => {
    router.replace('/');
  };

  return (
    <ScreenLayout>
      <View style={styles.container}>
        <Text variant={'h4'}>404 Not Found</Text>
        <Text className="text-center text-white">Path {pathname}</Text>
        <Button onPress={handleRedirect}>Back to Home</Button>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NotFound;
