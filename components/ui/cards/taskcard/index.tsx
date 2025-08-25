import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Menu } from "react-native-paper";

interface Props {
  title: string;
  description: string;
  onStatusChangeCb: (status: string) => void;
  status: string;
}

const TaskCard: React.FC<Props> = ({
  title,
  onStatusChangeCb,
  description,
  status,
}) => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <TouchableOpacity
            style={styles.badge}
            onPress={() => setMenuVisible(true)}
          >
            <Text style={styles.badgeText}>Todo</Text>
          </TouchableOpacity>
        }
        anchorPosition="bottom"
      >
        <Menu.Item
          onPress={() => {
            onStatusChangeCb("todo");
          }}
          title="Todo"
        />
        <Menu.Item
          onPress={() => {
            onStatusChangeCb("in_progress");
          }}
          title="In Progress"
        />
        <Menu.Item
          onPress={() => {
            onStatusChangeCb("completed");
          }}
          title="Completed"
        />
      </Menu>
    </View>
  );
};

export default TaskCard;
