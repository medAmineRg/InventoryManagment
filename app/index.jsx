import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      <Link style={styles.text} href="./signin">
        View sign in
      </Link>
      <Link style={styles.text} href="./signup">
        View sign out
      </Link>
      <Link style={styles.text} href="./session">
        Session
      </Link>
      <Link style={styles.text} href="./updatestock">
        update stock
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
  text: {
    color: "#fff",
  },
});
