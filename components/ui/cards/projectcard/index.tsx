import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./styles";

export type ProjectStatus =
  | "todo"
  | "pending"
  | "completed"
  | "on-hold"
  | "cancelled";

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  dueDate?: string;
  tasksCount?: number;
  completedTasks?: number;
  teamMembers?: number;
}

interface ProjectCardProps {
  project: Project;
  onPress?: (project: Project) => void;
  onMenuPress?: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onPress,
  onMenuPress,
}) => {
  const getStatusStyles = (status: ProjectStatus) => {
    switch (status) {
      case "todo":
        return {
          chipStyle: styles.statusActive,
          textStyle: styles.statusActiveText,
          label: "Todo",
        };
      case "pending":
        return {
          chipStyle: styles.statusPending,
          textStyle: styles.statusPendingText,
          label: "Pending",
        };
      case "completed":
        return {
          chipStyle: styles.statusCompleted,
          textStyle: styles.statusCompletedText,
          label: "Completed",
        };
      case "on-hold":
        return {
          chipStyle: styles.statusOnHold,
          textStyle: styles.statusOnHoldText,
          label: "On Hold",
        };
      case "cancelled":
        return {
          chipStyle: styles.statusCancelled,
          textStyle: styles.statusCancelledText,
          label: "Cancelled",
        };
      default:
        return {
          chipStyle: styles.statusPending,
          textStyle: styles.statusPendingText,
          label: "Unknown",
        };
    }
  };

  const getStatusIcon = (status: ProjectStatus) => {
    switch (status) {
      case "active":
        return "play-circle";
      case "pending":
        return "clock";
      case "completed":
        return "check-circle";
      case "on-hold":
        return "pause-circle";
      case "cancelled":
        return "close-circle";
      default:
        return "help-circle";
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getProgressPercentage = () => {
    if (!project.tasksCount || project.tasksCount === 0) return 0;
    return Math.round(
      ((project.completedTasks || 0) / project.tasksCount) * 100,
    );
  };

  const statusConfig = getStatusStyles(project.status);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress?.(project)}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        {/* Header with project name and status */}
        <View style={styles.header}>
          <Text style={styles.projectName} numberOfLines={2}>
            {project.name}
          </Text>

          <View style={[styles.statusChip, statusConfig.chipStyle]}>
            <Text style={[styles.statusText, statusConfig.textStyle]}>
              {statusConfig.label}
            </Text>
          </View>
        </View>

        {/* Footer with project info and actions */}
        <View style={styles.footer}>
          <View style={styles.projectInfo}>
            {/* Tasks progress */}
            {project.tasksCount !== undefined && (
              <View style={styles.infoItem}>
                <MaterialCommunityIcons
                  name="clipboard-check"
                  size={16}
                  color="#79747E"
                />
                <Text style={styles.infoText}>
                  {project.completedTasks || 0}/{project.tasksCount} (
                  {getProgressPercentage()}%)
                </Text>
              </View>
            )}

            {/* Team members */}
            {project.teamMembers !== undefined && (
              <View style={styles.infoItem}>
                <MaterialCommunityIcons
                  name="account-group"
                  size={16}
                  color="#79747E"
                />
                <Text style={styles.infoText}>{project.teamMembers}</Text>
              </View>
            )}

            {/* Due date */}
            {project.dueDate && (
              <View style={styles.infoItem}>
                <MaterialCommunityIcons
                  name="calendar"
                  size={16}
                  color="#79747E"
                />
                <Text style={styles.infoText}>
                  {formatDate(project.dueDate)}
                </Text>
              </View>
            )}
          </View>

          {/* Menu action */}
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onMenuPress?.(project)}
          >
            <MaterialCommunityIcons
              name="dots-vertical"
              size={20}
              style={styles.actionIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProjectCard;
