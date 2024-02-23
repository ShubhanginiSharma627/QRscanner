// PhoneAuthScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const PhoneAuthScreen: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmation, setConfirmation] = useState<FirebaseAuthTypes.ConfirmationResult>();
  const navigation = useNavigation();
  const handleSendCode = async () => {
    try {
      const confirm = await auth().signInWithPhoneNumber(`+91${phoneNumber}`);
      // Save confirmation to use when verifying code
      setConfirmation(confirm);
      
      console.log("code verifed")
    } catch (error) {
      console.error('Error sending verification code:', error);
    }
  };
  useEffect(() => {
    // Check if the user is already signed in
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, navigate to the QR code scanner screen
        navigation.navigate('QRCodeScanner');
      }
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []); 

  const handleVerifyCode = async () => {
    if (confirmation) {
        try {
            await confirmation.confirm(verificationCode);
            //alert('Phone number verified!');
            navigation.navigate('QRCodeScanner');
          } catch (error) {
            console.error('Error verifying code:', error);
          }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Phone Authentication</Text>
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSendCode}>
        <Text style={styles.buttonText}>Send Code</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Verification Code"
        keyboardType="numeric"
        value={verificationCode}
        onChangeText={(text) => setVerificationCode(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
        <Text style={styles.buttonText}>Verify Code</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSendCode}>
        <Text style={styles.buttonText}>Resend Code</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PhoneAuthScreen;
