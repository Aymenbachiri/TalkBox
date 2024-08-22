import MyButton from "@/src/components/reusable_components/MyButton";
import MyTextInput from "@/src/components/reusable_components/MyTextInput";
import MyView from "@/src/components/reusable_components/MyView";
import { supabase } from "@/src/lib/database/supabase";
import { useState } from "react";
import { Alert, AppState } from "react-native";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert("Please check your inbox for email verification!");
    setLoading(false);
  }

  return (
    <MyView className="mt-10 p-3">
      <MyView className="pt-1 pb-1 self-stretch mt-5">
        <MyTextInput
          onChangeText={(text: string) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
        />
      </MyView>
      <MyView className="pt-1 pb-1 self-stretch">
        <MyTextInput
          onChangeText={(text: string) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
        />
      </MyView>
      <MyView className="pt-1 pb-1 self-stretch mt-5">
        <MyButton
          title="Sign in"
          disabled={loading}
          onPress={() => signInWithEmail()}
        />
      </MyView>
      <MyView className="pt-1 pb-1 self-stretch">
        <MyButton
          title="Sign up"
          disabled={loading}
          onPress={() => signUpWithEmail()}
        />
      </MyView>
    </MyView>
  );
}
