import UserListItem from "@/src/components/UserListItem";
import { supabase } from "@/src/lib/database/supabase";
import { useAuth } from "@/src/lib/providers/AuthProvider";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";

export default function UsersScreen() {
  const [users, setUsers] = useState<any[] | null>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      let { data: profiles, error } = await supabase
        .from("profiles")
        .select("*")
        .neq("id", user?.id); // exclude me

      setUsers(profiles);
    };
    fetchUsers();
  }, []);

  return (
    <FlatList
      data={users}
      contentContainerStyle={{ gap: 5 }}
      renderItem={({ item }) => <UserListItem user={item} />}
    />
  );
}
