import { useAuth } from "@/src/lib/providers/AuthProvider";
import ChatProvider from "@/src/lib/providers/ChatProvider";
import { type Href, Redirect, Stack } from "expo-router";

export default function HomeLayout() {
  const { user } = useAuth();

  if (!user) {
    return <Redirect href={"/(auth)/login" as Href} />;
  }

  return (
    <ChatProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ChatProvider>
  );
}
