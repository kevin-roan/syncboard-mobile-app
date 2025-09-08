import React, { useState, useEffect } from "react";
import { View, ScrollView, Alert } from "react-native";

import {
  Modal,
  Portal,
  Surface,
  Text,
  TextInput,
  Button,
  RadioButton,
  Divider,
  IconButton,
  Card,
} from "react-native-paper";
import styles from "./styles";

const theme = {
  colors: {
    primary: "#6750A4",
    secondary: "#F7F2FA",
    text: "#1A1A1A",
    subText: "#666666",
    error: "#B3261E",
    surface: "#FFFFFF",
    backdrop: "rgba(0, 0, 0, 0.5)",
  },
};

interface Props {
  visible: boolean;
  onDismissCb: () => void;
  onSubmit: (email: string, role: string) => void;
}

const InviteUserModal: React.FC<Props> = ({
  visible,
  onDismissCb,
  onSubmit,
}) => {
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("member");
  const [emailError, setEmailError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (visible) {
      resetForm();
    }
  }, [visible]);

  const resetForm = () => {
    setEmail("");
    setRole("member");
    setEmailError("");
    setLoading(false);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    // Clear error when user starts typing
    if (emailError) {
      setEmailError("");
    }
  };

  const handleSendInvite = async () => {
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    onSubmit(email.trim(), role);
    setLoading(false);
  };

  const hideModal = () => {
    resetForm();
    onDismissCb();
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.modalContainer}
        style={styles.modal}
      >
        <Surface style={styles.surface} elevation={5}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
              <View>
                <Text
                  variant="headlineSmall"
                  style={[styles.title, { color: theme.colors.text }]}
                >
                  Invite User
                </Text>
                <Text
                  variant="bodyMedium"
                  style={[styles.subtitle, { color: theme.colors.subText }]}
                >
                  Send an invitation to join your workspace
                </Text>
              </View>
              <IconButton
                icon="close"
                size={24}
                iconColor={theme.colors.subText}
                onPress={hideModal}
                style={styles.closeButton}
              />
            </View>

            <Divider style={styles.headerDivider} />

            {/* Form Content */}
            <View style={styles.content}>
              {/* Email Input */}
              <TextInput
                label="Email Address"
                value={email}
                onChangeText={handleEmailChange}
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                error={!!emailError}
                style={styles.textInput}
                contentStyle={styles.textInputContent}
                theme={{
                  colors: {
                    primary: theme.colors.primary,
                    error: theme.colors.error,
                    outline: emailError ? theme.colors.error : "#E0E0E0",
                    onSurface: theme.colors.text,
                  },
                }}
                left={<TextInput.Icon icon="email-outline" />}
                placeholder="Enter email address"
              />
              {emailError ? (
                <Text
                  variant="bodySmall"
                  style={[styles.errorText, { color: theme.colors.error }]}
                >
                  {emailError}
                </Text>
              ) : null}

              {/* Role Selection */}
              <View style={styles.roleSection}>
                <Text
                  variant="titleMedium"
                  style={[styles.sectionTitle, { color: theme.colors.text }]}
                >
                  User Role
                </Text>

                <RadioButton.Group onValueChange={setRole} value={role}>
                  {/* Member Option */}
                  <Card
                    style={[
                      styles.roleCard,
                      role === "member" && styles.selectedRoleCard,
                    ]}
                    onPress={() => setRole("member")}
                  >
                    <Card.Content style={styles.roleCardContent}>
                      <View style={styles.roleOption}>
                        <RadioButton
                          value="member"
                          color={theme.colors.primary}
                          uncheckedColor={theme.colors.subText}
                        />
                        <View style={styles.roleInfo}>
                          <View style={styles.roleTitleRow}>
                            <IconButton
                              icon="account"
                              size={20}
                              iconColor={theme.colors.primary}
                              style={styles.roleIcon}
                            />
                            <Text
                              variant="titleSmall"
                              style={[
                                styles.roleTitle,
                                { color: theme.colors.text },
                              ]}
                            >
                              Member
                            </Text>
                          </View>
                          <Text
                            variant="bodySmall"
                            style={[
                              styles.roleDescription,
                              { color: theme.colors.subText },
                            ]}
                          >
                            Can view and edit content, collaborate with team
                            members
                          </Text>
                        </View>
                      </View>
                    </Card.Content>
                  </Card>

                  {/* Admin Option */}
                  <Card
                    style={[
                      styles.roleCard,
                      role === "admin" && styles.selectedRoleCard,
                    ]}
                    onPress={() => setRole("admin")}
                  >
                    <Card.Content style={styles.roleCardContent}>
                      <View style={styles.roleOption}>
                        <RadioButton
                          value="admin"
                          color={theme.colors.primary}
                          uncheckedColor={theme.colors.subText}
                        />
                        <View style={styles.roleInfo}>
                          <View style={styles.roleTitleRow}>
                            <IconButton
                              icon="shield-account"
                              size={20}
                              iconColor={theme.colors.primary}
                              style={styles.roleIcon}
                            />
                            <Text
                              variant="titleSmall"
                              style={[
                                styles.roleTitle,
                                { color: theme.colors.text },
                              ]}
                            >
                              Admin
                            </Text>
                          </View>
                          <Text
                            variant="bodySmall"
                            style={[
                              styles.roleDescription,
                              { color: theme.colors.subText },
                            ]}
                          >
                            Full access including user management and workspace
                            settings
                          </Text>
                        </View>
                      </View>
                    </Card.Content>
                  </Card>
                </RadioButton.Group>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actions}>
              <Button
                mode="outlined"
                onPress={hideModal}
                style={styles.cancelButton}
                labelStyle={[
                  styles.cancelButtonLabel,
                  { color: theme.colors.subText },
                ]}
                contentStyle={styles.buttonContent}
              >
                Cancel
              </Button>
              <Button
                mode="contained"
                onPress={handleSendInvite}
                loading={loading}
                disabled={loading || !email.trim()}
                buttonColor={theme.colors.primary}
                style={styles.sendButton}
                contentStyle={styles.buttonContent}
                labelStyle={styles.sendButtonLabel}
                icon={loading ? undefined : "send"}
              >
                {loading ? "Sending..." : "Send Invite"}
              </Button>
            </View>
          </ScrollView>
        </Surface>
      </Modal>
    </Portal>
  );
};

export default InviteUserModal;
