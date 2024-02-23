// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppProvider } from './AppContext'; // Import the AppProvider
import LoginScreen from './screens/LoginScreen';
import QRCodeScannerScreen from './screens/QRCodeScannerScreen';
import WebViewComponent from './screens/WebViewComponent';


const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="QRCodeScanner" component={QRCodeScannerScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Webview" component={WebViewComponent} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}

export default App;
