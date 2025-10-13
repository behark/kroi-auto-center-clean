#!/usr/bin/env node
/**
 * Quick monitoring test for current automotive deployments
 */

const https = require('https');

const deployments = [
  {
    name: 'Kroi Auto Center (Current)',
    url: 'https://kroi-auto-center.onrender.com',
    priority: 'HIGH'
  },
  {
    name: 'AUTO ANI Website',
    url: 'https://auto-ani-website.onrender.com',
    priority: 'MEDIUM'
  },
  {
    name: 'Car Wash (Kiiltoloisto)',
    url: 'https://kiiltoloisto-fi.onrender.com',
    priority: 'LOW'
  }
];

async function testDeployment(deployment) {
  return new Promise((resolve) => {
    const startTime = Date.now();

    const req = https.get(deployment.url, (res) => {
      const responseTime = Date.now() - startTime;

      resolve({
        ...deployment,
        status: res.statusCode,
        responseTime,
        success: res.statusCode >= 200 && res.statusCode < 400
      });
    });

    req.on('error', (error) => {
      resolve({
        ...deployment,
        status: 'ERROR',
        responseTime: Date.now() - startTime,
        success: false,
        error: error.message
      });
    });

    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        ...deployment,
        status: 'TIMEOUT',
        responseTime: 10000,
        success: false,
        error: 'Request timeout'
      });
    });
  });
}

async function runQuickMonitor() {
  console.log('🚗 AUTOMOTIVE DEPLOYMENTS - QUICK STATUS CHECK');
  console.log('='.repeat(60));
  console.log('');

  const results = [];

  for (const deployment of deployments) {
    console.log(`🔍 Testing: ${deployment.name} [${deployment.priority}]`);
    const result = await testDeployment(deployment);
    results.push(result);

    const icon = result.success ? '✅' : '❌';
    const status = result.status === 'ERROR' || result.status === 'TIMEOUT'
      ? result.status
      : `HTTP ${result.status}`;

    console.log(`   ${icon} Status: ${status} | Response: ${result.responseTime}ms`);

    if (!result.success && result.error) {
      console.log(`   ⚠️  Error: ${result.error}`);
    }
    console.log('');
  }

  // Summary
  const successful = results.filter(r => r.success).length;
  const total = results.length;
  const successRate = ((successful / total) * 100).toFixed(1);
  const avgResponseTime = results
    .filter(r => r.responseTime > 0)
    .reduce((sum, r) => sum + r.responseTime, 0) / results.filter(r => r.responseTime > 0).length;

  console.log('📊 SUMMARY');
  console.log('-'.repeat(30));
  console.log(`✅ Success Rate: ${successRate}% (${successful}/${total})`);
  console.log(`📈 Avg Response Time: ${avgResponseTime.toFixed(0)}ms`);
  console.log('');

  // Recommendations
  console.log('💡 RECOMMENDATIONS:');
  if (successRate < 100) {
    console.log('- Deploy new Kroi Auto Center Clean for better performance');
  }
  if (avgResponseTime > 2000) {
    console.log('- Current response times exceed target (<2s)');
  }
  console.log('- Set up comprehensive monitoring dashboard');
  console.log('- Consider unified Sanity CMS architecture');

  return results;
}

if (require.main === module) {
  runQuickMonitor().catch(console.error);
}

module.exports = { runQuickMonitor };