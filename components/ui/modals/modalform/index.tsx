import React, { useEffect, useState } from "react";
import { View, TextInput } from "react-native";
import { Button, Modal, Portal, Text } from "react-native-paper";
import styles from "./styles";

interface Props {
  title: string;
  textinputPlaceholder: string;
  visible: boolean;
  onDismissCb: () => void;
  onSubmit: (inputValue: string) => void;
}

const ModalForm: React.FC<Props> = ({
  title,
  textinputPlaceholder,
  visible,
  onDismissCb,
  onSubmit,
}) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [inputError, setInputError] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    setModalVisible(visible);
    if (visible) {
      // Reset form when modal opens
      setInputValue("");
      setInputError("");
      setIsFocused(false);
    }
  }, [visible]);

  const validateInput = (value: string): string => {
    if (!value.trim()) {
      return "This field is required";
    }
    if (value.trim().length < 3) {
      return "Must be at least 3 characters long";
    }
    if (value.trim().length > 50) {
      return "Must be less than 50 characters";
    }
    return "";
  };

  const handleInput = (value: string) => {
    setInputValue(value);
    // Clear error when user starts typing
    if (inputError) {
      setInputError("");
    }
  };

  const handleSubmit = () => {
    const error = validateInput(inputValue);
    if (error) {
      setInputError(error);
      return;
    }
    onSubmit(inputValue.trim());
  };

  const handleCancel = () => {
    setInputValue("");
    setInputError("");
    setIsFocused(false);
    onDismissCb();
  };

  const isValid =
    inputValue.trim().length >= 3 && inputValue.trim().length <= 50;

  const getInputStyle = () => {
    if (inputError) return styles.textInputError;
    if (isFocused) return styles.textInputFocused;
    return styles.textInput;
  };

  return (
    <Portal>
      <Modal visible={modalVisible} onDismiss={handleCancel} dismissable={true}>
        <View style={styles.modalOverlay}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
          </View>

          {/* Input Field */}
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={textinputPlaceholder || "Enter input"}
              value={inputValue}
              onChangeText={handleInput}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              style={getInputStyle()}
              mode="outlined"
              error={!!inputError}
              autoCapitalize="sentences"
              maxLength={50}
            />
            {inputError ? (
              <Text style={styles.errorText}>{inputError}</Text>
            ) : null}
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
              disabled={!isValid}
              style={[
                styles.submitButton,
                !isValid && styles.submitButtonDisabled,
              ]}
              contentStyle={styles.submitButtonContent}
              labelStyle={[
                styles.submitButtonText,
                !isValid && styles.submitButtonTextDisabled,
              ]}
            >
              Create Project
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default ModalForm;
