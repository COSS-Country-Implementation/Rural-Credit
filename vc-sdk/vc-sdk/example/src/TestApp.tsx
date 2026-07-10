import React from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  ScrollView
} from 'react-native';

export default function TestApp() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Basic React Native Test</Text>
        
        <View style={styles.section}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.result}>✅ React Native is working!</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Simple Math Test:</Text>
          <Text style={styles.result}>2 + 2 = {2 + 2}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.infoText}>If you can see this, React Native is working properly.</Text>
          <Text style={styles.infoText}>The issue is with the vc-sdk imports.</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30,
    color: '#333',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 5,
  },
  result: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  infoText: {
    fontSize: 14,
    color: '#28a745',
    textAlign: 'center',
    marginTop: 5,
    fontWeight: '600',
  },
});