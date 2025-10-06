import ScreenLayout from '@/provider/screenlayout';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

interface T {
  message: string;
  onRetry?: () => void;
}

const ErrorScreen = ({ message = 'Something went wrong.', onRetry }) => {
  return (
    <ScreenLayout>
      <View className="flex-1 items-center justify-center bg-white px-6">
        <FontAwesome5 name="exclamation-triangle" size={60} color="#f87171" className="mb-4" />
        <Text className="mb-2 text-xl font-bold text-red-600">Error</Text>
        <Text className="mb-6 text-center text-base text-gray-600">{message}</Text>
        {onRetry && (
          <TouchableOpacity className="rounded bg-red-600 px-6 py-3" onPress={onRetry}>
            <Text className="font-semibold text-white">Retry</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScreenLayout>
  );
};

export default ErrorScreen;
