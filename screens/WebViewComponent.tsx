// WebViewComponent.tsx

import React from 'react';
import { WebView, WebViewProps } from 'react-native-webview';
import { useAppContext } from '../AppContext';



const WebViewComponent: React.FC = () => {
  const { websiteLink } = useAppContext();
  console.log("websiteLink",websiteLink)
  if (websiteLink){
    return <WebView source={{ uri: websiteLink }} />;
  }
  return
};

export default WebViewComponent;
