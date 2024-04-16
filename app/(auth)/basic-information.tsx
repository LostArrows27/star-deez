import { View } from "react-native";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, H2, Image, Input, Separator, Spinner, Text } from "tamagui";
import { Form } from "tamagui"; // or '@tamagui/form'
import { supabase } from "@/lib/supabase";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { z } from "zod";
import { useAlertError } from "@/hooks/useAlertError";
import { useToastController } from "@tamagui/toast";
import { BasicInformationSchema } from "@/schema/basic-information";
import { SelectTama } from "@/components/ui/select";
import DateTimePicker from "@/components/ui/date-picker";
import AvatarPicker from "@/components/avatar-picker";
import { ImagePickerResult } from "expo-image-picker";
import { useAuth } from "@/hooks/auth/useAuth";
import { Gender } from "@/types/supabase-util-types";
import { decode } from "base64-arraybuffer";
import { router } from "expo-router";
type tBasicInformation = z.infer<typeof BasicInformationSchema>;

const BasicInformation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    control,
    reset,
  } = useForm<tBasicInformation>({
    resolver: zodResolver(BasicInformationSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const toast = useToastController();
  const [avatar, setAvatar] = useState<ImagePickerResult | null>(null);
  const { onOpen } = useAlertError();
  const { user, userDetails, setUserDetails } = useAuth();
  if (!user) {
    router.push("/(auth)/sign-in");
  }
  if (userDetails) {
    router.push("/(home)/(drawer)/newfeed");
  }
  const [serverError, setServerError] = useState<string | null>(null);
  async function onSubmit(values: tBasicInformation) {
    if (!user) {
      onOpen("User not found");
      return;
    }
    //upload avatar
    if (!avatar) {
      onOpen("Please upload your avatar");
      return;
    }
  

    if (!avatar.canceled) {
      const ext = avatar.assets[0].uri.split(".").pop();
      const fileName = `${user.id}/avatar`;
      const { data, error } = await supabase.storage
        .from("profiles")
        .upload(
          fileName,
          decode(avatar.assets[0].base64 || avatar.assets[0].uri),
          {
            contentType: `image/png`,
          }
        );

      if (error || !data) {
        onOpen(error.message);
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("profiles").getPublicUrl(data.path);

      const { data: profile, error: uploadProfileError } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          first_name: values.firstName.trim(),
          last_name: values.lastName.trim(),
          dob: values.dob.toDateString(),
          email: user.email as string,
          gender: values.gender as Gender,
          avatar: publicUrl,
        })
        .select("*")
        .single();
      if (uploadProfileError) {
        onOpen(uploadProfileError.message);
        return;
      } else {
        toast.show("Success!!", {
          message: "Profile has been created!",
          native: false,
        });
        setUserDetails(profile);
        reset();
        router.push("/(home)/(drawer)/newfeed");
      }
    }
  }

  return (
    <View className="h-screen justify-center items-center bg-white">
      <H2 color={"$color8"}>Star Deez</H2>
      <Text>Provide us some information about you</Text>

      <Form
        onSubmit={handleSubmit(onSubmit)}
        width={"100%"}
        alignItems="center"
        gap="$2"
        padding="$6"
      >
        <View className="gap-y-2 w-full">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                size="$4"
                placeholder="First Name"
                borderWidth={2}
              />
            )}
            name="firstName"
          />

          {errors.firstName && (
            <Text color="red">{errors.firstName.message}</Text>
          )}
        </View>
        <View className="gap-y-2 w-full mt-2 ">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder="Last Name"
                size="$4"
                borderWidth={2}
              />
            )}
            name="lastName"
          />

          {errors.lastName && (
            <Text color="red">{errors.lastName.message}</Text>
          )}
        </View>
        <View className="gap-y-2 w-full mt-2 ">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <SelectTama
                setVal={onChange}
                val={value}
                items={[
                  {
                    value: "female",
                    label: "Female",
                  },
                  {
                    value: "male",
                    label: "Male",
                  },
                  {
                    value: "other",
                    label: "Other",
                  },
                ]}
              />
            )}
            name="gender"
          />

          {errors.gender && <Text color="red">{errors.gender.message}</Text>}
        </View>
        <View className="gap-y-2 w-full mt-2 ">
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <DateTimePicker
                type="date"
                accentColor="green"
                textColor="green"
                onConfirm={onChange}
                placeholder="Date of Birth"
                date={value}
                buttonTextColorIOS="green"
              />
            )}
            name="dob"
          />

          {errors.dob && <Text color="red">{errors.dob.message}</Text>}
        </View>

        <AvatarPicker setImage={setAvatar} />
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
            Confirm
          </Button>
        </Form.Trigger>
        {/* <View className="flex-row">
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
        </Button> */}
      </Form>
    </View>
  );
};

export default BasicInformation;
