#!/usr/bin/env node
/**
 * Deployment Validation Script for Kroi Auto Center
 * Tests critical functionality after deployment
 */

const https = require('https');
const http = require('http');

class DeploymentValidator {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.results = [];
  }

  async validateEndpoint(path, expectedStatus = 200, description = '') {
    return new Promise((resolve) => {
      const url = `${this.baseUrl}${path}`;
      const client = this.baseUrl.startsWith('https') ? https : http;

      const startTime = Date.now();
      const req = client.get(url, (res) => {
        const responseTime = Date.now() - startTime;
        const result = {
          path,
          description: description || path,
          status: res.statusCode,
          expected: expectedStatus,
          responseTime,
          success: res.statusCode === expectedStatus,
          headers: res.headers
        };

        this.results.push(result);
        resolve(result);
      });

      req.on('error', (error) => {
        const result = {
          path,
          description: description || path,
          status: 'ERROR',
          expected: expectedStatus,
          responseTime: Date.now() - startTime,
          success: false,
          error: error.message
        };

        this.results.push(result);
        resolve(result);
      });

      req.setTimeout(10000, () => {
        req.destroy();
        const result = {
          path,
          description: description || path,
          status: 'TIMEOUT',
          expected: expectedStatus,
          responseTime: 10000,
          success: false,
          error: 'Request timeout'
        };

        this.results.push(result);
        resolve(result);
      });
    });
  }

  async runValidation() {
    console.log(`🚀 Starting deployment validation for: ${this.baseUrl}`);
    console.log('=' .repeat(60));

    // Core pages validation
    await this.validateEndpoint('/', 200, 'Homepage');
    await this.validateEndpoint('/autot', 200, 'Cars listing page');
    await this.validateEndpoint('/palvelut', 200, 'Services page');
    await this.validateEndpoint('/rahoitus', 200, 'Financing page');
    await this.validateEndpoint('/tietoa', 200, 'About page');
    await this.validateEndpoint('/yhteystiedot', 200, 'Contact page');

    // SEO and technical pages
    await this.validateEndpoint('/sitemap.xml', 200, 'SEO Sitemap');
    await this.validateEndpoint('/robots.txt', 200, 'Robots.txt');

    // Static assets
    await this.validateEndpoint('/favicon.ico', 200, 'Favicon');

    // API routes (if any)
    await this.validateEndpoint('/api/health', 200, 'Health check API');

    this.generateReport();
  }

  generateReport() {
    console.log('\n📊 DEPLOYMENT VALIDATION REPORT');
    console.log('=' .repeat(60));

    const successful = this.results.filter(r => r.success).length;
    const total = this.results.length;
    const successRate = ((successful / total) * 100).toFixed(1);

    console.log(`✅ Success Rate: ${successRate}% (${successful}/${total})`);
    console.log('');

    // Detailed results
    this.results.forEach(result => {
      const icon = result.success ? '✅' : '❌';
      const status = result.status === 'ERROR' || result.status === 'TIMEOUT'
        ? result.status
        : `HTTP ${result.status}`;

      console.log(`${icon} ${result.description}`);
      console.log(`   Status: ${status} | Response: ${result.responseTime}ms`);

      if (!result.success && result.error) {
        console.log(`   Error: ${result.error}`);
      }

      // Check for important headers
      if (result.headers) {
        if (result.headers['cache-control']) {
          console.log(`   Cache: ${result.headers['cache-control']}`);
        }
        if (result.headers['content-encoding']) {
          console.log(`   Compression: ${result.headers['content-encoding']}`);
        }
      }
      console.log('');
    });

    // Performance summary
    const avgResponseTime = this.results
      .filter(r => r.responseTime > 0)
      .reduce((sum, r) => sum + r.responseTime, 0) /
      this.results.filter(r => r.responseTime > 0).length;

    console.log(`📈 Average Response Time: ${avgResponseTime.toFixed(0)}ms`);

    // Recommendations
    console.log('\n💡 RECOMMENDATIONS:');

    if (successRate < 100) {
      console.log('- Fix failed endpoints before production traffic');
    }

    if (avgResponseTime > 2000) {
      console.log('- Consider optimizing response times (target: <2s)');
    }

    const slowEndpoints = this.results.filter(r => r.responseTime > 3000);
    if (slowEndpoints.length > 0) {
      console.log(`- Optimize slow endpoints: ${slowEndpoints.map(r => r.path).join(', ')}`);
    }

    console.log('\n🎉 Validation complete!');
    return { successRate, avgResponseTime, results: this.results };
  }
}

// CLI usage
if (require.main === module) {
  const baseUrl = process.argv[2] || 'http://localhost:3000';
  const validator = new DeploymentValidator(baseUrl);
  validator.runValidation().catch(console.error);
}

module.exports = DeploymentValidator;