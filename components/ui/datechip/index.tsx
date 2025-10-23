import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

interface Props {
  date: string;
  onPress?: (dateObj: { due: string }) => void;
}

const DateChip: React.FC<Props> = ({ date, onPress }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const onChange = (_event: any, newDate?: Date) => {
    if (newDate) setSelectedDate(newDate);
    // @ts-ignore-next-line
    if (newDate) {
      const dateString = newDate.toISOString().split('T')[0];

      onPress?.({ due: dateString });
    }
  };

  const showDatepicker = () => {
    DateTimePickerAndroid.open({
      value: selectedDate,
      onChange,
      mode: 'date',
      is24Hour: true,
    });
  };

  return (
    <TouchableOpacity
      onPress={() => {
        showDatepicker();
      }}
      className="flex-row items-center gap-2 rounded-full bg-input px-3 py-[2px]">
      <FontAwesome5 name="calendar" size={12} color="red" />
      <Text className="text-sm font-light">{date}</Text>
    </TouchableOpacity>
  );
};

export default DateChip;
