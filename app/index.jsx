import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <Link style={styles.menuItem} href="/signin">
        <Text style={styles.menuText}>SIGN IN</Text>
      </Link>
      <Link style={styles.menuItem} href="/signup">
        <Text style={styles.menuText}>SIGN UP</Text>
      </Link>
      <Link style={styles.menuItem} href="/session">
        <Text style={styles.menuText}>SESSION</Text>
      </Link>
      <Link style={styles.menuItem} href="/setupstock">
        <Text style={styles.menuText}>SET UP THE STOCK</Text>
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
