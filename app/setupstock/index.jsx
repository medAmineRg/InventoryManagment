import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  ActivityIndicator,
  Button,
  IconButton,
  Modal,
  Portal,
  Provider,
  RadioButton,
  Searchbar,
} from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import useUpdateStock from "../../hooks/useUpdateStock";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QrCodeScanner from "../../component/QrCodeScanner";
import { useCameraPermissions } from "expo-camera";

export default function UpdateStock() {
  const [selectedProduct, setSelectedProduct] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [checkedRadio, setCheckedRadio] = useState("1");
  const [token, setToken] = useState("");
  const [isScannerVisible, setIsScannerVisible] = useState(false);

  // scanner
  const [permission, requestPermission] = useCameraPermissions();

  const isPermissionGranted = permission?.granted;

  console.log(selectedProducts);

  const {
    updateStock,
    updateStockIsLoading,
    products,
    fetchProducts,
    error,
    setError,
    productsLoading,
    success,
    setSuccess,
  } = useUpdateStock();

  const filteredProducts = products.filter(
    (product) =>
      product.ProductRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.ProductLabel.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectProduct = (productId) => {
    const product = products.find((p) => p.ProductId == productId);
    if (!product) {
      Alert.alert(
        "Product not found",
        "The product with the given reference was not found."
      );
      return;
    }
    if (product && !selectedProducts.some((p) => p.ProductId == productId)) {
      setSelectedProducts([...selectedProducts, { ...product, quantity: "" }]);
    }
  };

  const handleSelectProductByRef = (ref) => {
    const product = products.find((p) => p.ProductRef == ref);
    if (!product) {
      Alert.alert(
        "Product not found",
        "The product with the given reference was not found."
      );
      return;
    }
    if (product && !selectedProducts.some((p) => p.ProductRef == ref)) {
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

  const updateStockHandler = async () => {
    const countData = {
      products: selectedProducts.map((product) => ({
        productId: product.ProductId,
        quantity: product.quantity,
      })),
      warehouseId: checkedRadio,
    };
    updateStock({ token, countData });
  };

  const handleDeleteProduct = (productId) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.filter((product) => product.ProductId != productId)
    );
  };

  useEffect(() => {
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      setToken(storedToken);
    };
    getToken();
  }, []);

  useEffect(() => {
    if (success) {
      setSelectedProducts([]);
      setSelectedProduct("");
    }
  }, [success]);

  // load spinner while fetching products
  if (productsLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} color="#2563eb" size="large" />
      </View>
    );
  }

  if (isPermissionGranted && isScannerVisible) {
    return (
      <QrCodeScanner
        onClose={() => setIsScannerVisible(false)}
        handleSelectProductByRef={handleSelectProductByRef}
      />
    );
  }
  return (
    <Provider>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.container}>
          <View style={styles.searchbarQrContainer}>
            <Searchbar
              placeholder="ابحث عن المنتجات..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchbar}
            />
            <Pressable
              onPress={() => {
                requestPermission();
                setIsScannerVisible(true);
              }}>
              <View style={{}}>
                <IconButton
                  icon="qrcode-scan"
                  size={30}
                  containerColor="#db2777"
                  animated={true}
                  onPress={() => {
                    requestPermission();
                    setIsScannerVisible(true);
                  }}
                />
              </View>
            </Pressable>
          </View>
          <Picker
            selectedValue={selectedProduct}
            onValueChange={(itemValue) => {
              setSelectedProduct(itemValue);
              handleSelectProduct(itemValue);
            }}
            style={{
              color: "#ffffff",
              backgroundColor: "#1f2937",
              borderWidth: 1,
              borderColor: "#2563eb",
              borderRadius: 5,
              paddingHorizontal: 10,
              height: 50,
              marginBottom: 16,
            }}
            itemStyle={{
              backgroundColor: "#374151",
              color: "#ffffff",
              fontSize: 16,
            }}>
            <Picker.Item
              label="حدد المنتج"
              value=""
              style={{ color: "#9ca3af" }}
            />
            {filteredProducts.map((product) => (
              <Picker.Item
                key={product.ProductId}
                label={`${product.ProductRef} - ${product.ProductLabel}`}
                value={product.ProductId}
                style={{
                  backgroundColor: "#1f2937",
                  color: "#ffffff",
                }}
              />
            ))}
          </Picker>

          <View style={styles.flatListContainer}>
            <FlatList
              removeClippedSubviews={false}
              data={selectedProducts}
              keyExtractor={(item) => item.ProductId.toString()}
              renderItem={({ item }) => (
                <View style={styles.selectedProduct}>
                  <Text style={styles.productText}>
                    {item.ProductRef} - {item.ProductLabel}
                  </Text>
                  <TextInput
                    style={styles.quantityInput}
                    placeholder="الكمية"
                    keyboardType="numeric"
                    value={item.quantity}
                    onChangeText={(quantity) => {
                      handleQuantityChange(item.ProductId, quantity);
                    }}
                  />
                  <IconButton
                    icon="delete"
                    size={30}
                    color="green"
                    iconColor="#db2777"
                    onPress={() => handleDeleteProduct(item.ProductId)}
                  />
                </View>
              )}
            />
          </View>
          <View style={styles.warehouseContainer}>
            <Text style={styles.text}>
              اختر موقع المستودع (مستودع واحد على الأقل)
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
            style={[
              styles.btn,
              updateStockIsLoading && { backgroundColor: "#db2777" },
            ]}
            onPress={updateStockHandler}
            disabled={updateStockIsLoading}>
            <Text style={styles.btnText}>
              {updateStockIsLoading ? "تحديث المخزون..." : "تحديث المخزون"}
            </Text>
          </TouchableOpacity>
          <Portal>
            <Modal
              visible={error || success}
              onDismiss={() => {
                setSuccess(null);
                setError(null);
              }}
              contentContainerStyle={styles.modalContainer}>
              <Text style={error ? styles.errorText : styles.successText}>
                {error ? "Error" : "Success"}
                {success && (
                  <IconButton
                    icon="check-circle"
                    size={30}
                    color="green"
                    iconColor="#22c55e"
                  />
                )}
                {error && (
                  <IconButton
                    icon="close-circle"
                    size={30}
                    color="green"
                    iconColor="#db2777"
                  />
                )}
              </Text>
              <Text style={error ? styles.errorText : styles.successText}>
                {error?.message || success?.message}
              </Text>

              <Button
                mode="contained"
                onPress={() => {
                  setSuccess(null);
                  setError(null);
                }}
                style={styles.dismissButton}>
                <Text style={styles.dismissText}>Dismiss</Text>
              </Button>
            </Modal>
          </Portal>
        </View>
      </KeyboardAvoidingView>
    </Provider>
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
    flex: 1,
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
    zIndex: 1,
  },
  loadingText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
  // modal styles
  errorText: {
    color: "#db2777",
    fontWeight: "bold",
    fontSize: 20,
  },
  successText: {
    color: "#2563eb",
    fontWeight: "bold",
    fontSize: 20,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#db2777",
    marginBottom: 10,
    textAlign: "left",
  },
  message: {
    fontSize: 16,
    color: "#ff0073",
    marginBottom: 20,
    textAlign: "left",
  },
  dismissButton: {
    backgroundColor: "#2563eb",
    marginTop: 20,
  },
  dismissText: {
    color: "#fff",
    fontWeight: 700,
  },
  // loader style
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#2563eb",
  },
  // qr text
  qrText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 20,
  },
  // search container
  searchbarQrContainer: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  flatListContainer: {
    flex: 1,
    height: 400,
    zIndex: 10,
  },
});
