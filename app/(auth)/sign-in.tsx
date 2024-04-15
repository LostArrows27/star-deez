import { View } from "react-native";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, H2, Image, Input, Separator, Spinner, Text } from "tamagui";
import { Form } from "tamagui"; // or '@tamagui/form'
import { supabase } from "@/lib/supabase";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { SignInSchema } from "@/schema/auth";
import { Link } from "expo-router";
import { useAlertError } from "@/hooks/alertError";
import { Eye, EyeOff } from "@tamagui/lucide-icons";
import { ToastViewport, useToastController } from "@tamagui/toast";
import CustomToast from "@/components/toast-custom";
type tSignInSchema = z.infer<typeof SignInSchema>;

const SignInScreen = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    control,
    reset,
  } = useForm<tSignInSchema>({
    resolver: zodResolver(SignInSchema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToastController();
  const { onOpen } = useAlertError();
  const [serverError, setServerError] = useState<string | null>(null);
  async function onSubmit(values: tSignInSchema) {
    // const res = await axios.post('/api/auth/sign-in', values);

    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error) {
      onOpen(error.message);
      return;
    } else {
      toast.show("Login success!", {
        message: "Welcome back!",
        native: false,
      });
      reset();
    }
  }
  return (
    <View className="h-screen justify-center items-center bg-white">
      <H2 color={"$color8"}>Star Deez</H2>
      <Text>Sign in to start studying today</Text>

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
        <View className="gap-y-2 w-full mt-2 mb-4">
          <Text>Password</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View className="relative justify-center  ">
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
        <Link href={"/forgot-password"}>
          <Text color={"$color8"}>Forgot your password?</Text>
        </Link>
        <Link href={"/sign-up"}>
          <Text color={"$color8"}>Doesn't have an account yet?</Text>
        </Link>
        <Form.Trigger marginTop="$3.5" asChild disabled={isSubmitting}>
          <Button
            theme={"active"}
            width={"100%"}
            icon={isSubmitting ? () => <Spinner /> : undefined}
          >
            Sign In
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
          Sign In with Google
        </Button>
      </Form>
    </View>
  );
};

export default SignInScreen;
