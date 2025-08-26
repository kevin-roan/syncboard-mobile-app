import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { Menu } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  id: string;
  title: string;
  description: string;
  onStatusChangeCb: (taskId: string, status: string) => void;
  status: string;
  handleDeleteTask: (id: string) => void;
}

const TaskCard: React.FC<Props> = ({
  id,
  title,
  onStatusChangeCb,
  description,
  status,
  handleDeleteTask,
}) => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      <View style={styles.cardHead}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
        <TouchableOpacity onPress={() => handleDeleteTask(id)}>
          <MaterialCommunityIcons name="dots-vertical" size={20} />
        </TouchableOpacity>
      </View>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <TouchableOpacity
            style={styles.badge}
            onPress={() => setMenuVisible(true)}
          >
            <Text style={styles.badgeText}>{status}</Text>
          </TouchableOpacity>
        }
        anchorPosition="bottom"
      >
        <Menu.Item
          onPress={() => {
            onStatusChangeCb(id, "todo");
          }}
          title="Todo"
        />
        <Menu.Item
          onPress={() => {
            onStatusChangeCb(id, "in_progress");
          }}
          title="In Progress"
        />
        <Menu.Item
          onPress={() => {
            onStatusChangeCb(id, "completed");
          }}
          title="Completed"
        />
      </Menu>
    </View>
  );
};

export default TaskCard;
