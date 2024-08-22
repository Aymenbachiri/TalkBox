import { useState, useEffect } from "react";
import { supabase } from "@/src/lib/database/supabase";
import { useAuth } from "@/src/lib/providers/AuthProvider";
import { Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MyView from "@/src/components/reusable_components/MyView";
import MyTextInput from "@/src/components/reusable_components/MyTextInput";
import MyButton from "@/src/components/reusable_components/MyButton";
import Avatar from "@/src/components/Avatar";

export default function ProfileScreen() {
  const { session } = useAuth();

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [fullName, setFullname] = useState("");
  const [website, setWebsite] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url, full_name`)
        .eq("id", session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
        setFullname(data.full_name);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
    full_name,
  }: {
    username: string;
    website: string;
    avatar_url: string;
    full_name: string;
  }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        full_name,
        updated_at: new Date(),
      };

      const { error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView className="mt-10 p-3">
      <MyView style={{ alignItems: "center" }}>
        <Avatar
          size={200}
          url={avatarUrl}
          onUpload={(url: string) => {
            setAvatarUrl(url);
            updateProfile({
              username,
              website,
              avatar_url: url,
              full_name: fullName,
            });
          }}
        />
      </MyView>

      <MyView className="pt-1 pb-1 self-stretch mt-5">
        <MyTextInput
          value={session?.user?.email!}
          onChangeText={() => {}}
          placeholder={""}
        />
      </MyView>
      <MyView className="pt-1 pb-1 self-stretch">
        <MyTextInput
          placeholder="full name"
          value={fullName || ""}
          onChangeText={(text: string) => setFullname(text)}
        />
      </MyView>
      <MyView className="pt-1 pb-1 self-stretch">
        <MyTextInput
          placeholder="username"
          value={username || ""}
          onChangeText={(text: string) => setUsername(text)}
        />
      </MyView>
      <MyView className="pt-1 pb-1 self-stretch">
        <MyTextInput
          placeholder="website"
          value={website || ""}
          onChangeText={(text: string) => setWebsite(text)}
        />
      </MyView>

      <MyView className="pt-1 pb-1 self-stretch mt-5">
        <MyButton
          title={loading ? "Loading ..." : "Update"}
          onPress={() =>
            updateProfile({
              username,
              website,
              avatar_url: avatarUrl,
              full_name: fullName,
            })
          }
          disabled={loading}
        />
      </MyView>

      <MyView className="pt-1 pb-1 self-stretch">
        <MyButton title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </MyView>
    </ScrollView>
  );
}
