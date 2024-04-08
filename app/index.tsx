import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import Button from "../components/button";
import { Link, Redirect } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/auth/useAuth";

const index = () => {
  const { session, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={"/sign-in"} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={{ pathname: "/(user)" }} asChild>
        <Button text="User" />
      </Link>

      <Button onPress={() => supabase.auth.signOut()} text="Sign out" />
    </View>
  );
};

export default index;
