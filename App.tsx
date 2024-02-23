// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppProvider, useAppContext } from './AppContext'; // Import the AppProvider and useAppContext
import LoginScreen from './screens/LoginScreen';
import QRCodeScannerScreen from './screens/QRCodeScannerScreen';
import WebViewComponent from './screens/WebViewComponent';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreenWrapper} options={{ headerShown: false }} />
          <Stack.Screen name="QRCodeScanner" component={QRCodeScannerScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Webview" component={WebViewComponent} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

// Create a wrapper component for LoginScreen
const LoginScreenWrapper: React.FC = () => {
  const { websiteLink } = useAppContext();

  // Check if the user is authenticated based on your logic
  // You can use the websiteLink or any other authentication status
  const isAuthenticated = !!websiteLink;

  if (isAuthenticated) {
    // If authenticated, navigate to another screen (e.g., QRCodeScannerScreen)
    return <QRCodeScannerScreen />;
  }

  // If not authenticated, render the LoginScreen
  return <LoginScreen />;
};

export default App;
