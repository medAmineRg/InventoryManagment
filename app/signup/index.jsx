import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function SignUp() {
  return (
    <View style={styles.container}>
      <Link style={styles.text} href="/signin">
        sign in
      </Link>
      <Link style={styles.text} href="/">
        Home
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
});
