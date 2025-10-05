import React from 'react';
import { View } from 'react-native';

interface ProgressSegment {
  color: string;
  percentage: number;
}

interface ProgressBarProps {
  progressSegments: ProgressSegment[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progressSegments }) => {
  return (
    <View className="h-3 w-full flex-row overflow-hidden rounded-full bg-gray-300">
      {progressSegments.map(({ color, percentage }, index) => (
        <View key={index} style={{ flex: percentage, backgroundColor: color }} />
      ))}
    </View>
  );
};

export default ProgressBar;
