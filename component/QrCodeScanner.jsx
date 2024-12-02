import { CameraView } from "expo-camera";
import {
  Linking,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { useState } from "react";

export default function QrCodeScanner({ onClose, handleSelectProductByRef }) {
  const [isScannerVisible, setIsScannerVisible] = useState(true);
  const [scannedMessage, setScannedMessage] = useState("");

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      {isScannerVisible && (
        <CameraView
          style={StyleSheet.absoluteFillObject}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data) {
              console.log(data);
              handleSelectProductByRef(data);
              setScannedMessage("Product scanned successfully: " + data);
            }
          }}
          barcodeScannerSettings={{ barcodeTypes: "qr" }}
        />
      )}
      {scannedMessage && <Text style={styles.text}>{scannedMessage}</Text>}
      <Pressable
        onPress={() => {
          setIsScannerVisible(false);
          onClose();
        }}
        style={styles.closeBtn}>
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
