import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import TextRecognition from 'react-native-text-recognition';

const Scan = () => {
  const [scannedText, setScannedText] = useState('');

  const pickDocument = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      base64: true,
    });

    if (!result.cancelled) {
      const text = await TextRecognition.recognize(result.uri);
      setScannedText(text.join(' '));
    }
  };

  return (
    <View style={{
      justifyContent:'center',
      flex:1,
    }}>
      <Button title="Scan Document" onPress={pickDocument} />
      <Text>Extracted Text:</Text>
      <Text>{scannedText}</Text>
    </View>
  );
};

export default Scan;
