import { useColorScheme, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';

import { THEME } from '@/lib/theme';

import Ionicons from '@expo/vector-icons/Ionicons';

const data = {
  title: 'Learn to create issues on Syncboard with AI',
  desc: 'Easily generate issues on Syncboard andget AI assistance for quick setup.Save time and stay organize',
  buttonText: 'Learn Syncboard',
};

const WelcomeBoardCard = () => {
  const scheme = useColorScheme();
  return (
    <View className="mb-3 rounded-3xl bg-card p-5">
      <Text className="font-medium text-white">{data.title}</Text>

      <View className="mt-2 flex-row items-start">
        <Text className="flex-shrink text-sm text-muted">{data.desc}</Text>
        <Ionicons
          name="flag-outline"
          size={50}
          // @ts-expect-error
          color={THEME[scheme].muted}
          style={{ marginLeft: 8 }}
        />
      </View>

      <Button
        className="m-0 mt-3 items-center  justify-center self-end rounded-lg bg-white px-4 py-0"
        size={'sm'}>
        <Text className="text-sm text-muted">{data.buttonText}</Text>
      </Button>
    </View>
  );
};

export default WelcomeBoardCard;
