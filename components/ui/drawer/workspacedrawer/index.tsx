import React from "react";

import { TouchableOpacity, View } from "react-native";

import { Portal, Modal, Text } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { colors } from "./styles";

interface Workspace {
  id: string;
  name: string;
  // add other workspace properties as needed
}

interface WorkspaceDrawerProps {
  drawerVisible: boolean;
  toggleDrawer: () => void;
  active: Workspace | null; // Accept workspace object
  setActive: (workspace: Workspace) => void; // Accept workspace object
  router: any;
  workspaces: Workspace[]; // Array of all workspaces
}

const WorkspaceDrawerModal: React.FC<WorkspaceDrawerProps> = ({
  drawerVisible,
  toggleDrawer,
  active,
  setActive,
  router,
  workspaces = [],
}) => {
  return (
    <Portal>
      <Modal
        visible={drawerVisible}
        onDismiss={toggleDrawer}
        contentContainerStyle={styles.modalContainer}
      >
        <TouchableOpacity
          style={styles.backdrop}
          onPress={toggleDrawer}
          activeOpacity={1}
        />

        <View style={styles.drawerContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerText}>Workspaces</Text>
          </View>

          {/* Workspace Items */}
          <View style={styles.workspaceContainer}>
            {workspaces.map((workspace, index) => (
              <TouchableOpacity
                key={workspace.id}
                style={[
                  styles.workspaceItem,
                  active?.id === workspace.id
                    ? styles.workspaceItemActive
                    : styles.workspaceItemInactive,
                ]}
                onPress={() => {
                  setActive(workspace);
                  router.replace("/dashboard");
                  toggleDrawer();
                }}
              >
                <MaterialIcons
                  name={index === 0 ? "work" : "work-outline"}
                  size={24}
                  color={
                    active?.id === workspace.id
                      ? colors.primary
                      : colors.onSurfaceVariant
                  }
                  style={styles.workspaceIcon}
                />
                <Text
                  style={[
                    styles.workspaceText,
                    active?.id === workspace.id
                      ? styles.workspaceTextActive
                      : styles.workspaceTextInactive,
                  ]}
                >
                  {workspace.name}
                </Text>
              </TouchableOpacity>
            ))}

            {/* Add Create Workspace option if no workspaces */}
            {workspaces.length === 0 && (
              <TouchableOpacity
                style={styles.workspaceItem}
                onPress={() => {
                  router.push("/(modal)/createworkspace");
                  toggleDrawer();
                }}
              >
                <MaterialIcons
                  name="add"
                  size={24}
                  color={colors.primary}
                  style={styles.workspaceIcon}
                />
                <Text style={[styles.workspaceText, { color: colors.primary }]}>
                  Create Workspace
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Bottom Section - Settings */}
          <View style={styles.bottomSection}>
            <TouchableOpacity
              style={styles.settingsItem}
              onPress={() => {
                // Handle settings navigation
                console.log("Settings pressed");
                toggleDrawer();
              }}
            >
              <MaterialIcons
                name="settings"
                size={24}
                color={colors.onSurfaceVariant}
                style={styles.settingsIcon}
              />
              <Text style={styles.settingsText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};
export default WorkspaceDrawerModal;
