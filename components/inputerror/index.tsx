import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const InputError = ({ error }: { error: string }) =>
  error ? (
    <Animated.Text
      entering={FadeIn.duration(400)}
      exiting={FadeOut.duration(100)}
      className="pt-2 text-destructive">
      {error}
    </Animated.Text>
  ) : null;

export default InputError;
