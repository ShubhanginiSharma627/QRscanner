// QRCodeScannerScreen.tsx
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { WebView } from 'react-native-webview';
import { useAppContext } from '../AppContext';

interface QRCodeScannerScreenProps {}

const QRCodeScannerScreen: React.FC<QRCodeScannerScreenProps> = () => {
  const navigation = useNavigation();
  const { setWebsiteLink } = useAppContext();
  const handleScan = (scannedLink: string) => {
    navigation.navigate('Webview');
  };
  return (
    <View style={styles.container}>
        <QRCodeScanner
          onRead={(e) => {
            // Handle the scanned QR code data
            const scannedLink = e.data;
            setWebsiteLink(scannedLink);
            handleScan(scannedLink)
          }}
          reactivate={true}
          reactivateTimeout={2000}
          showMarker={true}
          markerStyle={styles.marker}
        />
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  marker: {
    borderColor: 'red',
    borderRadius: 10,
    borderWidth: 2,
  },
});

export default QRCodeScannerScreen;
