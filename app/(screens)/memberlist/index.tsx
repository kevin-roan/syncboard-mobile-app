import { useEffect, useState } from "react";
import { View, Alert, RefreshControl, FlatList } from "react-native";
import ScreenLayout from "@/provider/screenlayout";
import styles from "./styles";
import { getWorkspaceUsers } from "@/app/services/workspace_members";
import { useApp } from "@/context/appctx";
import UserCard from "@/components/ui/cards/workspace_membercard";
import { Appbar, Text, ActivityIndicator } from "react-native-paper";
import moment from "moment";
import { useRouter } from "expo-router";

export default function MemberList() {
  const router = useRouter();
  const { workspace } = useApp();
  const [memberList, setMemberList] = useState<unknown>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    if (!workspace?.id) return;

    const fetchWorkspaceMemberList = async (workspaceId: string) => {
      try {
        const resp = await getWorkspaceUsers(workspaceId);
        setMemberList(resp);
      } catch (error) {
        console.log("error", error);
        Alert.alert("Error fetching workspace members");
      }
    };

    fetchWorkspaceMemberList(workspace.id);
  }, [workspace?.id]);

  const renderItem = ({ item, index }) => {
    console.log("member item ", JSON.stringify(item, null, 2));
    return (
      <UserCard
        role={item?.role}
        email={item?.email}
        key={item?.id}
        userName={item.username}
        joinedAt={moment(item.joined_at).format("DD MMM YYYY")}
        avatarUrl={item.avatar_url}
      />
    );
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await getWorkspaceUsers(workspace?.id);
      setMemberList(data);
    } catch (error) {
      console.log("error refreshing projects", error);
    } finally {
      setRefreshing(false);
    }
  };

  // const handleInviteUser = () => {};

  return (
    <ScreenLayout>
      <Appbar.Header elevated>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="Workspace Members" />
        <Appbar.Action icon="refresh" onPress={handleRefresh} />

        {/*
           *
        <Appbar.Action icon="plus" onPress={handleInviteUser} />
           * */}
      </Appbar.Header>

      <View style={styles.container}>
        <FlatList
          data={memberList}
          renderItem={renderItem}
          // keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text>No Members Yet</Text>}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      </View>
    </ScreenLayout>
  );
}
