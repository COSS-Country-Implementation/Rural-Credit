/**
 * Test script for OpenID4VCI service
 * This tests the complete flow from well-known discovery to credential request validation
 */

// Import the OpenID4VCI service
import openID4VCIService from '../src/services/OpenID4VCIService';

// Mock issuer data (from the real INJI system)
const testIssuers = [
  {
    issuer_id: 'INCRA',
    display: [{ name: 'INCRA - Instituto Nacional de Colonização e Reforma Agrária' }],
    wellknown_endpoint: 'https://vcdemo.crabdance.com/.well-known/openid-credential-issuer'
  },
  {
    issuer_id: 'MGI',
    display: [{ name: 'MGI - Ministério da Gestão e da Inovação' }],
    wellknown_endpoint: 'https://vcdemo.crabdance.com/.well-known/openid-credential-issuer'
  }
];

// Mock individual data for testing
const testIndividualData = {
  individualId: '1234567890123456',
  individualIdType: 'UIN',
  otp: '123456',
  transactionID: '1234567890'
};

/**
 * Test 1: Well-known endpoint discovery
 */
async function testWellKnownDiscovery() {
  console.log('\n🧪 Test 1: Well-known endpoint discovery');
  console.log('='.repeat(50));

  try {
    for (const issuer of testIssuers) {
      console.log(`\nTesting issuer: ${issuer.issuer_id}`);

      const capabilities = await openID4VCIService.discoverIssuerCapabilities(issuer);

      console.log('✅ Well-known discovery successful:', {
        credentialIssuer: capabilities.credential_issuer,
        supportedCredentials: Object.keys(capabilities.credential_configurations_supported || {}),
        hasCredentialEndpoint: !!capabilities.credential_endpoint,
        hasAuthorizationServer: !!capabilities.authorization_server
      });
    }
  } catch (error) {
    console.error('❌ Well-known discovery failed:', error.message);
    throw error;
  }
}

/**
 * Test 2: Authorization server validation
 */
async function testAuthorizationServerValidation() {
  console.log('\n🧪 Test 2: Authorization server validation');
  console.log('='.repeat(50));

  try {
    const issuer = testIssuers[0];
    const wellKnownData = await openID4VCIService.discoverIssuerCapabilities(issuer);
    const authValidation = await openID4VCIService.validateAuthorizationServer(wellKnownData);

    console.log('✅ Authorization server validation successful:', {
      isValid: authValidation.isValid,
      usePreConfiguredAuth: authValidation.usePreConfiguredAuth,
      authServer: authValidation.authServer
    });
  } catch (error) {
    console.error('❌ Authorization server validation failed:', error.message);
    throw error;
  }
}

/**
 * Test 3: Available credentials discovery
 */
async function testAvailableCredentialsDiscovery() {
  console.log('\n🧪 Test 3: Available credentials discovery');
  console.log('='.repeat(50));

  try {
    for (const issuer of testIssuers) {
      console.log(`\nTesting credentials for issuer: ${issuer.issuer_id}`);

      const capabilities = await openID4VCIService.getAvailableCredentials(issuer);

      console.log('✅ Credentials discovery successful:', {
        issuer: issuer.issuer_id,
        totalCredentials: capabilities.credentials.length,
        credentialTypes: capabilities.credentials.map(c => ({
          id: c.id,
          name: c.name,
          format: c.format
        })),
        authValid: capabilities.authValidation.isValid
      });
    }
  } catch (error) {
    console.error('❌ Credentials discovery failed:', error.message);
    throw error;
  }
}

/**
 * Test 4: Credential request validation
 */
async function testCredentialRequestValidation() {
  console.log('\n🧪 Test 4: Credential request validation');
  console.log('='.repeat(50));

  try {
    const issuer = testIssuers[0];
    const capabilities = await openID4VCIService.getAvailableCredentials(issuer);

    if (capabilities.credentials.length === 0) {
      console.log('⚠️ No credentials available for validation test');
      return;
    }

    const credentialType = capabilities.credentials[0];
    console.log(`\nTesting validation for credential: ${credentialType.id}`);

    const validation = await openID4VCIService.validateCredentialRequest(issuer, credentialType, testIndividualData);

    console.log('✅ Credential request validation successful:', {
      isValid: validation.isValid,
      credentialId: validation.credentialConfig.id,
      credentialFormat: validation.credentialConfig.format,
      authServerValid: validation.issuerCapabilities.authValidation.isValid
    });
  } catch (error) {
    console.error('❌ Credential request validation failed:', error.message);
    throw error;
  }
}

/**
 * Test 5: Invalid data validation
 */
async function testInvalidDataValidation() {
  console.log('\n🧪 Test 5: Invalid data validation');
  console.log('='.repeat(50));

  try {
    const issuer = testIssuers[0];
    const capabilities = await openID4VCIService.getAvailableCredentials(issuer);

    if (capabilities.credentials.length === 0) {
      console.log('⚠️ No credentials available for invalid data test');
      return;
    }

    const credentialType = capabilities.credentials[0];

    // Test with invalid individual data
    const invalidData = {
      individualId: '123', // Too short
      individualIdType: 'UIN',
      otp: '12345' // Too short
    };

    console.log(`\nTesting validation with invalid data for credential: ${credentialType.id}`);

    try {
      await openID4VCIService.validateCredentialRequest(issuer, credentialType, invalidData);
      console.error('❌ Validation should have failed but didn\'t');
    } catch (validationError) {
      console.log('✅ Validation correctly rejected invalid data:', validationError.message);
    }
  } catch (error) {
    console.error('❌ Invalid data validation test failed:', error.message);
    throw error;
  }
}

/**
 * Run all tests
 */
async function runAllTests() {
  console.log('🚀 Starting OpenID4VCI Service Tests');
  console.log('='.repeat(60));

  try {
    await testWellKnownDiscovery();
    await testAuthorizationServerValidation();
    await testAvailableCredentialsDiscovery();
    await testCredentialRequestValidation();
    await testInvalidDataValidation();

    console.log('\n🎉 All OpenID4VCI tests completed successfully!');
    console.log('='.repeat(60));

    return true;
  } catch (error) {
    console.error('\n💥 OpenID4VCI tests failed:', error.message);
    console.log('='.repeat(60));
    return false;
  }
}

// Export the test functions
export {
  testWellKnownDiscovery,
  testAuthorizationServerValidation,
  testAvailableCredentialsDiscovery,
  testCredentialRequestValidation,
  testInvalidDataValidation,
  runAllTests
};

// Auto-run tests if this file is executed directly
if (typeof require !== 'undefined' && require.main === module) {
  runAllTests();
}