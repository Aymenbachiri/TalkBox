import { useAuth } from "@/src/lib/providers/AuthProvider";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { user } = useAuth();

  if (user) {
    return <Redirect href="/(home)" />;
  }

  return <Stack />;
}
