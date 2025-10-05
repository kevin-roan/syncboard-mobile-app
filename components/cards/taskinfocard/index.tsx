import React from "react";
import { View } from "react-native";
import { Card, Text, Avatar } from "react-native-paper";
import styles from "./styles";

interface TaskCardProps {
  taskName: string;
  taskDescription: string;
  assignedTo: string;
  assignedBy: string;
  assigneeAvatar?: string;
  creatorAvatar?: string;
}

const TaskInfoCard: React.FC<TaskCardProps> = ({
  taskName,
  taskDescription,
  assignedTo,
  assignedBy,
  assigneeAvatar,
  creatorAvatar,
}) => {
  const colors = {
    primary: "#6750A4",
    secondary: "#F7F2FA",
    text: "#1A1A1A",
    subText: "#666666",
  };

  const getInitials = (name: string | undefined | null): string => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content style={styles.cardContent}>
        <Text style={[styles.title, { color: colors.text }]}>{taskName}</Text>
        <Text style={[styles.description, { color: colors.subText }]}>
          {taskDescription}
        </Text>
        <View style={[styles.divider, { backgroundColor: colors.secondary }]} />
        <View style={styles.assignmentSection}>
          <View style={styles.assignmentItem}>
            <Text style={[styles.label, { color: colors.subText }]}>
              ASSIGNED TO
            </Text>
            <View style={styles.assignmentRow}>
              {assigneeAvatar ? (
                <Avatar.Image
                  size={32}
                  source={{ uri: assigneeAvatar }}
                  style={styles.avatar}
                />
              ) : (
                <Avatar.Text
                  size={32}
                  label={getInitials(assignedTo)}
                  style={[styles.avatar, { backgroundColor: colors.primary }]}
                  labelStyle={{
                    color: "#FFFFFF",
                    fontSize: 12,
                    fontWeight: "600",
                  }}
                />
              )}
              <View style={styles.assignmentText}>
                <Text style={[styles.name, { color: colors.text }]}>
                  {assignedTo}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.assignmentItem}>
            <Text style={[styles.label, { color: colors.subText }]}>
              ASSIGNED BY
            </Text>
            <View style={styles.assignmentRow}>
              {creatorAvatar ? (
                <Avatar.Image
                  size={32}
                  source={{ uri: creatorAvatar }}
                  style={styles.avatar}
                />
              ) : (
                <Avatar.Text
                  size={32}
                  label={getInitials(assignedBy)}
                  style={[
                    styles.avatar,
                    {
                      backgroundColor: colors.secondary,
                      borderWidth: 1,
                      borderColor: colors.primary,
                    },
                  ]}
                  labelStyle={{
                    color: colors.primary,
                    fontSize: 12,
                    fontWeight: "600",
                  }}
                />
              )}
              <View style={styles.assignmentText}>
                <Text style={[styles.name, { color: colors.text }]}>
                  {assignedBy}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default TaskInfoCard;
