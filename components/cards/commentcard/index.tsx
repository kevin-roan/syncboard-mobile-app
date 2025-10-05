import React, { useState } from "react";
import { View, FlatList } from "react-native";
import { Card, Text, Avatar, TextInput, IconButton } from "react-native-paper";
import styles from "./style";

export interface Comment {
  id: string;
  content: string;
  author: string;
  timestamp: string;
}

interface CommentsCardProps {
  comments: Comment[];
  onSubmit: (comment: string) => void;
}

const colors = {
  primary: "#6750A4",
  secondary: "#F7F2FA",
  text: "#1A1A1A",
  subText: "#666666",
};

const getInitials = (name?: string | null): string => {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

const CommentsCard: React.FC<CommentsCardProps> = ({ comments, onSubmit }) => {
  const [commentText, setCommentText] = useState<string>("");

  const handleSendComment = () => {
    onSubmit(commentText);
  };

  const renderComment = ({ item }: { item: Comment }) => (
    <View style={styles.commentItem}>
      <Avatar.Text
        size={32}
        label={getInitials(item.author)}
        style={[styles.commentAvatar, { backgroundColor: colors.primary }]}
        labelStyle={{
          color: "#FFFFFF",
          fontSize: 12,
          fontWeight: "600",
        }}
      />
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <Text style={[styles.commentAuthor, { color: colors.text }]}>
            {item.author}
          </Text>
          <Text style={[styles.commentTimestamp, { color: colors.subText }]}>
            {item.timestamp}
          </Text>
        </View>
        <Text style={[styles.commentText, { color: colors.text }]}>
          {item.content}
        </Text>
      </View>
    </View>
  );
  return (
    <Card style={styles.card} mode="elevated">
      <Card.Content style={styles.cardContent}>
        <Text style={[styles.title, { color: colors.text }]}>
          Comments ({comments?.length ?? 0})
        </Text>
        <FlatList
          data={comments}
          renderItem={renderComment}
          keyExtractor={(item) => item.id}
          style={styles.commentsList}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View style={styles.commentSeparator} />
          )}
        />
        <View style={[styles.divider, { backgroundColor: colors.secondary }]} />
        <View style={styles.addCommentSection}>
          <Avatar.Text
            size={32}
            label="You"
            style={[
              styles.inputAvatar,
              {
                backgroundColor: colors.secondary,
                borderWidth: 1,
                borderColor: colors.primary,
              },
            ]}
            labelStyle={{
              color: colors.primary,
              fontSize: 10,
              fontWeight: "600",
            }}
          />
          <View style={styles.inputContainer}>
            <TextInput
              value={commentText}
              onChangeText={setCommentText}
              placeholder="Add a comment..."
              mode="outlined"
              multiline
              numberOfLines={2}
              style={styles.textInput}
              contentStyle={[styles.textInputContent, { color: colors.text }]}
              placeholderTextColor={colors.subText}
              outlineColor={colors.secondary}
              activeOutlineColor={colors.primary}
              theme={{
                colors: {
                  primary: colors.primary,
                  outline: colors.secondary,
                },
              }}
            />
            <IconButton
              icon="send"
              iconColor={commentText.trim() ? colors.primary : colors.subText}
              size={20}
              onPress={handleSendComment}
              disabled={!commentText.trim()}
              style={styles.sendButton}
            />
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default CommentsCard;
