import React from 'react';
import { Text, View } from 'react-native';

export default function MinimalApp() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f0f0' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333' }}>
        Hello World!
      </Text>
      <Text style={{ fontSize: 16, color: '#666', marginTop: 10 }}>
        React Native is working ✅
      </Text>
    </View>
  );
}