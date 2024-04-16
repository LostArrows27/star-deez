import { View } from "react-native";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, H2, Image, Input, Separator, Spinner, Text } from "tamagui";
import { Form } from "tamagui"; // or '@tamagui/form'
import { supabase } from "@/lib/supabase";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { SignUpSchema } from "@/schema/auth";
import { Link, router } from "expo-router";
import { useAlertError } from "@/hooks/useAlertError";
import { Eye, EyeOff } from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";

type tSignUpSchema = z.infer<typeof SignUpSchema>;
const SignUpScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<tSignUpSchema>({
    resolver: zodResolver(SignUpSchema),
  });
  const toast = useToastController();
  const [showPassword, setShowPassword] = useState(false);
  const { onOpen } = useAlertError();
  async function onSubmit(values: tSignUpSchema) {
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
    });
    if (error) {
      onOpen(error.message);
      return;
    } else {
      toast.show("Sign up succesfully!", {
        message: "Welcome to Star Deez!",
        native: false,
      });
   
      reset();
      router.push("/(auth)/basic-information");
    }
  }

  return (
    <View className="items-center justify-center h-screen bg-white">
      <H2 color={"$color8"}>Star Deez</H2>
      <Text>Sign up to start studying today</Text>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        width={"100%"}
        alignItems="center"
        gap="$2"
        padding="$6"
      >
        <View className="gap-y-2 w-full">
          <Text>Email</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                size="$4"
                borderWidth={2}
              />
            )}
            name="email"
          />
          {errors.email && <Text color="red">{errors.email.message}</Text>}
        </View>
        <View className="gap-y-2 w-full my-2">
          <Text>Password</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View className=" relative justify-center">
                <Input
                  secureTextEntry={!showPassword}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  size="$4"
                  borderWidth={2}
                />
                {showPassword ? (
                  <EyeOff
                    position="absolute"
                    right={10}
                    onPress={() => {
                      setShowPassword(false);
                    }}
                  />
                ) : (
                  <Eye
                    position="absolute"
                    onPress={() => {
                      setShowPassword(true);
                    }}
                    right={10}
                  />
                )}
              </View>
            )}
            name="password"
          />
          {errors.password && (
            <Text color="red">{errors.password.message}</Text>
          )}
        </View>
        <View className="gap-y-2 w-full mb-4">
          <Text>Password confirm</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                secureTextEntry={!showPassword}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                size="$4"
                borderWidth={2}
              />
            )}
            name="confirmPassword"
          />
          {errors.password && (
            <Text color="red">{errors.password.message}</Text>
          )}
        </View>
        <Link href={"/sign-in"}>
          <View className="flex-row items-center gap-[6px]">
            <View>
              <Text>Already have an account?</Text>
            </View>
            <View>
              <Text color={"$green9"}>Log In</Text>
            </View>
          </View>
        </Link>

        <Form.Trigger marginTop="$3.5" asChild disabled={isSubmitting}>
          <Button
            themeInverse
            backgroundColor={"$green9"}
            pressStyle={{
              backgroundColor: "$green8",
            }}
            width={"100%"}
            color={"white"}
            icon={isSubmitting ? () => <Spinner /> : undefined}
          >
            Sign Up
          </Button>
        </Form.Trigger>
        <View className="flex-row">
          <Separator
            marginVertical={10}
            width={"100%"}
            borderColor={"$color6"}
          />
          <Text marginHorizontal="$3">or</Text>
          <Separator
            marginVertical={10}
            width={"100%"}
            borderColor={"$color6"}
          />
        </View>

        <Button
          variant="outlined"
          width={"100%"}
          marginBottom="$8"
          icon={
            <Image
              source={{
                uri: require("@/assets/images/icons/google.png"),
                width: 24,
                height: 24,
              }}
            />
          }
        >
          Continue with Google
        </Button>
      </Form>
    </View>
  );
};

export default SignUpScreen;
