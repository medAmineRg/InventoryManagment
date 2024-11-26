import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { RadioButton, Searchbar } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import useUpdateStock from "../../hooks/useUpdateStock";

export default function UpdateStock() {
  const [selectedProduct, setSelectedProduct] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [checkedRadio, setCheckedRadio] = useState("1");

  const {
    updateStock,
    updateStockIsLoading,
    products,
    fetchProducts,
    productsLoading,
  } = useUpdateStock();

  const filteredProducts = products.filter(
    (product) =>
      product.ProductRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.ProductLabel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectProduct = (productId) => {
    const product = products.find((p) => p.ProductId == productId);
    if (product && !selectedProducts.some((p) => p.ProductId == productId)) {
      setSelectedProducts([...selectedProducts, { ...product, quantity: "" }]);
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.map((product) =>
        product.ProductId == productId ? { ...product, quantity } : product
      )
    );
  };

  // this function will be called when the user clicks the update stock button
  // it will send the selected products and quantities to the API
  // it will use postProducts from product service
  const updateStockHandler = async () => {
    const countData = {
      products: selectedProducts.map((product) => ({
        productId: product.ProductId,
        quantity: product.quantity,
      })),
      warehouseId: checkedRadio,
    };
    updateStock(countData);
  };

  if (productsLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchbar}
      />
      <Picker
        selectedValue={selectedProduct}
        onValueChange={(itemValue) => {
          setSelectedProduct(itemValue);
          handleSelectProduct(itemValue);
        }}
        style={styles.picker}>
        <Picker.Item label="Select a product" value="" />
        {filteredProducts.map((product) => (
          <Picker.Item
            key={product.ProductId}
            label={`${product.ProductRef} - ${product.ProductLabel}`}
            value={product.ProductId}
          />
        ))}
      </Picker>
      <FlatList
        data={selectedProducts}
        keyExtractor={(item) => item.ProductId.toString()}
        renderItem={({ item }) => (
          <View style={styles.selectedProduct}>
            <Text style={styles.productText}>
              {item.ProductRef} - {item.ProductLabel}
            </Text>
            <TextInput
              style={styles.quantityInput}
              placeholder="Qty"
              keyboardType="numeric"
              value={item.quantity}
              onChangeText={(quantity) =>
                handleQuantityChange(item.ProductId, quantity)
              }
            />
          </View>
        )}
      />
      <View style={styles.warehouseContainer}>
        <Text style={styles.text}>
          Select the warehouse location (min one warehouse)
        </Text>
        <RadioButton.Group
          onValueChange={(checkedRadio) => setCheckedRadio(checkedRadio)}
          value={checkedRadio}>
          <RadioButton.Item
            labelStyle={{ color: "white" }}
            color="#db2777"
            label="MAG"
            value="1"
          />
          <RadioButton.Item
            labelStyle={{ color: "white" }}
            color="#db2777"
            label="MED"
            value="3"
          />
        </RadioButton.Group>
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={updateStockHandler}
        // disabled={isLoading}
      >
        <Text style={styles.btnText}>
          {/* {isLoading ? "Updating Stock ..." : "Update Stock"} */}
          Update Stock
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#000",
    color: "#fff",
  },
  searchbar: {
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 16,
  },
  selectedProduct: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  productText: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
  },
  quantityInput: {
    width: 80,
    height: 40,
    borderColor: "#2563eb",
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: "#2563eb",
  },
  text: {
    fontSize: 16,
    marginBottom: 12,
    color: "#db2777",
    fontStyle: "italic",
    fontWeight: "bold",
  },
  checkbox: {
    color: "#fff",
  },
  btn: {
    width: "100%",
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
  warehouseContainer: {
    borderColor: "#db2777",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 12,
  },
  loadingText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});
