import { useApp } from "@/context/appctx";
import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from "react-native";
import { Button, Modal, Portal, Text } from "react-native-paper";

interface User {
  user_id: string; // updated from id to user_id
  name: string;
  email: string;
  username: string;
}

interface TaskFormData {
  taskName: string;
  taskDescription: string;
  dueDate: string;
  assignedUserId: string;
}

interface Props {
  title: string;
  visible: boolean;
  onDismissCb: () => void;
  onSubmit: (formData: TaskFormData) => void;
}

const TaskFormModal: React.FC<Props> = ({
  title,
  visible,
  onDismissCb,
  onSubmit,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDay, setDueDay] = useState("");
  const [dueMonth, setDueMonth] = useState("");
  const [dueYear, setDueYear] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { memberList } = useApp();

  useEffect(() => {
    setModalVisible(visible);
    if (visible) {
      resetForm();
    }
  }, [visible]);

  const resetForm = () => {
    setTaskName("");
    setTaskDescription("");
    setDueDay("");
    setDueMonth("");
    setDueYear("");
    setAssignedUserId("");
    setDropdownOpen(false);
  };

  const handleSubmit = () => {
    const dueDate = `${dueDay.padStart(2, "0")}/${dueMonth.padStart(
      2,
      "0",
    )}/${dueYear.padStart(4, "0")}`;
    const formData: TaskFormData = {
      taskName: taskName.trim(),
      taskDescription: taskDescription.trim(),
      dueDate,
      assignedUserId,
    };
    onSubmit(formData);
    resetForm();
  };

  const handleCancel = () => {
    resetForm();
    onDismissCb();
  };

  const getSelectedUser = () =>
    memberList.find((user) => user.user_id === assignedUserId);

  const renderMember: ListRenderItem<User> = ({ item }) => {
    const selected = assignedUserId === item.user_id;
    return (
      <TouchableOpacity
        style={[styles.dropdownItem, selected && styles.dropdownItemSelected]}
        onPress={() => {
          setAssignedUserId(item.user_id);
          setDropdownOpen(false);
        }}
      >
        <View>
          <Text
            style={[
              styles.dropdownItemName,
              selected && styles.dropdownItemNameSelected,
            ]}
          >
            {item.name}
          </Text>
          <Text
            style={[
              styles.dropdownItemEmail,
              selected && styles.dropdownItemEmailSelected,
            ]}
          >
            {item.email}
          </Text>
          <Text
            style={[
              styles.dropdownItemEmail,
              selected && styles.dropdownItemEmailSelected,
              { fontStyle: "italic" },
            ]}
          >
            @{item.username}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Portal>
      <Modal visible={modalVisible} onDismiss={handleCancel} dismissable>
        <View style={styles.modalOverlay}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
            </View>

            {/* Task Name Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Task Name</Text>
              <TextInput
                placeholder="Enter task name"
                value={taskName}
                onChangeText={setTaskName}
                style={styles.textInput}
                autoCapitalize="sentences"
                maxLength={100}
              />
            </View>

            {/* Task Description Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Task Description</Text>
              <TextInput
                placeholder="Enter task description (optional)"
                value={taskDescription}
                onChangeText={setTaskDescription}
                style={[styles.textInput, styles.textAreaInput]}
                multiline
                numberOfLines={4}
                autoCapitalize="sentences"
                maxLength={500}
                textAlignVertical="top"
              />
            </View>

            {/* Due Date Inputs */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Due Date</Text>
              <View style={styles.dueDateContainer}>
                <TextInput
                  placeholder="DD"
                  value={dueDay}
                  onChangeText={(val) => {
                    const cleaned = val.replace(/[^0-9]/g, "").slice(0, 2);
                    setDueDay(cleaned);
                  }}
                  style={[styles.textInput, styles.dueDateInput]}
                  keyboardType="numeric"
                  maxLength={2}
                />
                <TextInput
                  placeholder="MM"
                  value={dueMonth}
                  onChangeText={(val) => {
                    const cleaned = val.replace(/[^0-9]/g, "").slice(0, 2);
                    setDueMonth(cleaned);
                  }}
                  style={[styles.textInput, styles.dueDateInput]}
                  keyboardType="numeric"
                  maxLength={2}
                />
                <TextInput
                  placeholder="YYYY"
                  value={dueYear}
                  onChangeText={(val) => {
                    const cleaned = val.replace(/[^0-9]/g, "").slice(0, 4);
                    setDueYear(cleaned);
                  }}
                  style={[styles.textInput, styles.dueYearInput]}
                  keyboardType="numeric"
                  maxLength={4}
                />
              </View>
            </View>

            {/* User Assignment Dropdown */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Assign To</Text>
              <TouchableOpacity
                style={[
                  styles.dropdownButton,
                  dropdownOpen && styles.dropdownButtonFocused,
                ]}
                onPress={() => setDropdownOpen((prev) => !prev)}
              >
                <Text
                  style={[
                    styles.dropdownText,
                    !getSelectedUser() && styles.dropdownPlaceholder,
                  ]}
                >
                  {getSelectedUser()?.username ?? "Select a user"}
                </Text>
              </TouchableOpacity>
              {dropdownOpen && (
                <View style={styles.dropdownList}>
                  <FlatList
                    data={memberList}
                    keyExtractor={(item) => item.user_id} // changed from item.id
                    renderItem={renderMember}
                    nestedScrollEnabled
                    showsVerticalScrollIndicator={false}
                    style={styles.dropdownScrollView}
                  />
                </View>
              )}
            </View>

            {/* Character Counter */}
            <View style={styles.characterCounter}>
              <Text style={styles.characterCounterText}>
                Description: {taskDescription.length}/500
              </Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <Button
                onPress={handleCancel}
                mode="outlined"
                style={styles.cancelButton}
                contentStyle={styles.cancelButtonContent}
                labelStyle={styles.cancelButtonText}
              >
                Cancel
              </Button>
              <Button
                onPress={handleSubmit}
                mode="contained"
                style={styles.submitButton}
                contentStyle={styles.submitButtonContent}
                labelStyle={styles.submitButtonText}
              >
                Create Task
              </Button>
            </View>
          </ScrollView>
        </View>
      </Modal>
    </Portal>
  );
};

export default TaskFormModal;

const styles = StyleSheet.create({
  modalOverlay: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginVertical: 40,
    borderRadius: 24,
    maxHeight: "90%",
    elevation: 12,
    shadowColor: "#6750A4",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(103, 80, 164, 0.08)",
  },
  scrollContainer: {
    padding: 24,
    paddingBottom: 16,
  },
  header: {
    marginBottom: 32,
    alignItems: "center",
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A1A1A",
    fontFamily: "Roboto",
    textAlign: "center",
    letterSpacing: 0.3,
  },
  inputContainer: {
    marginBottom: 24,
    position: "relative",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    fontFamily: "Roboto",
    marginBottom: 8,
    letterSpacing: 0.1,
  },
  textInput: {
    backgroundColor: "#FAFAFA",
    borderRadius: 16,
    fontSize: 16,
    fontFamily: "Roboto",
    borderColor: "#E0E0E0",
    borderWidth: 1.5,
    paddingHorizontal: 16,
    paddingVertical: 16,
    color: "#1A1A1A",
    minHeight: 56,
  },
  textAreaInput: {
    minHeight: 120,
    textAlignVertical: "top",
    paddingTop: 16,
  },
  dueDateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  dueDateInput: {
    flex: 1,
    textAlign: "center",
  },
  dueYearInput: {
    flex: 2,
    textAlign: "center",
  },
  dropdownButton: {
    backgroundColor: "#FAFAFA",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
    paddingHorizontal: 16,
    paddingVertical: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 56,
  },
  dropdownButtonFocused: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2.5,
    borderColor: "#6750A4",
    elevation: 2,
    shadowColor: "#6750A4",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: "Roboto",
    color: "#1A1A1A",
    flex: 1,
  },
  dropdownPlaceholder: {
    color: "#999999",
    fontStyle: "italic",
  },
  dropdownList: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginTop: 8,
    elevation: 6,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    maxHeight: 200,
  },
  dropdownScrollView: {
    maxHeight: 200,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: "#F0F0F0",
    backgroundColor: "#FFFFFF",
  },
  dropdownItemSelected: {
    backgroundColor: "#F3F0FF",
    borderBottomColor: "#6750A4",
  },
  dropdownItemName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    fontFamily: "Roboto",
    marginBottom: 2,
  },
  dropdownItemNameSelected: {
    color: "#6750A4",
  },
  dropdownItemEmail: {
    fontSize: 14,
    color: "#666666",
    fontFamily: "Roboto",
  },
  dropdownItemEmailSelected: {
    color: "#6750A4",
    opacity: 0.8,
  },
  characterCounter: {
    alignItems: "flex-end",
    marginBottom: 8,
    marginTop: -16,
  },
  characterCounterText: {
    fontSize: 12,
    color: "#999999",
    fontFamily: "Roboto",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#E0E0E0",
  },
  cancelButtonContent: {
    paddingVertical: 12,
    height: 56,
  },
  cancelButtonText: {
    color: "#666666",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Roboto",
    letterSpacing: 0.2,
  },
  submitButton: {
    flex: 1,
    backgroundColor: "#6750A4",
    borderRadius: 20,
    elevation: 4,
    shadowColor: "#6750A4",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  submitButtonContent: {
    paddingVertical: 12,
    height: 56,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Roboto",
    letterSpacing: 0.2,
  },
});
