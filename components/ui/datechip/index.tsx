import { TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

interface Props {
  date: string;
  onPress: () => void;
}

const DateChip: React.FC<Props> = ({ date, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center gap-2  rounded-full bg-input px-3 py-[2px]">
      <FontAwesome5 name="calendar" size={12} color="red" />
      <Text className="text-sm font-light">{date}</Text>
    </TouchableOpacity>
  );
};

export default DateChip;
