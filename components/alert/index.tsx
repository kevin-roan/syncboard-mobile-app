import { Text } from '@/components/ui/text';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  title?: string;
  info?: string;
  cancelButtonText?: string;
  submitButtonText?: string;
  cancelButtonIcon?: string;
  submitButtonIcon?: Element;
  onCancel: () => void;
  onSubmit?: () => void;
}

const MinimalAlert: React.FC<Props> = ({
  title,
  info,
  cancelButtonText,
  submitButtonText,
  cancelButtonIcon,
  submitButtonIcon,
  onCancel,
  onSubmit,
}) => {
  return (
    <View className="m-10  rounded-xl bg-card" style={styles.container}>
      <View className="gap-4 p-4">
        <Text className=" text-center text-lg font-medium text-white">{title ?? 'Alert'}</Text>
        <Text className="text-center font-light text-muted">{info}</Text>
      </View>

      <View className="w-full flex-row">
        <TouchableOpacity
          onPress={onCancel}
          className="flex-1 flex-col items-center justify-center rounded-bl-md bg-popover p-4">
          <Text className="text-center text-sm text-muted">{cancelButtonText ?? 'Close'}</Text>
          {!!cancelButtonIcon && cancelButtonIcon}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onSubmit}
          className="flex-1 flex-row items-center justify-center gap-3  rounded-br-md bg-input p-4">
          <Text className="text-center text-sm text-white">{submitButtonText ?? 'Save'}</Text>
          {!!submitButtonIcon && submitButtonIcon}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default MinimalAlert;
