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
    let extractedUrl: string | null = null;

    try {
      // Try parsing the scanned data as JSON
      const jsonData = JSON.parse(scannedLink);

      // Check if "url" property exists in the parsed JSON
      if (jsonData && jsonData.url) {
        extractedUrl = jsonData.url;
      } else {
        console.warn('No valid "url" property found in the scanned JSON data:', scannedLink);
        // Handle the case when "url" property is not found in the scanned JSON data
      }
    } catch (error) {
      // If parsing as JSON fails, assume it's a plain URL
      console.log('Error parsing as JSON:', error);

      // Regular expression to extract the URL from the scanned data
      const urlPattern = /(https?|ftp):\/\/[^\s/$.?#].[^\s]*/i;
      const match = scannedLink.match(urlPattern);

      if (match) {
        extractedUrl = match[0];
      } else {
        console.warn('No valid URL found in the scanned data:', scannedLink);
        // Handle the case when a valid URL is not found in the scanned data
      }
    }

    // Check if the extractedUrl is not null and fix the URL format if needed
    if (extractedUrl) {
      // Fix URL format if it starts with "http://https//"
      if (extractedUrl.startsWith('http://https//')) {
        extractedUrl = extractedUrl.replace('http://https//', 'https://');
      }

      setWebsiteLink(extractedUrl);
      navigation.navigate('Webview');
    }
  };
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return (
    <View style={styles.container}>
        <QRCodeScanner
          onRead={(e) => {
            // Handle the scanned QR code data
            const scannedLink = e.data;
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
