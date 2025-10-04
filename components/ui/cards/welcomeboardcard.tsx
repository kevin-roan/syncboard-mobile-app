import React from 'react';
import { View, Text, Button } from 'react-native';

const data = {
  title: 'Learn to create issues on Syncboard with AI',
  desc: 'Easily generate issues on Syncboard and get AI assistance for quick setup. Save time and stay organize',
  buttonText: 'Learn Syncboard',
};

const WelcomeBoardCard = () => {
  return (
    <View className="rounded-lg bg-background p-3 dark:bg-dark-background ">
      <Text>{data.title}</Text>
      <Text>{data.desc}</Text>
      <Button>
        <Text>{data.buttonText}</Text>
      </Button>
    </View>
  );
};

export default WelcomeBoardCard;
