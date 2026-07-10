import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { 
  VCSDKProvider, 
  VCWallet,
  AllCredentialsScreen,
  VCAuth, 
  VCScanner,
  IssuerListScreen,
  CredentialTypeSelectionScreen,
  SettingsScreen,
  useCredentials, 
  useAuth,
  IssuerService,
  ValidationService
} from 'vc-sdk';
import type { IssuerInfo, CredentialType, AuthMethod } from 'vc-sdk';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// SDK Configuration
const sdkConfig = {
  appId: 'complete-digital-wallet',
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
  validation: {
    strictMode: false,
    autoValidate: true,
    customRules: [],
  }
};

// Enhanced Wallet Screen with All Features
const EnhancedWalletScreen = () => {
  const { credentials, addCredential, loading, error } = useCredentials();
  const { isAuthenticated, authenticate, user } = useAuth();
  const [showAllCredentials, setShowAllCredentials] = useState(false);

  if (!isAuthenticated) {
    return (
      <VCAuth
        onAuthSuccess={(user) => console.log('Authenticated:', user)}
        onAuthError={(error) => console.error('Auth error:', error)}
        // biometricsEnabled={true}
        customTitle="Access Your Complete Digital Wallet"
      />
    );
  }

  if (showAllCredentials) {
    return (
      <AllCredentialsScreen
        onCredentialSelect={(credential) => {
          console.log('Selected credential:', credential.name);
        }}
        enableSearch={true}
        enableFilters={true}
        enableActions={true}
      />
    );
  }

  return (
    <VCWallet
      credentials={credentials}
      onCredentialSelect={(credential) => {
        console.log('Selected credential:', credential.name);
      }}
      enableSearch={true}
      enableFilters={true}
      emptyStateAction={{
        text: 'Add Your First Credential',
        onPress: () => {
          // Navigate to issuer selection
        }
      }}
    />
  );
};

// Complete Issuer Integration Screen
const IssuerIntegrationScreen = ({ navigation }) => {
  const [selectedIssuer, setSelectedIssuer] = useState<IssuerInfo | null>(null);
  const [issuerService] = useState(() => new IssuerService());

  const handleIssuerSelect = (issuer: IssuerInfo) => {
    setSelectedIssuer(issuer);
    navigation.navigate('CredentialTypeSelection', { issuer });
  };

  const handleError = (error: string) => {
    console.error('Issuer error:', error);
  };

  return (
    <IssuerListScreen
      onIssuerSelect={handleIssuerSelect}
      onError={handleError}
    />
  );
};

// Credential Type Selection Integration
const CredentialTypeScreen = ({ route, navigation }) => {
  const { issuer } = route.params;
  const [issuerService] = useState(() => new IssuerService());

  const handleCredentialTypeSelect = async (
    credentialType: CredentialType, 
    authMethod: AuthMethod
  ) => {
    try {
      // Navigate to authentication
      navigation.navigate('CredentialIssuance', {
        issuer,
        credentialType,
        authMethod
      });
    } catch (error) {
      console.error('Selection error:', error);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <CredentialTypeSelectionScreen
      issuer={issuer}
      onCredentialTypeSelect={handleCredentialTypeSelect}
      onBack={handleBack}
    />
  );
};

// Complete Settings Integration
const CompleteSettingsScreen = ({ navigation }) => {
  const handleBackupPress = () => {
    // Navigate to backup screen
    console.log('Navigate to backup');
  };

  const handleSecurityPress = () => {
    // Navigate to security settings
    console.log('Navigate to security settings');
  };

  const handleAboutPress = () => {
    // Navigate to about screen
    console.log('Navigate to about');
  };

  return (
    <SettingsScreen
      onBackupPress={handleBackupPress}
      onSecurityPress={handleSecurityPress}
      onAboutPress={handleAboutPress}
    />
  );
};

// Enhanced Scanner with Validation
const EnhancedScannerScreen = () => {
  const [validationService] = useState(() => new ValidationService());

  const handleQRScanned = async (data: string) => {
    console.log('QR Code scanned:', data);
    
    // If it's a credential, validate it
    try {
      const parsedData = JSON.parse(data);
      if (parsedData.type === 'VerifiablePresentation') {
        const credential = parsedData.verifiableCredential[0];
        const validationResult = await validationService.validateCredential(credential, {
          strictMode: false,
          includeSuggestions: true
        });
        
        console.log('Validation result:', validationResult);
        
        if (!validationResult.isValid) {
          console.warn('Invalid credential received:', validationResult.errors);
        }
      }
    } catch (error) {
      console.log('Non-credential QR code');
    }
  };

  const handleCredentialReceived = async (credential) => {
    console.log('Credential received:', credential);
    
    // Validate received credential
    try {
      const validationResult = await validationService.validateCredential(credential);
      if (validationResult.isValid) {
        console.log('Valid credential received!');
      } else {
        console.warn('Received invalid credential:', validationResult.errors);
      }
    } catch (error) {
      console.error('Validation error:', error);
    }
  };

  return (
    <VCScanner
      onQRScanned={handleQRScanned}
      onCredentialReceived={handleCredentialReceived}
      enableFaceVerification={true}
      showInstructions={true}
    />
  );
};

// Stack Navigator for Issuer Flow
const IssuerStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="IssuerList" 
        component={IssuerIntegrationScreen}
        options={{ title: 'Select Issuer' }}
      />
      <Stack.Screen 
        name="CredentialTypeSelection" 
        component={CredentialTypeScreen}
        options={{ title: 'Select Credential Type' }}
      />
    </Stack.Navigator>
  );
};

// Main Tab Navigator
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#666',
      }}
    >
      <Tab.Screen 
        name="Wallet" 
        component={EnhancedWalletScreen}
        options={{
          tabBarIcon: () => '💳',
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name="Add" 
        component={IssuerStackNavigator}
        options={{
          tabBarIcon: () => '➕',
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name="Scanner" 
        component={EnhancedScannerScreen}
        options={{
          tabBarIcon: () => '📱',
          headerShown: false,
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={CompleteSettingsScreen}
        options={{
          tabBarIcon: () => '⚙️',
        }}
      />
    </Tab.Navigator>
  );
};

// Root App Component
export default function CompleteIntegrationApp() {
  const [isReady, setIsReady] = useState(false);

  const handleSDKReady = (sdk) => {
    console.log('VC-SDK is fully ready with all features!', sdk);
    setIsReady(true);
    
    // Initialize additional services
    const validationService = new ValidationService();
    const issuerService = new IssuerService();
    
    // Set up event listeners
    validationService.on('validationCompleted', (data) => {
      console.log('Credential validated:', data);
    });
    
    issuerService.on('issuanceComplete', (data) => {
      console.log('Credential issued:', data);
    });
  };

  const handleSDKError = (error) => {
    console.error('VC-SDK initialization error:', error);
  };

  if (!isReady) {
    return (
      <VCSDKProvider 
        config={sdkConfig}
        onReady={handleSDKReady}
        onError={handleSDKError}
      >
        <LoadingScreen message="Initializing Complete Digital Wallet..." />
      </VCSDKProvider>
    );
  }

  return (
    <VCSDKProvider 
      config={sdkConfig}
      onReady={handleSDKReady}
      onError={handleSDKError}
    >
      <NavigationContainer>
        <MainTabNavigator />
      </NavigationContainer>
    </VCSDKProvider>
  );
}

// Usage Examples and Integration Patterns:

/*
1. COMPLETE WALLET FUNCTIONALITY:
   - Authentication with biometrics
   - Full credential management
   - Search and filtering
   - Credential actions (pin, share, delete)

2. ISSUER INTEGRATION:
   - Discover trusted issuers
   - Browse credential types
   - Multiple authentication methods
   - Complete issuance flow

3. VALIDATION SERVICES:
   - Real-time credential validation
   - Custom validation rules
   - Batch processing
   - Trust verification

4. ENHANCED SCANNING:
   - QR code credential sharing
   - Face verification
   - Credential validation on receipt
   - Multiple sharing protocols

5. COMPREHENSIVE SETTINGS:
   - Biometric management
   - Backup & restore
   - Storage optimization
   - Security settings

INTEGRATION EXAMPLES:

// Hook-based credential management
const { credentials, addCredential, deleteCredential, updateCredential } = useCredentials({
  filters: { type: 'DriverLicense', status: 'valid' }
});

// Service-based issuer integration
const issuerService = new IssuerService();
const issuers = await issuerService.discoverIssuers({
  category: 'Government ID',
  trustLevel: 'high'
});

// Validation service integration
const validationService = new ValidationService();
const result = await validationService.validateCredential(credential, {
  strictMode: true,
  includeSuggestions: true
});

// Complete UI component integration
<VCSDKProvider config={sdkConfig}>
  <AllCredentialsScreen 
    enableSearch={true}
    enableFilters={true}
    enableActions={true}
    onCredentialSelect={(vc) => console.log(vc)}
  />
</VCSDKProvider>
*/