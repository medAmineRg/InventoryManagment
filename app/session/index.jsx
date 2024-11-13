import { useState, useEffect, useRef } from "react";
import { View, StyleSheet, FlatList, Animated } from "react-native";
import { Searchbar } from "react-native-paper";
import { Avatar, Card, IconButton } from "react-native-paper";

const data = [
  { id: "1", title: "Card 1", subtitle: "Subtitle 1" },
  { id: "2", title: "Card 2", subtitle: "Subtitle 2" },
  { id: "3", title: "Card 3", subtitle: "Subtitle 3" },
  { id: "4", title: "Card 4", subtitle: "Subtitle 4" },
  { id: "5", title: "Card 5", subtitle: "Subtitle 5" },
  { id: "6", title: "Card 6", subtitle: "Subtitle 6" },
  { id: "7", title: "Card 7", subtitle: "Subtitle 7" },
  { id: "8", title: "Card 8", subtitle: "Subtitle 8" },
  { id: "9", title: "Card 9", subtitle: "Subtitle 9" },
  { id: "10", title: "Card 10", subtitle: "Subtitle 10" },
  { id: "11", title: "Card 11", subtitle: "Subtitle 11" },
  { id: "12", title: "Card 12", subtitle: "Subtitle 12" },
  { id: "13", title: "Card 13", subtitle: "Subtitle 13" },
  { id: "14", title: "Card 14", subtitle: "Subtitle 14" },
  { id: "15", title: "Card 15", subtitle: "Subtitle 15" },
  { id: "16", title: "Card 16", subtitle: "Subtitle 16" },
  { id: "17", title: "Card 17", subtitle: "Subtitle 17" },
  { id: "18", title: "Card 18", subtitle: "Subtitle 18" },
  { id: "19", title: "Card 19", subtitle: "Subtitle 19" },
  { id: "20", title: "Card 20", subtitle: "Subtitle 20" },
];

export default function Session() {
  const [searchQuery, setSearchQuery] = useState("");
  const borderAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(borderAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(borderAnimation, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [borderAnimation]);

  const borderColor = borderAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["#db2777", "#2563eb"],
  });

  const renderItem = ({ item }) => (
    <Animated.View
      style={[styles.tile, { borderWidth: 4, borderColor, borderRadius: 16 }]}>
      <Card>
        <Card.Title
          title={`Session Count ${item.id}`}
          subtitle="10-10-2021"
          titleStyle={styles.title}
          subtitleStyle={styles.subtitle}
          left={(props) => <Avatar.Icon {...props} icon="clipboard-check" />}
          right={(props) => (
            <IconButton {...props} icon="dots-vertical" onPress={() => {}} />
          )}
        />
      </Card>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <Searchbar
        style={styles.searchbar}
        placeholder="Search for a session"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContainer}
        style={styles.flatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  searchbar: {
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 20,
  },
  flatList: {
    width: "100%",
  },
  flatListContainer: {
    paddingHorizontal: 16,
  },
  tile: {
    marginBottom: 16,
    width: "100%",
    elevation: 4,
    borderRadius: 8,
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
