import * as React from 'react';
import { View } from 'react-native';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Text } from '@/components/ui/text';

interface Props {
  id: string;
  title: string;
  description: string;
  onStatusChangeCb: (taskId: string, status: string) => void;
  status: string;
  handleDeleteTask: (id: string) => void;
  dueDate: string;
}

const TaskCard = () => {
  return (
    <View className="rounded-md bg-card p-4">
      <Text>{title}</Text>
      <Text>{description}</Text>

      <View className="flex-row">
        <View>
          <Text>3 People</Text>
          <Text>date</Text>
        </View>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Text>Open</Text>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <Text>My Account</Text>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Text>Profile</Text>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Text>Team</Text>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </View>
    </View>
  );
};

export default TaskCard;

// import React, { useState } from "react";
// import { View, Text, TouchableOpacity } from "react-native";
// import styles from "./styles";
// import { Menu } from "react-native-paper";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import moment from "moment";
// import { useRouter } from "expo-router";
//

// const TaskCard: React.FC<Props> = ({
//   id,
//   title,
//   onStatusChangeCb,
//   description,
//   status,
//   handleDeleteTask,
//   dueDate,
// }) => {
//   const [menuVisible, setMenuVisible] = useState<boolean>(false);
//
//   const router = useRouter();
//
//   const handleTaskNavigation = () => {
//     router.push(`/task/${id}`);
//   };
//
//   return (
//     <TouchableOpacity style={styles.container} onPress={handleTaskNavigation}>
//       <View style={styles.cardHead}>
//         <View>
//           <Text style={styles.title}>{title}</Text>
//           <Text style={styles.description}>{description}</Text>
//           <Text style={styles.description}>
//             Due Date {moment(dueDate).format("DD MMM YYYY")}
//           </Text>
//         </View>
//         <TouchableOpacity onPress={() => handleDeleteTask(id)}>
//           <MaterialCommunityIcons name="dots-vertical" size={20} />
//         </TouchableOpacity>
//       </View>
//       <Menu
//         visible={menuVisible}
//         onDismiss={() => setMenuVisible(false)}
//         anchor={
//           <TouchableOpacity
//             style={styles.badge}
//             onPress={() => setMenuVisible(true)}
//           >
//             <Text style={styles.badgeText}>{status}</Text>
//           </TouchableOpacity>
//         }
//         anchorPosition="bottom"
//       >
//         <Menu.Item
//           onPress={() => {
//             onStatusChangeCb(id, "todo");
//           }}
//           title="Todo"
//         />
//         <Menu.Item
//           onPress={() => {
//             onStatusChangeCb(id, "in_progress");
//           }}
//           title="In Progress"
//         />
//         <Menu.Item
//           onPress={() => {
//             onStatusChangeCb(id, "completed");
//           }}
//           title="Completed"
//         />
//       </Menu>
//     </TouchableOpacity>
//   );
// };
//
// export default TaskCard;
