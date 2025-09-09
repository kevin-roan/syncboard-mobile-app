import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from "react-native";
import { Button, Modal, Portal, Text } from "react-native-paper";
import styles from "./styles";
import { useApp } from "@/context/appctx";

interface User {
  id: string;
  name: string;
  email: string;
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
  users: User[];
  onDismissCb: () => void;
  onSubmit: (formData: TaskFormData) => void;
}

const TaskFormModal: React.FC<Props> = ({
  title,
  visible,
  users,
  onDismissCb,
  onSubmit,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [taskNameError, setTaskNameError] = useState("");
  const [dueDateError, setDueDateError] = useState("");
  const [userError, setUserError] = useState("");

  const [taskNameFocused, setTaskNameFocused] = useState(false);
  const [taskDescFocused, setTaskDescFocused] = useState(false);
  const [dueDateFocused, setDueDateFocused] = useState(false);

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
    setDueDate("");
    setAssignedUserId("");
    setDropdownOpen(false);
    clearErrors();
    clearFocus();
  };

  const clearErrors = () => {
    setTaskNameError("");
    setDueDateError("");
    setUserError("");
  };

  const clearFocus = () => {
    setTaskNameFocused(false);
    setTaskDescFocused(false);
    setDueDateFocused(false);
  };

  const validateTaskName = (value: string): string => {
    const trimmed = value.trim();
    if (!trimmed) return "Task name is required";
    if (trimmed.length < 3)
      return "Task name must be at least 3 characters long";
    if (trimmed.length > 100)
      return "Task name must be less than 100 characters";
    return "";
  };

  const validateDueDate = (value: string): string => {
    const trimmed = value.trim();
    if (!trimmed) return "Due date is required";

    const dateRegex = /^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})$/;
    const match = trimmed.match(dateRegex);
    if (!match) return "Please enter date in DD/MM/YYYY format";

    const day = Number(match[1]);
    const month = Number(match[2]);
    const year = Number(match[3]);

    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 2024) {
      return "Please enter a valid date";
    }
    return "";
  };

  const validateUser = (): string => {
    if (!assignedUserId) return "Please select a user to assign the task";
    return "";
  };

  const handleTaskNameChange = (value: string) => {
    setTaskName(value);
    if (taskNameError) setTaskNameError("");
  };

  const handleTaskDescriptionChange = (value: string) =>
    setTaskDescription(value);

  const handleDueDateChange = (value: string) => {
    setDueDate(value);
    if (dueDateError) setDueDateError("");
  };

  const handleUserSelect = (userId: string) => {
    setAssignedUserId(userId);
    setDropdownOpen(false);
    if (userError) setUserError("");
  };

  const handleCancel = () => {
    resetForm();
    onDismissCb();
  };

  const handleSubmit = () => {
    const taskNameErr = validateTaskName(taskName);
    const dueDateErr = validateDueDate(dueDate);
    const userErr = validateUser();

    setTaskNameError(taskNameErr);
    setDueDateError(dueDateErr);
    setUserError(userErr);

    if (taskNameErr || dueDateErr || userErr) return;

    onSubmit({
      taskName: taskName.trim(),
      taskDescription: taskDescription.trim(),
      dueDate: dueDate.trim(),
      assignedUserId,
    });
    resetForm();
  };

  const isValid = (): boolean =>
    taskName.trim().length >= 3 &&
    taskName.trim().length <= 100 &&
    dueDate.trim() !== "" &&
    assignedUserId !== "" &&
    !validateDueDate(dueDate);

  const getInputStyle = (focused: boolean, error: string) => {
    if (error) return styles.textInputError;
    if (focused) return styles.textInputFocused;
    return styles.textInput;
  };

  const getSelectedUser = (): User | undefined =>
    users.find((user) => user.id === assignedUserId);

  const renderUser: ListRenderItem<User> = ({ item }) => {
    const selected = assignedUserId === item.id;
    return (
      <TouchableOpacity
        style={[styles.dropdownItem, selected && styles.dropdownItemSelected]}
        onPress={() => handleUserSelect(item.id)}
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

            {/* Task Name */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Task Name *</Text>
              <TextInput
                placeholder="Enter task name"
                value={taskName}
                onChangeText={handleTaskNameChange}
                onFocus={() => setTaskNameFocused(true)}
                onBlur={() => setTaskNameFocused(false)}
                style={getInputStyle(taskNameFocused, taskNameError)}
                autoCapitalize="sentences"
                maxLength={100}
              />
              {!!taskNameError && (
                <Text style={styles.errorText}>{taskNameError}</Text>
              )}
            </View>

            {/* Task Description */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Task Description</Text>
              <TextInput
                placeholder="Enter task description (optional)"
                value={taskDescription}
                onChangeText={handleTaskDescriptionChange}
                onFocus={() => setTaskDescFocused(true)}
                onBlur={() => setTaskDescFocused(false)}
                style={[
                  getInputStyle(taskDescFocused, ""),
                  styles.textAreaInput,
                ]}
                multiline
                numberOfLines={4}
                autoCapitalize="sentences"
                maxLength={500}
                textAlignVertical="top"
              />
            </View>

            {/* Due Date */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Due Date *</Text>
              <TextInput
                placeholder="DD/MM/YYYY"
                value={dueDate}
                onChangeText={handleDueDateChange}
                onFocus={() => setDueDateFocused(true)}
                onBlur={() => setDueDateFocused(false)}
                style={getInputStyle(dueDateFocused, dueDateError)}
                maxLength={10}
                keyboardType="numeric"
              />
              {!!dueDateError && (
                <Text style={styles.errorText}>{dueDateError}</Text>
              )}
            </View>

            {/* Assign To */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Assign To *</Text>
              <TouchableOpacity
                style={[
                  styles.dropdownButton,
                  userError && styles.dropdownButtonError,
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
                  {getSelectedUser()?.name ?? "Select a user"}
                </Text>
              </TouchableOpacity>

              {dropdownOpen && (
                <View style={styles.dropdownList}>
                  <FlatList
                    data={users}
                    keyExtractor={(item) => item.id}
                    renderItem={renderUser}
                    nestedScrollEnabled
                    showsVerticalScrollIndicator={false}
                    style={styles.dropdownScrollView}
                  />
                </View>
              )}

              {!!userError && <Text style={styles.errorText}>{userError}</Text>}
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
                mode="outlined"
                onPress={handleCancel}
                style={styles.cancelButton}
                contentStyle={styles.cancelButtonContent}
                labelStyle={styles.cancelButtonText}
              >
                Cancel
              </Button>
              <Button
                mode="contained"
                onPress={handleSubmit}
                disabled={!isValid()}
                style={[
                  styles.submitButton,
                  !isValid() && styles.submitButtonDisabled,
                ]}
                contentStyle={styles.submitButtonContent}
                labelStyle={[
                  styles.submitButtonText,
                  !isValid() && styles.submitButtonTextDisabled,
                ]}
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
