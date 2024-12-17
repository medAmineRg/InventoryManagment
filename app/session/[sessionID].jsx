import { useLocalSearchParams } from "expo-router";
import { View, FlatList, TextInput, StyleSheet } from "react-native";
import { Text, IconButton } from "react-native-paper";
import { useEffect, useState } from "react";
import { checkSessionCount } from "../../service/StockService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useUpdateStock from "../../hooks/useUpdateStock";

export default function SessionID() {
  const [token, setToken] = useState("");
  const { data } = useLocalSearchParams();
  const parsedData = JSON.parse(data); // Convert back to object

  const [fastMovingProduct, setFastMovingProduct] = useState(
    parsedData.fastMovingProduct
  );
  const [slowMovingProduct, setSlowMovingProduct] = useState(
    parsedData.slowMovingProduct
  );
  const [otherProduct, setOtherProduct] = useState(parsedData.otherProduct);

  const handleQuantityChange = (productId, quantity, setProducts) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productId === productId
          ? { ...product, userQuantity: quantity }
          : product
      )
    );
  };

  const { checkSessionCount } = useUpdateStock();

  const renderProductList = (products, setProducts) => (
    <FlatList
      removeClippedSubviews={false}
      data={products}
      keyExtractor={(item) => item.productId.toString()}
      renderItem={({ item }) => (
        <View style={styles.selectedProduct}>
          <Text style={styles.productText}>{item.productId}</Text>
          <TextInput
            style={styles.quantityInput}
            placeholder="الكمية"
            keyboardType="numeric"
            value={item.userQuantity || ""}
            onChangeText={(quantity) =>
              handleQuantityChange(item.productId, quantity, setProducts)
            }
          />
          {item.userQuantity && (
            <Text style={styles.comparisonText}>
              {item.userQuantity == item.quantity ? "✔️" : "❌"}
            </Text>
          )}
        </View>
      )}
    />
  );

  useEffect(() => {
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      setToken(storedToken);
    };
    getToken();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Fast Moving Products</Text>
      {renderProductList(fastMovingProduct, setFastMovingProduct)}
      <Text style={styles.sectionTitle}>Slow Moving Products</Text>
      {renderProductList(slowMovingProduct, setSlowMovingProduct)}
      <Text style={styles.sectionTitle}>Other Products</Text>
      {renderProductList(otherProduct, setOtherProduct)}
      {/* add a btn that submit the count */}
      <IconButton
        icon="check"
        color="#2563eb"
        size={24}
        onPress={async () => {
          //   for (const product of [
          //     ...fastMovingProduct,
          //     ...slowMovingProduct,
          //     ...otherProduct,
          //   ]) {
          //     // show a modal with the group of products that have a different quantity not one by one
          //     if (product.userQuantity != product.quantity) {
          //       // show message in arabic
          //       alert(
          //         `المنتج ${product.productId} الكمية التي قمت بإدخالها هي ${
          //           product.userQuantity == undefined ? 0 : product.userQuantity
          //         }`
          //       );
          //     }
          //   }
          checkSessionCount(token, parsedData._id, {
            fastMovingProduct,
            slowMovingProduct,
            otherProduct,
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedProduct: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  productText: {
    color: "#2563eb",
    fontSize: 16,
    marginRight: 8,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginRight: 8,
    width: 80,
    textAlign: "center",
    color: "#2563eb",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 16,
    color: "#db2777",
  },
  comparisonText: {
    fontSize: 16,
    marginLeft: 8,
  },
});
