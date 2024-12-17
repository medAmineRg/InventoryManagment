import { Link, useRouter } from "expo-router";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import useAuthentication from "../hooks/useAuthentication";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const { signIn, isLoading, isSuccess, error } = useAuthentication();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    signIn({ email, password });
  };

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token || isSuccess) {
        router.replace("/menu");
      }
    };
    getToken();
  }, [isSuccess]);
  return (
    <View style={styles.container}>
      {error && !isLoading ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor={"#fff"}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        keyboardType="password"
        secureTextEntry
        onChangeText={setPassword}
        placeholderTextColor={"#fff"}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={handleSignIn}
        disabled={isLoading}>
        <Text style={styles.btnText}>
          {isLoading ? "تسجيل الدخول..." : "تسجيل الدخول"}
        </Text>
      </TouchableOpacity>
      <Link style={[styles.text, styles.btnText]} href="/signup">
        إنشاء حساب إذا لم يكن لديك حساب
      </Link>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#000",
//   },
//   title: {
//     color: "#fff",
//     fontSize: 24,
//     marginBottom: 20,
//     fontWeight: "bold",
//   },
//   menuItem: {
//     width: "80%",
//     padding: 15,
//     marginVertical: 10,
//     backgroundColor: "#db2777",
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   menuText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: "white",
  },
  text: {
    borderWidth: 1,
    borderColor: "#db2777",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    textAlign: "center",
    marginBottom: 12,
    backgroundColor: "#db2777",
  },
  btn: {
    width: "80%",
    borderRadius: 5,
    backgroundColor: "#2563eb",
    padding: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 12,
  },
});
