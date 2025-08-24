import React from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { supabase } from "@/lib/supabase";
import { Appbar, Button, Avatar, Divider } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "@/context/authctx";
import styles from "./styles";

const Profile = () => {
  const { session } = useAuth();

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      console.log("Logged out successfully");
    }
  }

  // Format member since date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  const menuItems = [
    {
      icon: "account-edit",
      title: "Edit Profile",
      onPress: () => {
        /* Navigate to edit profile */
      },
    },
    {
      icon: "cog",
      title: "Settings",
      onPress: () => {
        /* Navigate to settings */
      },
    },
    {
      icon: "shield-account",
      title: "Privacy & Security",
      onPress: () => {
        /* Navigate to privacy settings */
      },
    },
    {
      icon: "help-circle",
      title: "Help & Support",
      onPress: () => {
        /* Navigate to help */
      },
    },
    {
      icon: "information",
      title: "About",
      onPress: () => {
        /* Navigate to about */
      },
    },
  ];

  return (
    <>
      <Appbar.Header mode="small" elevated>
        <Appbar.Content title="Profile" />
        <Appbar.Action icon="dots-vertical" onPress={() => {}} />
      </Appbar.Header>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Profile Header Section */}
        <View style={styles.profileSection}>
          <Avatar.Text
            size={96}
            label={session?.user?.email?.charAt(0).toUpperCase() || "U"}
            style={styles.avatar}
          />

          <Text style={styles.displayName}>
            {session?.user?.user_metadata?.full_name || "User"}
          </Text>

          <Text style={styles.email}>{session?.user?.email}</Text>

          <Text style={styles.memberSince}>
            Member since{" "}
            {formatDate(session?.user?.created_at || new Date().toISOString())}
          </Text>
        </View>

        {/* Menu Items Section */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.title}
              style={[
                styles.menuItem,
                index === menuItems.length - 1 && styles.menuItemLast,
              ]}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name={item.icon as any}
                size={24}
                style={styles.menuIcon}
              />
              <Text style={styles.menuText}>{item.title}</Text>
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                style={styles.menuChevron}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Action Section */}
        <View style={styles.actionSection}>
          <Button
            mode="contained"
            icon="logout"
            onPress={signOut}
            style={styles.logoutButton}
            contentStyle={styles.logoutButtonContent}
            labelStyle={styles.logoutButtonText}
          >
            Sign Out
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

export default Profile;
