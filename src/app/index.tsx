import { type Href, Redirect } from "expo-router";
import "react-native-reanimated";

export default function HomeScreen() {
  return <Redirect href={"/(auth)/login" as Href} />;
}
