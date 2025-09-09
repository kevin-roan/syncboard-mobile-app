import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button, Modal, Portal, Text } from "react-native-paper";

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
  // Separate date inputs for DD, MM, YY
  const [dueDay, setDueDay] = useState<string>("");
  const [dueMonth, setDueMonth] = useState<string>("");
  const [dueYear, setDueYear] = useState<string>("");
  const [assignedUserId, setAssignedUserId] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  // Remove all error and focus states and validations

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
    // Compose dueDate as DD/MM/YYYY from the 3 inputs
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
    // console.log("Form data submitted:", formData);
    onSubmit(formData);
    resetForm();
  };

  const handleCancel = () => {
    resetForm();
    onDismissCb();
  };

  // Remove validations and isValid check, enable submit always

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
                multiline={true}
                numberOfLines={4}
                autoCapitalize="sentences"
                maxLength={500}
                textAlignVertical="top"
              />
            </View>

            {/* Due Date Input separated DD MM YY */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Due Date</Text>
              <View style={styles.dueDateContainer}>
                <TextInput
                  placeholder="DD"
                  value={dueDay}
                  onChangeText={(val) => {
                    // Allow only digits, max 2 chars
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
                        onPress={() => {
                          setAssignedUserId(user.id);
                          setDropdownOpen(false);
                        }}
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
  // Dropdown Styles
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
  // Character Counter
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
  // Button Styles
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
