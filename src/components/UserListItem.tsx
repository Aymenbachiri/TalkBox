import { useChatContext } from "stream-chat-expo";
import { useAuth } from "../lib/providers/AuthProvider";
import MyPressable from "./reusable_components/MyPressable";
import MyText from "./reusable_components/MyText";
import { router } from "expo-router";

const UserListItem = ({ user }: { user: any }) => {
  const { client } = useChatContext();
  const { user: me } = useAuth();

  const onPress = async () => {
    //start a chat with him
    const channel = client.channel("messaging", {
      members: [me?.id, user.id],
    });
    await channel.watch();
    router.replace(`/(home)/channel/${channel.cid}`);
  };

  return (
    <MyPressable
      onPress={onPress}
      style={{ padding: 15, backgroundColor: "white" }}
    >
      <MyText style={{ fontWeight: "600" }}>{user.full_name}</MyText>
    </MyPressable>
  );
};

export default UserListItem;
