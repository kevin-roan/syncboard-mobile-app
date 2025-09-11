import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    margin: 16,
    backgroundColor: "#FFFFFF",
    elevation: 2,
  },
  cardContent: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  commentsList: {
    maxHeight: 300,
    marginBottom: 8,
  },
  commentItem: {
    flexDirection: "row",
    marginVertical: 8,
  },
  commentAvatar: {
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: "600",
    marginRight: 8,
  },
  commentTimestamp: {
    fontSize: 12,
  },
  commentText: {
    fontSize: 14,
    lineHeight: 20,
  },
  commentSeparator: {
    height: 8,
  },
  divider: {
    height: 1,
    marginVertical: 16,
  },
  addCommentSection: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  inputAvatar: {
    marginRight: 12,
    marginTop: 4,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  textInput: {
    flex: 1,
    marginRight: 8,
    backgroundColor: "#FFFFFF",
  },
  textInputContent: {
    fontSize: 14,
  },
  sendButton: {
    margin: 0,
    marginBottom: 4,
  },
});

export default styles;
