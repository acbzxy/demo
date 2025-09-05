/**
 * Script test để kiểm tra API endpoints đã được fix
 * Chạy: node test-fixed-api.js
 */

const https = require('https');
const http = require('http');

// Test endpoints
const API_BASE = 'http://10.14.122.24:8081/CRM_BE';
const testEndpoints = [
  { 
    url: `${API_BASE}/api/tokhai-thongtin/all`,
    name: 'Tờ khai thông tin - All',
    method: 'GET'
  },
  { 
    url: `${API_BASE}/swagger-ui/index.html`,
    name: 'Swagger UI',
    method: 'GET'
  }
];

// Helper function to make HTTP request
function makeRequest(url, method = 'GET', timeout = 5000) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https:') ? https : http;
    const urlObj = new URL(url);
    
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname + urlObj.search,
      method: method,
      timeout: timeout,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'Thu-Phi-HCM-Test/1.0'
      }
    };

    const req = client.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve({
          status: res.statusCode,
          statusMessage: res.statusMessage,
          headers: res.headers,
          data: data.substring(0, 500) // Limit output
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.end();
  });
}

// Test function
async function testAPI() {
  console.log('🔍 Testing CRM API endpoints...\n');

  for (const endpoint of testEndpoints) {
    try {
      console.log(`📡 Testing: ${endpoint.name}`);
      console.log(`   URL: ${endpoint.url}`);
      
      const startTime = Date.now();
      const result = await makeRequest(endpoint.url, endpoint.method);
      const duration = Date.now() - startTime;
      
      if (result.status === 200) {
        console.log(`   ✅ SUCCESS - Status: ${result.status} (${duration}ms)`);
        if (endpoint.name.includes('Tờ khai')) {
          // Parse JSON to show data structure
          try {
            const jsonData = JSON.parse(result.data);
            console.log(`   📊 Data structure:`, {
              status: jsonData.status,
              message: jsonData.message,
              dataLength: jsonData.data?.length || 0,
              timestamp: jsonData.timestamp
            });
          } catch (e) {
            console.log(`   📄 Response preview: ${result.data.substring(0, 100)}...`);
          }
        }
      } else {
        console.log(`   ❌ FAILED - Status: ${result.status} ${result.statusMessage}`);
        console.log(`   📄 Response: ${result.data.substring(0, 200)}...`);
      }
      
    } catch (error) {
      console.log(`   💥 ERROR: ${error.message}`);
    }
    
    console.log(''); // Empty line
  }

  console.log('🏁 Test completed!');
  console.log('\n🎯 Next steps if API works:');
  console.log('1. Open browser to http://localhost:5173');
  console.log('2. Navigate to Declare page');
  console.log('3. Check if data loads without 404 errors');
}

// Run test
testAPI().catch(console.error);
