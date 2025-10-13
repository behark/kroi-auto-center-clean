# Render Deployment Troubleshooting Guide

## Common Issues and Solutions

### Build Phase Issues

#### 1. "npm ci failed" or "npm install failed"
**Symptoms**: Build fails during dependency installation
**Solutions**:
```bash
# Check Node.js version compatibility locally
node --version  # Should be >=18

# Clear package-lock.json and node_modules if corrupted
rm -rf node_modules package-lock.json
npm install
git add . && git commit -m "Fix package lock" && git push
```

#### 2. "Out of memory" during build
**Symptoms**: Build fails with memory errors, particularly for AUTO ANI
**Solutions**:
- Check `NODE_OPTIONS` is set to `--max-old-space-size=512`
- For AUTO ANI, consider upgrading to Pro plan ($25/month)
- Verify build command uses memory optimization

#### 3. "Next.js build failed"
**Symptoms**: Next.js compilation errors
**Solutions**:
```bash
# Test build locally first
npm run build

# Check for TypeScript errors
npm run type-check

# Verify environment variables are available during build
echo $NEXT_PUBLIC_SANITY_PROJECT_ID
```

### Runtime Issues

#### 4. "Service is not responding" or 503 errors
**Symptoms**: Service deployed but not accessible
**Solutions**:
1. Check health check endpoint is responding:
   ```bash
   curl -I https://your-service.onrender.com/
   ```
2. Verify `startCommand` in render.yaml
3. Check logs for startup errors
4. Ensure `PORT` environment variable handling

#### 5. Sanity CMS data not loading
**Symptoms**: Site loads but content is missing
**Solutions**:
1. Verify Sanity environment variables:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=j2t31xge
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=skVALaMv...
   ```
2. Test Sanity connection locally:
   ```javascript
   // Test in browser console
   fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}?query=*[_type=="vehicle"][0..5]`)
   ```
3. Check Sanity API token permissions
4. Verify dataset exists and has content

### Environment Variable Issues

#### 6. Environment variables not working
**Symptoms**: Variables undefined in application
**Solutions**:
1. Ensure variables are set in Render dashboard, not just render.yaml
2. Check variable names are exact matches (case-sensitive)
3. For client-side variables, ensure they start with `NEXT_PUBLIC_`
4. Restart service after adding variables

#### 7. Secret environment variables issues
**Symptoms**: Sensitive data exposed or not working
**Solutions**:
1. Mark sensitive variables as "Secret" in Render dashboard
2. Never commit secrets to Git
3. For SMTP passwords, use app-specific passwords
4. Regenerate API tokens if exposed

### Email Issues (Car Wash Booking)

#### 8. Email notifications not sending
**Symptoms**: Booking forms submit but no emails received
**Solutions**:
1. Verify SMTP settings:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password  # Not regular password!
   ```
2. Test Gmail App Password:
   - Enable 2FA on Gmail
   - Generate app password at: https://myaccount.google.com/apppasswords
   - Use generated password, not regular Gmail password
3. Check spam/junk folders
4. Verify sending domain not blacklisted

#### 9. SSL/TLS errors with email
**Symptoms**: SMTP connection errors
**Solutions**:
1. Ensure SMTP_PORT is 587 (STARTTLS)
2. Try port 465 (SSL) if 587 fails
3. Add to environment variables:
   ```
   SMTP_SECURE=false
   SMTP_TLS_REJECT_UNAUTHORIZED=false
   ```

### Performance Issues

#### 10. Slow page load times
**Symptoms**: Pages take >5 seconds to load
**Solutions**:
1. Check Render region matches target audience
2. Verify caching headers in render.yaml
3. Optimize images:
   ```javascript
   // Use Next.js Image component
   import Image from 'next/image'
   ```
4. Enable static optimization where possible

#### 11. Memory warnings in logs
**Symptoms**: Memory usage approaching limits
**Solutions**:
1. Monitor memory usage in Render dashboard
2. Increase NODE_OPTIONS memory limit:
   ```
   NODE_OPTIONS=--max-old-space-size=750
   ```
3. Consider upgrading to Pro plan
4. Optimize memory usage in code

### Domain and SSL Issues

#### 12. Custom domain not working
**Symptoms**: Domain points to Render but shows errors
**Solutions**:
1. Verify DNS records point to Render
2. Wait 24-48 hours for DNS propagation
3. Check SSL certificate status in Render dashboard
4. Ensure domain added in service settings

#### 13. Mixed content warnings
**Symptoms**: HTTP resources on HTTPS site
**Solutions**:
1. Update all HTTP links to HTTPS
2. Use protocol-relative URLs where possible
3. Check Sanity image URLs use HTTPS
4. Verify API calls use HTTPS

### Database/CMS Connection Issues

#### 14. Intermittent Sanity connection failures
**Symptoms**: Content loads sometimes but not always
**Solutions**:
1. Implement retry logic in Sanity queries
2. Add error boundaries in React components
3. Check Sanity service status
4. Consider caching strategies for better reliability

## Debugging Tools

### 1. Render Dashboard
- **Logs**: Real-time application logs
- **Metrics**: CPU, memory, and request metrics
- **Events**: Deployment and service events

### 2. Browser Developer Tools
```javascript
// Check environment variables (client-side only)
console.log(process.env)

// Test Sanity connection
console.log(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
```

### 3. Health Check Endpoints
Test each service:
```bash
curl -I https://kroi-auto-center-clean.onrender.com/
curl -I https://car-wash-clean.onrender.com/
curl -I https://auto-ani-website.onrender.com/
```

### 4. Network Testing
```bash
# Test DNS resolution
nslookup your-service.onrender.com

# Test SSL certificate
openssl s_client -connect your-service.onrender.com:443
```

## Recovery Procedures

### Quick Recovery
1. **Immediate rollback**: Redeploy previous successful version
2. **Environment reset**: Clear and re-add environment variables
3. **Service restart**: Force restart through Render dashboard

### Full Recovery
1. **Local testing**: Reproduce issue locally
2. **Staged deployment**: Test in development environment first
3. **Gradual rollout**: Deploy one service at a time
4. **Monitoring**: Watch logs during recovery

## Prevention Strategies

### 1. Pre-deployment Testing
```bash
# Run full test suite locally
npm test
npm run build
npm run start
```

### 2. Environment Validation
Create a deployment checklist for each service with all required variables.

### 3. Monitoring Setup
- Set up alerts for service downtime
- Monitor error rates and response times
- Track memory and CPU usage

### 4. Backup Plans
- Keep previous working configurations
- Document all environment variables
- Maintain local development mirrors of production

## When to Contact Support

### Render Support
- Infrastructure issues (server downtime, network problems)
- Billing questions
- Feature requests

### Self-Help First
- Application errors (check your code)
- Environment variable issues (check your configuration)
- Performance problems (optimize your application)

## Support Contacts

- **Render Support**: Through dashboard help section
- **Sanity Support**: support@sanity.io
- **DNS/Domain Issues**: Contact your domain registrar

---

**Last Updated**: October 2025
**Deployment Team**: Claude Code Assistant