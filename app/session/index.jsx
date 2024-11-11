import * as React from "react";
import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

import { Searchbar } from "react-native-paper";
import { Avatar, Card, IconButton } from "react-native-paper";

export default function Session() {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <View style={styles.container}>
      <Searchbar
        style={styles.searchbar}
        placeholder="Search for a session"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <View style={styles.sessionContainer}>
        {[...Array(10).keys()].map((index) => {
          return (
            <View style={styles.cardSession} key={index}>
              <Card style={styles.card}>
                <Card.Title
                  title={`Session Count ${index + 1}`}
                  subtitle="10-10-2021"
                  titleStyle={styles.title}
                  subtitleStyle={styles.subtitle}
                  left={(props) => (
                    <Avatar.Icon {...props} icon="clipboard-check" />
                  )}
                  right={(props) => (
                    <IconButton
                      {...props}
                      icon="dots-vertical"
                      onPress={() => {}}
                    />
                  )}
                />
              </Card>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  searchbar: {
    width: "100%",
    padding: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  sessionContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
  cardSession: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  card: {
    flex: 1,
    // width: "50%",
  },
  title: {
    color: "#ff6347",
    fontSize: 16,
  },
  subtitle: {
    color: "#87cefa",
    fontSize: 16,
  },
});
