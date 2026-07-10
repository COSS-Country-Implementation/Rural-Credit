import React, { useState } from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity
} from 'react-native';
import { 
  multiply, 
  add, 
  subtract, 
  divide, 
  power, 
  factorial, 
  isPrime, 
  generateRandomNumber,
  formatCurrency,
  IssuerScreen
} from 'vcsdk';


export default function App() {
  const [currentView, setCurrentView] = useState<'math' | 'issuers'>('math');

  // Math calculations (existing functionality)
  const multiplyResult = multiply(3, 7);
  const addResult = add(15, 25);
  const subtractResult = subtract(50, 20);
  const divideResult = divide(100, 4);
  const powerResult = power(2, 8);
  const factorialResult = factorial(5);
  const primeCheck = isPrime(17);
  const randomNum = generateRandomNumber(1, 100);
  const currencyFormatted = formatCurrency(1234.56);


  const renderMathFunctions = () => (
    <View style={styles.content}>
      <Text style={styles.title}>VCSDK Math Functions</Text>
      
      <View style={styles.section}>
        <Text style={styles.label}>Multiply (3 × 7):</Text>
        <Text style={styles.result}>{multiplyResult}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Add (15 + 25):</Text>
        <Text style={styles.result}>{addResult}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Subtract (50 - 20):</Text>
        <Text style={styles.result}>{subtractResult}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Divide (100 ÷ 4):</Text>
        <Text style={styles.result}>{divideResult}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Power (2^8):</Text>
        <Text style={styles.result}>{powerResult}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Factorial (5!):</Text>
        <Text style={styles.result}>{factorialResult}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Is 17 Prime?:</Text>
        <Text style={styles.result}>{primeCheck ? 'Yes' : 'No'}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Random Number (1-100):</Text>
        <Text style={styles.result}>{randomNum}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Currency Format ($1234.56):</Text>
        <Text style={styles.result}>{currencyFormatted}</Text>
      </View>
    </View>
  );

  const renderIssuersScreen = () => {
    return <IssuerScreen />;
  };

  return (
    <ScrollView style={styles.container}>
      {/* Navigation Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, currentView === 'math' && styles.activeTab]}
          onPress={() => setCurrentView('math')}
        >
          <Text style={[styles.tabText, currentView === 'math' && styles.activeTabText]}>
            Math Functions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, currentView === 'issuers' && styles.activeTab]}
          onPress={() => setCurrentView('issuers')}
        >
          <Text style={[styles.tabText, currentView === 'issuers' && styles.activeTabText]}>
            SDK Issuer Screen
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {currentView === 'math' ? renderMathFunctions() : renderIssuersScreen()}
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
  },
});
