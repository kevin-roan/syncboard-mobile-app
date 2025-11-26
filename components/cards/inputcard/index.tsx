import * as React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';

interface Props {
  placeholder: string;
  buttonText: string;
  onSubmit: (text: string) => void;
}

const InputCard: React.FC<Props> = ({ placeholder, onSubmit, buttonText }) => {
  const [text, setText] = React.useState('');
  return (
    <View className="mx-4 my-10 bg-input pb-4" style={styles.container} pointerEvents="box-only">
      <View className="m-4  ms-6 flex-row items-center">
        <View className="h-6 w-[1] bg-white" />
        <TextInput
          placeholder={placeholder ?? 'Type Something..'}
          className="px-2 text-xl font-thin"
          onChangeText={(text) => setText(text)}
        />
      </View>
      <Button
        className="z-50 me-3  ml-auto mt-auto self-end rounded-lg bg-[#fff]"
        variant={'default'}
        onPress={() => onSubmit(text)}>
        <Text className="text-input">{buttonText ?? 'Submit'}</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 170,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: '#404040',
  },
});

export default InputCard;
