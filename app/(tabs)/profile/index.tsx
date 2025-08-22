import React from "react";
import { View, Text } from "react-native";
import { supabase } from "@/lib/supabase";

import { Button } from "react-native-paper";

const Profile = () => {
  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      console.log("Logged out successfully");
    }
  }
  return (
    <View>
      <Text>Profile</Text>
      <Button icon="logout" mode="contained" onPress={() => signOut()}>
        Log Out
      </Button>
    </View>
  );
};

export default Profile;
