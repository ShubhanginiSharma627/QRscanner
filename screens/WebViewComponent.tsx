// WebViewComponent.tsx

import React from 'react';
import { WebView, WebViewProps } from 'react-native-webview';
import { useAppContext } from '../AppContext';



const WebViewComponent: React.FC = () => {
  const { websiteLink } = useAppContext();

  if (websiteLink){
    return <WebView source={{ uri: "https://www.npmjs.com/package/react-native-qrcode-scanner" }} />;
  }
  return
};

export default WebViewComponent;
