import React, { useEffect, useState } from "react";
import { View, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { Button, Modal, Portal, Text } from "react-native-paper";
import styles from "./styles";

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

const users = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Smith", email: "jane@example.com" },
];

const TaskFormModal: React.FC<Props> = ({
  title,
  visible,
  // users,
  onDismissCb,
  onSubmit,
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [assignedUserId, setAssignedUserId] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  // Error states
  const [taskNameError, setTaskNameError] = useState<string>("");
  const [dueDateError, setDueDateError] = useState<string>("");
  const [userError, setUserError] = useState<string>("");

  // Focus states
  const [taskNameFocused, setTaskNameFocused] = useState<boolean>(false);
  const [taskDescFocused, setTaskDescFocused] = useState<boolean>(false);
  const [dueDateFocused, setDueDateFocused] = useState<boolean>(false);

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
    if (!value.trim()) {
      return "Task name is required";
    }
    if (value.trim().length < 3) {
      return "Task name must be at least 3 characters long";
    }
    if (value.trim().length > 100) {
      return "Task name must be less than 100 characters";
    }
    return "";
  };

  const validateDueDate = (value: string): string => {
    if (!value.trim()) {
      return "Due date is required";
    }

    // Basic date format validation (DD/MM/YYYY or DD-MM-YYYY or DD.MM.YYYY)
    const dateRegex = /^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})$/;
    if (!dateRegex.test(value)) {
      return "Please enter date in DD/MM/YYYY format";
    }

    const match = value.match(dateRegex);
    if (match) {
      const day = parseInt(match[1]);
      const month = parseInt(match[2]);
      const year = parseInt(match[3]);

      if (day < 1 || day > 31 || month < 1 || month > 12 || year < 2024) {
        return "Please enter a valid date";
      }
    }

    return "";
  };

  const validateUser = (): string => {
    if (!assignedUserId) {
      return "Please select a user to assign the task";
    }
    return "";
  };

  const handleTaskNameChange = (value: string) => {
    setTaskName(value);
    if (taskNameError) {
      setTaskNameError("");
    }
  };

  const handleTaskDescriptionChange = (value: string) => {
    setTaskDescription(value);
  };

  const handleDueDateChange = (value: string) => {
    setDueDate(value);
    if (dueDateError) {
      setDueDateError("");
    }
  };

  const handleUserSelect = (userId: string) => {
    setAssignedUserId(userId);
    setDropdownOpen(false);
    if (userError) {
      setUserError("");
    }
  };

  const handleSubmit = () => {
    const taskNameErr = validateTaskName(taskName);
    const dueDateErr = validateDueDate(dueDate);
    const userErr = validateUser();

    setTaskNameError(taskNameErr);
    setDueDateError(dueDateErr);
    setUserError(userErr);

    if (taskNameErr || dueDateErr || userErr) {
      return;
    }

    const formData: TaskFormData = {
      taskName: taskName.trim(),
      taskDescription: taskDescription.trim(),
      dueDate: dueDate.trim(),
      assignedUserId,
    };

    onSubmit(formData);
    resetForm();
  };

  const handleCancel = () => {
    resetForm();
    onDismissCb();
  };

  const isValid = () => {
    return (
      taskName.trim().length >= 3 &&
      taskName.trim().length <= 100 &&
      dueDate.trim() &&
      assignedUserId &&
      !validateDueDate(dueDate)
    );
  };

  const getInputStyle = (focused: boolean, error: string) => {
    if (error) return styles.textInputError;
    if (focused) return styles.textInputFocused;
    return styles.textInput;
  };

  const getSelectedUser = () => {
    return users.find((user) => user.id === assignedUserId);
  };

  return (
    <Portal>
      <Modal visible={modalVisible} onDismiss={handleCancel} dismissable={true}>
        <View style={styles.modalOverlay}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>
            </View>

            {/* Task Name Input */}
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
              {taskNameError ? (
                <Text style={styles.errorText}>{taskNameError}</Text>
              ) : null}
            </View>

            {/* Task Description Input */}
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
                multiline={true}
                numberOfLines={4}
                autoCapitalize="sentences"
                maxLength={500}
                textAlignVertical="top"
              />
            </View>

            {/* Due Date Input */}
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
              {dueDateError ? (
                <Text style={styles.errorText}>{dueDateError}</Text>
              ) : null}
            </View>

            {/* User Assignment Dropdown */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Assign To *</Text>
              <TouchableOpacity
                style={[
                  styles.dropdownButton,
                  userError && styles.dropdownButtonError,
                  dropdownOpen && styles.dropdownButtonFocused,
                ]}
                onPress={() => setDropdownOpen(!dropdownOpen)}
              >
                <Text
                  style={[
                    styles.dropdownText,
                    !getSelectedUser() && styles.dropdownPlaceholder,
                  ]}
                >
                  {getSelectedUser()
                    ? getSelectedUser()!.name
                    : "Select a user"}
                </Text>
              </TouchableOpacity>

              {dropdownOpen && (
                <View style={styles.dropdownList}>
                  <ScrollView
                    style={styles.dropdownScrollView}
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                  >
                    {users.map((user) => (
                      <TouchableOpacity
                        key={user.id}
                        style={[
                          styles.dropdownItem,
                          assignedUserId === user.id &&
                            styles.dropdownItemSelected,
                        ]}
                        onPress={() => handleUserSelect(user.id)}
                      >
                        <View>
                          <Text
                            style={[
                              styles.dropdownItemName,
                              assignedUserId === user.id &&
                                styles.dropdownItemNameSelected,
                            ]}
                          >
                            {user.name}
                          </Text>
                          <Text
                            style={[
                              styles.dropdownItemEmail,
                              assignedUserId === user.id &&
                                styles.dropdownItemEmailSelected,
                            ]}
                          >
                            {user.email}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}

              {userError ? (
                <Text style={styles.errorText}>{userError}</Text>
              ) : null}
            </View>

            {/* Character Counter for Description */}
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
