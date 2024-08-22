import { useAuth } from "@/src/lib/providers/AuthProvider";
import { FontAwesome5 } from "@expo/vector-icons";
import { type Href, Link, router, Stack } from "expo-router";
import { ChannelList } from "stream-chat-expo";

export default function MainTabScreen() {
  const { user } = useAuth();

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Link href={"/(home)/users" as Href} asChild>
              <FontAwesome5
                name="users"
                size={22}
                color="gray"
                style={{ marginHorizontal: 15 }}
              />
            </Link>
          ),
        }}
      />
      <ChannelList
        filters={{ members: { $in: [user?.id!] } }}
        onSelect={(channel) => router.push(`/channel/${channel.cid}`)}
      />
    </>
  );
}
