import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { supabase } from "@/lib/supabase";
import { Link } from "expo-router";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    // console.log("data", data);

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  // async function signUpWithEmail() {
  //   setLoading(true);
  //   const {
  //     data: { session },
  //     error,
  //   } = await supabase.auth.signUp({
  //     email: email,
  //     password: password,
  //   });
  //
  //   if (error) Alert.alert(error.message);
  //   if (!session)
  //     Alert.alert("Please check your inbox for email verification!");
  //   setLoading(false);
  // }
  //
  // async function signOut() {
  //   const { error } = await supabase.auth.signOut();
  //   if (error) {
  //     console.error("Error logging out:", error.message);
  //   } else {
  //     console.log("Logged out successfully");
  //   }
  // }
  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          label="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          icon="login"
          mode="contained"
          disabled={loading}
          onPress={() => signInWithEmail()}
        >
          Sign In
        </Button>
      </View>
      <View style={styles.verticallySpaced}>
        <Text>
          Create and account
          <Link href={"/signup"} />
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
