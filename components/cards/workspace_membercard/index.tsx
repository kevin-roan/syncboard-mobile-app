import React from "react";
import { View } from "react-native";
import { Card, Text, Avatar, Chip } from "react-native-paper";
import styles from "./styles";

export interface UserCardProps {
  userName: string;
  email: string;
  joinedAt: string;
  role: string;
  avatarUrl?: string;
}

const UserCard: React.FC<UserCardProps> = ({
  userName,
  email,
  joinedAt,
  role,
  avatarUrl,
}) => {
  // Get initials from userName
  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Get role chip color based on role
  const getRoleChipStyle = (userRole: string) => {
    const lowerRole = userRole.toLowerCase();
    if (lowerRole.includes("admin")) {
      return styles.adminChip;
    } else if (lowerRole.includes("manager") || lowerRole.includes("lead")) {
      return styles.managerChip;
    } else {
      return styles.defaultChip;
    }
  };

  return (
    <Card style={styles.card} elevation={2}>
      <Card.Content style={styles.cardContent}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            {avatarUrl ? (
              <Avatar.Image
                size={56}
                source={{ uri: avatarUrl }}
                style={styles.avatar}
              />
            ) : (
              <Avatar.Text
                size={56}
                label={getInitials(userName)}
                style={styles.avatarText}
                labelStyle={styles.avatarLabel}
              />
            )}
          </View>

          <View style={styles.userInfo}>
            <Text style={styles.userName} numberOfLines={1}>
              {userName}
            </Text>
            <Text style={styles.userEmail} numberOfLines={1}>
              {email}
            </Text>
          </View>

          <Chip
            style={[styles.roleChip, getRoleChipStyle(role)]}
            textStyle={styles.roleChipText}
            compact
          >
            {role}
          </Chip>
        </View>

        <View style={styles.footer}>
          <View style={styles.joinedContainer}>
            <Text style={styles.joinedLabel}>Joined</Text>
            <Text style={styles.joinedDate}>{joinedAt}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default UserCard;
