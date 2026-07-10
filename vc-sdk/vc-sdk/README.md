# VC-SDK Integration Guide

A focused guide for integrating the VC-SDK IssuerScreen component into any React Native application for local development.

## 📋 Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)  
- [Local Installation](#local-installation)
- [Quick Start](#quick-start)
- [IssuerScreen API](#issuerscreen-api)
- [Configuration](#configuration)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Support](#support)

## 🔍 Overview

The VC-SDK provides a ready-to-use **IssuerScreen** component that displays credential issuers in a beautiful, professional interface. Perfect for local development and testing:

- **🏛️ Issuer Discovery**: Automatically fetch and display available credential issuers
- **📱 Drop-in Component**: Ready-to-use IssuerScreen with zero configuration
- **🌐 Network Resilient**: Built-in fallback to mock data when API is unavailable
- **🎨 Professional UI**: Beautiful card-based layout with issuer branding
- **🔄 Live Development**: Hot reloading for immediate feedback

## ✅ Prerequisites

- React Native >= 0.70.0
- React >= 18.0.0
- Node.js >= 16.0.0
- TypeScript support (recommended)

## 📦 Local Installation

### Step 1: Add File Dependency
In your React Native app's `package.json`, add the local SDK dependency:

```json
{
  "name": "YourApp",
  "dependencies": {
    "react": "19.1.0",
    "react-native": "0.81.1",
    "vcsdk": "file:../vc-sdk"
  }
}
```

### Step 2: Install Dependencies
```bash
npm install
# or
yarn install
```

### Step 3: Configure Metro for Local Development
Create or update `metro.config.js` in your app root:

```javascript
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const config = {
  resolver: {
    // Prevent React version conflicts
    alias: {
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-native': path.resolve(__dirname, 'node_modules/react-native'),
    },
    // Module resolution paths
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, '../vc-sdk/node_modules'),
    ],
  },
  // Watch SDK folder for live reloading
  watchFolders: [
    path.resolve(__dirname, '../vc-sdk'),
  ],
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
```

### Step 4: Build the SDK (if needed)
```bash
cd ../vc-sdk
npm run prepare
```

That's it! No additional platform setup required - the SDK will automatically link.

## 🚀 Quick Start

### Minimal Integration (Just 3 lines!)

```typescript
import React from 'react';
import { SafeAreaView } from 'react-native';
import { IssuerScreen } from 'vcsdk';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <IssuerScreen />
    </SafeAreaView>
  );
}
```

That's it! The IssuerScreen will:
- ✅ Automatically fetch issuers from the configured API
- ✅ Display beautiful issuer cards with logos and branding
- ✅ Show loading states while fetching
- ✅ Fallback to mock data if network fails
- ✅ Handle all error states gracefully

### What You Get Out of the Box

The IssuerScreen displays:
- **Issuer Cards**: Professional cards with organization logos
- **Branding**: Custom background colors and text colors per issuer
- **Protocol Info**: Shows OpenID4VCI or OTP protocol support
- **Trust Status**: Clear indicators for trusted vs non-trusted issuers
- **Loading States**: Smooth loading animations
- **Error Handling**: Automatic fallback when network fails

## 📚 IssuerScreen API

### `IssuerScreen` Component

The main and only component you need - a complete, ready-to-use screen for displaying credential issuers.

```typescript
import { IssuerScreen } from 'vcsdk';

<IssuerScreen />
```

#### Features:
- **🔄 Automatic Data Fetching**: Connects to API and fetches available issuers
- **🎨 Beautiful UI**: Professional card-based layout with issuer branding
- **📱 Responsive Design**: Works perfectly on all screen sizes
- **⚡ Loading States**: Smooth loading indicators while fetching data
- **🔒 Network Resilient**: Automatically falls back to mock data when offline
- **🏢 Issuer Branding**: Displays custom logos, colors, and descriptions
- **✅ Trust Indicators**: Clear visual indicators for trusted issuers
- **📋 Protocol Support**: Shows OpenID4VCI and OTP protocol information

#### Props:
The IssuerScreen component currently works with zero configuration - just drop it in and it works!

### Internal Types (For Reference)

#### `Issuer`
```typescript
interface Issuer {
  issuer_id: string;           // Unique identifier for the issuer
  display: IssuerDisplay[];    // Display information (logos, colors, text)
  protocol: 'OTP' | 'OpenID4VCI';  // Supported authentication protocol
  credential_types?: string[]; // Available credential types from this issuer
  trusted: boolean;            // Whether this issuer is trusted/verified
}
```

#### `IssuerDisplay`
```typescript
interface IssuerDisplay {
  title: string;              // Issuer name/title
  description?: string;       // Description of the issuer
  logo_url?: string;         // URL to issuer's logo image
  background_color?: string; // Card background color (hex)
  text_color?: string;       // Text color for the card (hex)
}
```

### Data Flow

```
API Request → Network Check → Success? → Display Issuers
                           → Failure? → Display Mock Data
```

The IssuerScreen handles all of this automatically - you don't need to manage any of these states manually.

## ⚙️ Configuration

### Zero Configuration Required! 

The IssuerScreen works out of the box with **no configuration needed**. It:

- Uses a built-in API endpoint for fetching issuers
- Automatically handles network failures with mock data fallback
- Provides beautiful default styling that looks professional
- Manages all loading and error states internally

### Styling (Optional)

You can customize the container around the IssuerScreen:

```typescript
import React from 'react';
import { View } from 'react-native';
import { IssuerScreen } from 'vcsdk';

export default function App() {
  return (
    <View style={{ 
      flex: 1, 
      backgroundColor: '#f5f5f5' // Custom background
    }}>
      <IssuerScreen />
    </View>
  );
}
```

### Network Behavior

The SDK automatically:
- **Fetches real data** from the government credential API
- **Falls back to mock data** if network fails
- **Shows loading states** while fetching
- **Handles errors gracefully** without crashing your app

You don't need to handle any of this - it's all built in!

## 📝 Examples

### Example 1: Basic App Integration
```typescript
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { IssuerScreen } from 'vcsdk';

const App = () => (
  <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
    <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
    <IssuerScreen />
  </SafeAreaView>
);

export default App;
```

### Example 2: With Custom Container Styling
```typescript
import React from 'react';
import { View } from 'react-native';
import { IssuerScreen } from 'vcsdk';

const CustomStyledApp = () => (
  <View style={{ 
    flex: 1, 
    backgroundColor: '#ffffff',
    paddingTop: 50 // Add some top padding
  }}>
    <IssuerScreen />
  </View>
);

export default CustomStyledApp;
```

### Example 3: Navigation Integration (React Navigation)
```typescript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { IssuerScreen } from 'vcsdk';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen 
        name="Issuers" 
        component={IssuerScreen}
        options={{ 
          title: 'Credential Issuers',
          headerStyle: { backgroundColor: '#007AFF' },
          headerTintColor: '#fff'
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
```

### That's All You Need!

The IssuerScreen component handles everything else:
- ✅ **Data fetching** from the credential API
- ✅ **Loading states** while data loads  
- ✅ **Error handling** when network fails
- ✅ **Beautiful UI** with issuer branding
- ✅ **Responsive design** for all devices

Just drop it in and you're done!

## 🔧 Troubleshooting

### Common Issues

#### 1. IssuerScreen Not Appearing
**Problem:** The IssuerScreen component appears blank or doesn't render.

**Solution:**
- Ensure the container has proper flex styling:
```typescript
// ✅ Correct
<View style={{ flex: 1 }}>
  <IssuerScreen />
</View>

// ❌ Wrong - no space allocated
<View>
  <IssuerScreen />
</View>
```

#### 2. "Module Not Found" Error
**Problem:** Getting import errors when trying to use `IssuerScreen`.

**Solution:**
- Check that you installed the SDK: `npm install` or `yarn install`
- Verify the file path in package.json points to the correct SDK location
- Make sure Metro configuration is properly set up

```typescript
// ✅ Correct import
import { IssuerScreen } from 'vcsdk';

// ❌ Wrong import path
import { IssuerScreen } from '../vc-sdk';
```

#### 3. Metro Bundler Issues
**Problem:** Metro can't resolve the SDK or hot reloading isn't working.

**Solution:**
- Clear Metro cache: `npx react-native start --reset-cache`
- Ensure `metro.config.js` is properly configured (see Installation section)
- Restart the development server

#### 4. Network Issues
**Problem:** No issuers showing or stuck on loading.

**Solution:**
- Check your device/emulator internet connection
- The SDK automatically falls back to mock data when network fails
- Check console logs for network error messages

### Quick Debug Checklist

If IssuerScreen isn't working:

1. ✅ **Container has flex: 1**
2. ✅ **SDK properly installed** (`npm install` completed)
3. ✅ **Metro config setup** (for local development)
4. ✅ **No import errors** in console
5. ✅ **Internet connection** available

### Console Logs

The SDK automatically logs helpful information to the console:
- API requests and responses
- Fallback to mock data events  
- Loading states and error conditions

Check your React Native debugger console for detailed information.

## 📝 Examples

### Example 1: Basic Integration
```typescript
import React from 'react';
import { SafeAreaView } from 'react-native';
import { IssuerScreen } from 'vcsdk';

const App = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <IssuerScreen />
  </SafeAreaView>
);

export default App;
```

### Example 2: Custom UI with SDK Data
```typescript
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { fetchIssuers, Issuer } from 'vcsdk';

const CustomIssuersView = () => {
  const [issuers, setIssuers] = useState<Issuer[]>([]);

  useEffect(() => {
    fetchIssuers().then(setIssuers);
  }, []);

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Credential Issuers
      </Text>
      {issuers.map((issuer) => (
        <View key={issuer.issuer_id} style={{ 
          backgroundColor: issuer.display[0].background_color || '#fff',
          padding: 16, 
          marginBottom: 16, 
          borderRadius: 8 
        }}>
          <Text style={{ 
            color: issuer.display[0].text_color || '#000',
            fontSize: 18,
            fontWeight: 'bold' 
          }}>
            {issuer.display[0].title}
          </Text>
          <Text style={{ color: issuer.display[0].text_color || '#666' }}>
            {issuer.display[0].description}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};
```

### Example 3: Navigation Integration (React Navigation)
```typescript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { IssuerScreen } from 'vcsdk';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen 
        name="Issuers" 
        component={IssuerScreen}
        options={{ title: 'Credential Issuers' }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
```

## 🆘 Support

### Getting Help
- **GitHub Issues**: [Report issues](https://github.com/pankaj7121993/vcsdk/issues)
- **Email Support**: pankajchaudhary7121994@gmail.com

### When Reporting Issues
Please include:
- React Native version
- Platform (iOS/Android)
- Error messages from console
- Code snippet showing how you're using IssuerScreen

### Version Compatibility

| VC-SDK Version | React Native | React |
|---------------|--------------|-------|
| 0.1.x         | >= 0.70.0    | >= 18.0.0 |

---

## 📄 Quick Summary

**What you get:** A beautiful, ready-to-use screen that displays credential issuers

**What you need to do:** 
1. Add `"vcsdk": "file:../vc-sdk"` to package.json
2. Run `npm install`
3. Configure metro.config.js
4. Import and use `<IssuerScreen />`

**What it does automatically:**
- ✅ Fetches issuer data from API
- ✅ Shows beautiful issuer cards with branding  
- ✅ Handles loading states and errors
- ✅ Falls back to mock data when offline
- ✅ Provides professional UI out of the box

---

**Happy Coding! 🚀**
