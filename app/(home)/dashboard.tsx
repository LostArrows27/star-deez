import { supabase } from "@/lib/supabase";
import { Text, View } from "react-native";
import { Button } from "tamagui";

const Page = () => {
  const logout = async () => {
    await supabase.auth.signOut();
  };
  return (
    <View className="h-screen items-center justify-center">
      <Text>test</Text>
      <Button onPress={logout}>log out</Button>
    </View>
  );
};

export default Page;
