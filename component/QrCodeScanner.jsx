import { CameraView } from "expo-camera";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  Vibration,
  Platform,
  Alert,
} from "react-native";
import { useState } from "react";

export default function QrCodeScanner({ onClose, handleSelectProductByRef }) {
  const [isScannerVisible, setIsScannerVisible] = useState(true);
  const [scannedMessage, setScannedMessage] = useState("");
  const handleBarCodeScanned = ({ data }) => {
    if (data) {
      if (Platform.OS !== "web" && Vibration.vibrate) {
        Vibration.vibrate();
      }
      handleSelectProductByRef(data);
      setIsScannerVisible(prev => false);
      Alert.alert("Success", "Product scanned successfully: " + data, [
        {
          text: "Ok",
          onPress: () => {
            setIsScannerVisible(prev => true);
          },
        },
      ]);
      setScannedMessage("Product scanned successfully: " + data);
    }
  };

  const handleCloseQrCode = () => {
    setIsScannerVisible(false);
    onClose();
  };

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      {isScannerVisible && (
        <CameraView
          style={StyleSheet.absoluteFillObject}
          facing="back"
          onBarcodeScanned={handleBarCodeScanned}
          barcodeScannerSettings={{ barcodeTypes: "qr" }}
        />
      )}
      {scannedMessage && <Text style={styles.text}>{scannedMessage}</Text>}
      <Pressable onPress={handleCloseQrCode} style={styles.closeBtn}>
        <Text style={styles.closeText}>Close</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  closeBtn: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: [{ translateX: "-50%" }],
    width: "60%",
    padding: 15,
    backgroundColor: "#db2777",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  closeText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});
