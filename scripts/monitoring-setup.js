#!/usr/bin/env node
/**
 * Comprehensive Monitoring Setup for Automotive Projects
 * Sets up monitoring for Kroi Auto Center, AUTO ANI, and Car Wash Clean
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

class AutomotiveMonitoringSetup {
  constructor() {
    this.projects = {
      'kroi-auto-center': {
        name: 'Kroi Auto Center',
        url: 'https://kroi-auto-center-clean.onrender.com',
        priority: 1,
        cms: 'sanity',
        healthChecks: [
          '/',
          '/autot',
          '/palvelut',
          '/rahoitus',
          '/tietoa',
          '/yhteystiedot',
          '/sitemap.xml'
        ]
      },
      'auto-ani': {
        name: 'AUTO ANI',
        url: 'https://auto-ani.onrender.com',
        priority: 2,
        cms: 'prisma',
        healthChecks: [
          '/',
          '/vehicles',
          '/api/health',
          '/api/auth/session',
          '/dashboard'
        ]
      },
      'car-wash': {
        name: 'Car Wash Clean',
        url: 'https://car-wash-clean.onrender.com',
        priority: 3,
        cms: 'sanity',
        healthChecks: [
          '/',
          '/services',
          '/booking',
          '/contact'
        ]
      }
    };

    this.monitoringConfig = {
      interval: 30000, // 30 seconds
      timeout: 10000,  // 10 seconds
      retries: 3,
      alertThreshold: 2 // Alert after 2 consecutive failures
    };

    this.metrics = {
      uptime: {},
      responseTime: {},
      errors: {},
      lastCheck: {}
    };

    this.startTime = Date.now();
  }

  async initializeMonitoring() {
    console.log('🚀 Initializing Automotive Projects Monitoring');
    console.log('='.repeat(60));

    // Create monitoring logs directory
    const logsDir = path.join(process.cwd(), 'monitoring-logs');
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir, { recursive: true });
    }

    // Initialize metrics for each project
    Object.keys(this.projects).forEach(projectKey => {
      this.metrics.uptime[projectKey] = { up: 0, down: 0 };
      this.metrics.responseTime[projectKey] = [];
      this.metrics.errors[projectKey] = [];
      this.metrics.lastCheck[projectKey] = null;
    });

    console.log('✅ Monitoring initialized for all projects');
    this.startMonitoringLoop();
  }

  async checkHealth(projectKey, project) {
    const results = [];

    for (const endpoint of project.healthChecks) {
      const result = await this.checkEndpoint(project.url + endpoint);
      results.push({
        endpoint,
        ...result
      });
    }

    return {
      projectKey,
      projectName: project.name,
      timestamp: new Date().toISOString(),
      results,
      overallHealth: results.every(r => r.success),
      avgResponseTime: results.reduce((sum, r) => sum + (r.responseTime || 0), 0) / results.length
    };
  }

  async checkEndpoint(url) {
    return new Promise((resolve) => {
      const startTime = Date.now();
      const client = url.startsWith('https') ? https : require('http');

      const req = client.get(url, (res) => {
        const responseTime = Date.now() - startTime;

        resolve({
          success: res.statusCode >= 200 && res.statusCode < 400,
          statusCode: res.statusCode,
          responseTime,
          headers: res.headers
        });
      });

      req.on('error', (error) => {
        resolve({
          success: false,
          error: error.message,
          responseTime: Date.now() - startTime
        });
      });

      req.setTimeout(this.monitoringConfig.timeout, () => {
        req.destroy();
        resolve({
          success: false,
          error: 'Request timeout',
          responseTime: this.monitoringConfig.timeout
        });
      });
    });
  }

  async startMonitoringLoop() {
    console.log(`🔄 Starting monitoring loop (${this.monitoringConfig.interval/1000}s interval)`);
    console.log('');

    setInterval(async () => {
      await this.runHealthChecks();
    }, this.monitoringConfig.interval);

    // Run initial check
    await this.runHealthChecks();
  }

  async runHealthChecks() {
    const checkTime = new Date().toISOString();
    console.log(`🔍 Health Check - ${checkTime}`);
    console.log('-'.repeat(60));

    const allResults = [];

    // Run checks for all projects in parallel
    const checkPromises = Object.entries(this.projects).map(([key, project]) =>
      this.checkHealth(key, project)
    );

    const results = await Promise.all(checkPromises);

    results.forEach(result => {
      this.updateMetrics(result);
      this.displayHealthStatus(result);
      allResults.push(result);
    });

    // Log to file
    this.logResults(allResults);

    console.log('');
  }

  updateMetrics(result) {
    const { projectKey, overallHealth, avgResponseTime, results } = result;

    // Update uptime metrics
    if (overallHealth) {
      this.metrics.uptime[projectKey].up++;
    } else {
      this.metrics.uptime[projectKey].down++;

      // Log errors
      const errors = results.filter(r => !r.success);
      this.metrics.errors[projectKey].push({
        timestamp: new Date().toISOString(),
        errors
      });
    }

    // Update response time
    this.metrics.responseTime[projectKey].push(avgResponseTime);

    // Keep only last 100 response times
    if (this.metrics.responseTime[projectKey].length > 100) {
      this.metrics.responseTime[projectKey].shift();
    }

    this.metrics.lastCheck[projectKey] = result.timestamp;
  }

  displayHealthStatus(result) {
    const { projectKey, projectName, overallHealth, avgResponseTime, results } = result;
    const project = this.projects[projectKey];

    const healthIcon = overallHealth ? '✅' : '❌';
    const priorityBadge = `P${project.priority}`;

    console.log(`${healthIcon} [${priorityBadge}] ${projectName}`);
    console.log(`   URL: ${project.url}`);
    console.log(`   Avg Response: ${avgResponseTime.toFixed(0)}ms`);

    // Show failed endpoints
    const failedEndpoints = results.filter(r => !r.success);
    if (failedEndpoints.length > 0) {
      console.log(`   ⚠️  Failed endpoints: ${failedEndpoints.map(r => r.endpoint).join(', ')}`);
    }

    // Show uptime percentage
    const uptime = this.metrics.uptime[projectKey];
    const total = uptime.up + uptime.down;
    const uptimePercent = total > 0 ? ((uptime.up / total) * 100).toFixed(2) : '100.00';
    console.log(`   📊 Uptime: ${uptimePercent}% (${uptime.up}/${total})`);

    console.log('');
  }

  logResults(results) {
    const logFile = path.join(process.cwd(), 'monitoring-logs', 'health-checks.log');
    const logEntry = {
      timestamp: new Date().toISOString(),
      results
    };

    fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
  }

  generateDashboard() {
    console.log('📊 AUTOMOTIVE PROJECTS MONITORING DASHBOARD');
    console.log('='.repeat(70));

    const runTime = Date.now() - this.startTime;
    const runTimeMinutes = Math.floor(runTime / 60000);

    console.log(`⏱️  Monitoring Runtime: ${runTimeMinutes} minutes`);
    console.log('');

    Object.entries(this.projects).forEach(([key, project]) => {
      const uptime = this.metrics.uptime[key];
      const responseTimes = this.metrics.responseTime[key];
      const errors = this.metrics.errors[key];

      const total = uptime.up + uptime.down;
      const uptimePercent = total > 0 ? ((uptime.up / total) * 100).toFixed(2) : '100.00';

      const avgResponseTime = responseTimes.length > 0
        ? responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length
        : 0;

      console.log(`🚗 ${project.name} (Priority ${project.priority})`);
      console.log(`   📈 Uptime: ${uptimePercent}% (${uptime.up} up, ${uptime.down} down)`);
      console.log(`   ⚡ Avg Response: ${avgResponseTime.toFixed(0)}ms`);
      console.log(`   ❌ Errors: ${errors.length} incidents`);
      console.log(`   🔗 URL: ${project.url}`);
      console.log('');
    });
  }

  // Export metrics for external monitoring tools
  exportMetrics() {
    const exportData = {
      timestamp: new Date().toISOString(),
      runtime: Date.now() - this.startTime,
      projects: {}
    };

    Object.keys(this.projects).forEach(key => {
      const uptime = this.metrics.uptime[key];
      const responseTimes = this.metrics.responseTime[key];
      const total = uptime.up + uptime.down;

      exportData.projects[key] = {
        name: this.projects[key].name,
        url: this.projects[key].url,
        priority: this.projects[key].priority,
        uptimePercent: total > 0 ? ((uptime.up / total) * 100) : 100,
        totalChecks: total,
        avgResponseTime: responseTimes.length > 0
          ? responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length
          : 0,
        errorCount: this.metrics.errors[key].length,
        lastCheck: this.metrics.lastCheck[key]
      };
    });

    const exportFile = path.join(process.cwd(), 'monitoring-logs', 'metrics-export.json');
    fs.writeFileSync(exportFile, JSON.stringify(exportData, null, 2));

    return exportData;
  }
}

// CLI usage
if (require.main === module) {
  const monitor = new AutomotiveMonitoringSetup();

  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down monitoring...');
    monitor.generateDashboard();
    monitor.exportMetrics();
    console.log('📊 Final metrics exported to monitoring-logs/');
    process.exit(0);
  });

  monitor.initializeMonitoring().catch(console.error);
}

module.exports = AutomotiveMonitoringSetup;