import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { VCSDKProvider, VCWallet, VCScanner, VCAuth, useCredentials, useAuth } from 'vc-sdk';

const Tab = createBottomTabNavigator();

// Complete integration example showing all VC-SDK patterns
const sdkConfig = {
  appId: 'example-digital-wallet',
  environment: 'development' as const,
  biometrics: {
    enabled: true,
    title: 'Access your digital credentials',
    fallbackToPasscode: true,
  },
  storage: {
    encrypted: true,
    backup: {
      provider: 'icloud' as const,
      automatic: true,
      schedule: 'daily' as const,
    },
  },
  ui: {
    theme: 'auto' as const,
    primaryColor: '#007AFF',
  },
};

// Custom wallet screen using hooks
const CustomWalletScreen = () => {
  const { credentials, addCredential, loading, error } = useCredentials();
  const { isAuthenticated, authenticate, user } = useAuth();

  const handleAddCredential = async () => {
    try {
      await addCredential({
        type: 'DriverLicense',
        issuer: 'DMV',
        credentialSubject: {
          id: 'did:example:123',
          name: 'John Doe',
          licenseNumber: 'D1234567',
          dateOfBirth: '1990-01-01',
        },
        name: 'Driver License',
      });
      alert('Credential added successfully!');
    } catch (error) {
      alert('Failed to add credential');
      console.error('Error:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <VCAuth
        onAuthSuccess={(user) => console.log('Authenticated:', user)}
        onAuthError={(error) => console.error('Auth error:', error)}
        // biometricsEnabled={true}
        customTitle="Access Your Digital Wallet"
      />
    );
  }

  return (
    <VCWallet
      credentials={credentials}
      onCredentialSelect={(credential) => {
        console.log('Selected credential:', credential.name);
        alert(`Selected: ${credential.name}`);
      }}
      enableSearch={true}
      enableFilters={true}
    />
  );
};

// Scanner screen
const ScannerScreen = () => {
  return (
    <VCScanner
      onQRScanned={(data) => {
        console.log('QR Code scanned:', data);
      }}
      onCredentialReceived={(credential) => {
        console.log('Credential received:', credential);
        alert(`Received credential: ${credential.name}`);
      }}
      enableFaceVerification={true}
      showInstructions={true}
    />
  );
};

// Settings screen with SDK controls
const SettingsScreen = () => {
  const { user, logout } = useAuth(); // setupBiometrics disabled

  return (
    <div style={{ padding: 20 }}>
      <h2>Settings</h2>
      {user && (
        <div>
          <p>User ID: {user.id}</p>
          <p>Biometrics: {user.biometricsEnabled ? 'Enabled' : 'Disabled'}</p>
          <p>Last Login: {new Date(user.lastLogin).toLocaleString()}</p>
        </div>
      )}
      
      {/* <button onClick={setupBiometrics}>Setup Biometrics</button> */}
      <button onClick={logout}>Logout</button>
    </div>
  );
};

// Main app component
export default function ExampleApp() {
  return (
    <VCSDKProvider 
      config={sdkConfig}
      onReady={(sdk) => console.log('VC-SDK is ready!', sdk)}
      onError={(error) => console.error('VC-SDK error:', error)}
    >
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: '#666',
          }}
        >
          <Tab.Screen 
            name="Wallet" 
            component={CustomWalletScreen}
            options={{
              tabBarIcon: () => '💳',
              headerShown: false,
            }}
          />
          <Tab.Screen 
            name="Scanner" 
            component={ScannerScreen}
            options={{
              tabBarIcon: () => '📱',
              headerShown: false,
            }}
          />
          <Tab.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{
              tabBarIcon: () => '⚙️',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </VCSDKProvider>
  );
}