# VC-SDK - Complete Verifiable Credentials SDK for React Native

[![NPM Version](https://img.shields.io/npm/v/vc-sdk.svg)](https://www.npmjs.com/package/vc-sdk)
[![Downloads](https://img.shields.io/npm/dm/vc-sdk.svg)](https://www.npmjs.com/package/vc-sdk)
[![License](https://img.shields.io/npm/l/vc-sdk.svg)](https://github.com/pankaj7121993/vc-sdk/blob/main/LICENSE)

A complete, production-ready SDK that brings all the functionality of digital identity wallets to your React Native applications with just a few lines of code.

## ✨ Features

- 🔐 **Complete Security**: Hardware keystore + biometric authentication
- 📱 **One-Line Integration**: Single provider component or init function
- 🎯 **Full Wallet Functionality**: Add, store, verify, share credentials
- 🔄 **State Management**: XState machines for robust workflows
- 📦 **Zero Configuration**: Works out of the box with sensible defaults
- 🔧 **Highly Customizable**: Extensible and configurable for any use case
- 💾 **Encrypted Storage**: Hardware-backed encryption for all sensitive data
- 🤝 **Credential Sharing**: QR codes, Bluetooth, and network sharing
- 📋 **Backup & Restore**: Secure cloud backup with encryption
- 🔍 **Verification**: W3C-compliant credential verification
- 📊 **Activity Logging**: Complete audit trail of all operations

## 🚀 Quick Start

### Installation

```bash
npm install vc-sdk
# or
yarn add vc-sdk
```

### Peer Dependencies

Install the required peer dependencies:

```bash
npm install @react-native-async-storage/async-storage react-native-keychain react-native-biometrics react-native-mmkv @react-native-community/netinfo react-native-device-info expo-camera expo-barcode-scanner react-native-svg react-native-fs
```

### Basic Setup

```tsx
import React from 'react';
import { VCSDKProvider } from 'vc-sdk';
import { MyApp } from './MyApp';

const sdkConfig = {
  appId: 'my-digital-wallet',
  biometrics: {
    enabled: true,
    title: 'Access your digital credentials',
  },
  storage: {
    encrypted: true,
    backup: {
      provider: 'icloud', // or 'google-drive'
      automatic: true,
    },
  },
};

export default function App() {
  return (
    <VCSDKProvider config={sdkConfig}>
      <MyApp />
    </VCSDKProvider>
  );
}
```

## 🎯 Integration Patterns

### Pattern 1: Provider-Based (Recommended)

```tsx
import React from 'react';
import { VCSDKProvider, VCWallet } from 'vc-sdk';

export default function App() {
  return (
    <VCSDKProvider config={{ appId: 'my-app' }}>
      <VCWallet
        onCredentialSelect={(credential) => {
          console.log('Selected credential:', credential);
        }}
        enableSearch={true}
        enableFilters={true}
      />
    </VCSDKProvider>
  );
}
```

### Pattern 2: Hook-Based

```tsx
import React from 'react';
import { View, Button } from 'react-native';
import { useCredentials, useAuth } from 'vc-sdk';

export const MyWallet = () => {
  const { credentials, addCredential, loading } = useCredentials();
  const { isAuthenticated, authenticate } = useAuth();

  const handleAddCredential = async () => {
    await addCredential({
      type: 'DriverLicense',
      issuer: 'DMV',
      credentialSubject: {
        id: 'did:example:123',
        name: 'John Doe',
        licenseNumber: 'D1234567',
      },
    });
  };

  if (!isAuthenticated) {
    return <Button title="Authenticate" onPress={authenticate} />;
  }

  return (
    <View>
      <Button title="Add Credential" onPress={handleAddCredential} />
      {/* Render credentials */}
    </View>
  );
};
```

### Pattern 3: Component-Based

```tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { VCWallet, VCScanner, VCAuth } from 'vc-sdk';

export const MyApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Auth" 
          component={() => (
            <VCAuth
              onAuthSuccess={(user) => console.log('Authenticated:', user)}
              biometricsEnabled={true}
            />
          )} 
        />
        <Stack.Screen 
          name="Wallet" 
          component={() => (
            <VCWallet
              onCredentialSelect={(vc) => console.log('Selected:', vc)}
            />
          )} 
        />
        <Stack.Screen 
          name="Scanner" 
          component={() => (
            <VCScanner
              onQRScanned={(data) => console.log('QR scanned:', data)}
            />
          )} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
```

### Pattern 4: Imperative API

```tsx
import React, { useEffect } from 'react';
import { VCSDK } from 'vc-sdk';

export const MyApp = () => {
  useEffect(() => {
    const initSDK = async () => {
      await VCSDK.init({
        appId: 'my-app',
        biometrics: { enabled: true },
      });

      // Add a credential
      const credential = await VCSDK.credentials.add({
        type: 'StudentID',
        issuer: 'University',
        credentialSubject: {
          id: 'did:example:student',
          name: 'Jane Doe',
          studentId: 'S123456',
        },
      });

      console.log('Credential added:', credential);
    };

    initSDK();
  }, []);

  return (
    // Your app UI
  );
};
```

## 📖 API Reference

### Core SDK Configuration

```tsx
interface VCSDKConfig {
  appId: string;
  environment?: 'development' | 'production';
  biometrics?: {
    enabled: boolean;
    title?: string;
    subtitle?: string;
    fallbackToPasscode?: boolean;
  };
  storage?: {
    encrypted?: boolean;
    backup?: {
      provider: 'icloud' | 'google-drive' | 'custom';
      automatic?: boolean;
      schedule?: 'daily' | 'weekly' | 'manual';
    };
  };
  ui?: {
    theme?: 'light' | 'dark' | 'auto';
    primaryColor?: string;
  };
}
```

### Main SDK APIs

#### Credentials API
```tsx
// Add a new credential
const credential = await VCSDK.credentials.add({
  type: 'DriverLicense',
  issuer: 'DMV',
  credentialSubject: { /* credential data */ }
});

// Get all credentials
const credentials = await VCSDK.credentials.getAll();

// Search credentials
const results = await VCSDK.credentials.search('license');

// Verify a credential
const verification = await VCSDK.credentials.verify(credential);

// Delete a credential
await VCSDK.credentials.delete(credentialId);
```

#### Authentication API
```tsx
// Authenticate user
const authResult = await VCSDK.auth.authenticate();

// Check authentication status
const isAuthenticated = await VCSDK.auth.isAuthenticated();

// Setup biometric authentication
const success = await VCSDK.auth.setupBiometrics();

// Logout
await VCSDK.auth.logout();
```

#### Sharing API
```tsx
// Share via QR code
const qrData = await VCSDK.sharing.shareViaQR(
  ['credential-id'], 
  { did: 'recipient', purpose: 'verification' }
);

// Share via Bluetooth
const result = await VCSDK.sharing.shareViaBluetooth(
  ['credential-id'], 
  'device-id'
);

// Receive shared credential
const credential = await VCSDK.sharing.receiveCredential(qrData);
```

#### Storage API
```tsx
// Create backup
const backup = await VCSDK.storage.backup();

// Restore from backup
const result = await VCSDK.storage.restore(backupData);

// Get storage statistics
const stats = await VCSDK.storage.getStats();

// Export data
const exportData = await VCSDK.storage.export('json');
```

### React Hooks

#### useCredentials()
```tsx
const {
  credentials,
  loading,
  error,
  refresh,
  addCredential,
  deleteCredential,
  searchCredentials,
} = useCredentials(filters);
```

#### useAuth()
```tsx
const {
  isAuthenticated,
  user,
  loading,
  authenticate,
  logout,
  setupBiometrics,
} = useAuth();
```

#### useSharing()
```tsx
const {
  loading,
  error,
  shareViaQR,
  shareViaBluetooth,
  receiveCredential,
  getSharingHistory,
} = useSharing();
```

### UI Components

#### VCWallet Component
```tsx
<VCWallet
  onCredentialSelect={(credential) => {
    // Handle credential selection
  }}
  enableSearch={true}
  enableFilters={true}
  customCard={MyCustomCard}
  emptyState={MyEmptyState}
/>
```

#### VCAuth Component
```tsx
<VCAuth
  onAuthSuccess={(user) => {
    // Handle successful authentication
  }}
  onAuthError={(error) => {
    // Handle authentication error
  }}
  biometricsEnabled={true}
  showLogo={true}
  customTitle="Access Your Digital Wallet"
/>
```

#### VCScanner Component
```tsx
<VCScanner
  onQRScanned={(data) => {
    // Handle QR code scan
  }}
  onCredentialReceived={(credential) => {
    // Handle received credential
  }}
  enableFaceVerification={true}
  showInstructions={true}
/>
```

## 🔧 Advanced Configuration

### Custom Theme
```tsx
const sdkConfig = {
  appId: 'my-app',
  ui: {
    theme: 'dark',
    primaryColor: '#FF6B6B',
    secondaryColor: '#4ECDC4',
    customComponents: {
      VCCard: MyCustomVCCard,
      LoadingScreen: MyCustomLoader,
    },
  },
};
```

### Custom Backup Provider
```tsx
const sdkConfig = {
  appId: 'my-app',
  storage: {
    backup: {
      provider: 'custom',
      // Implement custom backup logic
    },
  },
};
```

### Network Configuration
```tsx
const sdkConfig = {
  appId: 'my-app',
  network: {
    timeout: 30000,
    retries: 3,
    baseUrl: 'https://my-vc-service.com',
  },
};
```

## 🔐 Security Features

### Hardware Keystore Integration
- All encryption keys are stored in hardware security modules
- Biometric authentication binds keys to current enrolled biometrics
- Keys are automatically invalidated if biometrics change

### Data Encryption
- AES-256-GCM encryption for all sensitive data
- Each credential encrypted with unique keys
- Metadata encrypted separately from credential data

### Verification Security
- W3C Verifiable Credentials standard compliance
- Ed25519 and RSA signature verification
- Issuer trust validation
- Expiration date checking
- Tamper detection

## 📱 Platform Setup

### iOS Setup

Add to your `ios/Podfile`:
```ruby
pod 'RNFS', :path => '../node_modules/react-native-fs'
pod 'RNKeychain', :path => '../node_modules/react-native-keychain'

post_install do |installer|
  installer.pods_project.targets.each do |target|
    if target.name == 'RNKeychain'
      target.build_configurations.each do |config|
        config.build_settings['KEYCHAIN_ACCESS_GROUPS'] = '$(AppIdentifierPrefix)$(PRODUCT_BUNDLE_IDENTIFIER)'
      end
    end
  end
end
```

Add to your `Info.plist`:
```xml
<key>NSCameraUsageDescription</key>
<string>This app needs access to camera to scan QR codes</string>
<key>NSFaceIDUsageDescription</key>
<string>Use Face ID to secure your digital credentials</string>
```

### Android Setup

Add to your `android/app/build.gradle`:
```gradle
android {
    defaultConfig {
        manifestPlaceholders = [
            'vcsdkBiometricPromptTitle': 'Authenticate with biometrics',
            'vcsdkBiometricPromptSubtitle': 'Access your digital credentials'
        ]
    }
}

dependencies {
    implementation 'androidx.biometric:biometric:1.1.0'
}
```

Add to your `AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.USE_BIOMETRIC" />
<uses-permission android:name="android.permission.USE_FINGERPRINT" />
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Type checking
npm run typecheck
```

## 📄 License

MIT © [VC SDK Team](https://github.com/pankaj7121993/vc-sdk)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📞 Support

- 📖 [Documentation](https://github.com/pankaj7121993/vc-sdk/docs)
- 🐛 [Issues](https://github.com/pankaj7121993/vc-sdk/issues)
- 💬 [Discussions](https://github.com/pankaj7121993/vc-sdk/discussions)

## 🗺️ Roadmap

- [ ] Web support (React)
- [ ] Flutter plugin
- [ ] Advanced credential templates
- [ ] Multi-signature support
- [ ] Zero-knowledge proof integration
- [ ] Decentralized identifier (DID) management

---

**Built with ❤️ for the decentralized identity community**