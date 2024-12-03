import { Link, useRouter } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import useAuthentication from "../../hooks/useAuthentication";

export default function Menu() {
  const router = useRouter();
  const { isSuccess } = useAuthentication();

  // handle log out delete token from local storage
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    router.replace("/");
  };

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/");
      }
    };
    getToken();
  }, [isSuccess]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>القائمة</Text>
      <Link style={styles.menuItem} href="/session">
        <Text style={styles.menuText}>اقتراحات حساب مخزون</Text>
      </Link>
      <Link style={styles.menuItem} href="/setupstock">
        <Text style={styles.menuText}>إعداد المخزون</Text>
      </Link>
      {/* create a link that will signout delete a token from local storage name -> token */}
      <Link style={styles.menuItem} href="/" onPress={handleLogout}>
        <Text style={styles.menuText}>تسجيل خروج</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
  },
  menuItem: {
    width: "80%",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#db2777",
    borderRadius: 5,
    alignItems: "center",
  },
  menuText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
