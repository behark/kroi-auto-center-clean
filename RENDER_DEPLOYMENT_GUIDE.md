# Render Deployment Guide - Automotive Projects Suite

## Overview

This guide covers the deployment of 3 automotive projects to Render.com with a shared Sanity CMS backend:

1. **Kroi Auto Center** - Finnish car dealership
2. **AUTO ANI** - Kosovo car dealership
3. **Car Wash Booking** - Car wash service booking system

## Shared Sanity CMS Configuration

All projects share the same Sanity CMS backend:
- **Project ID**: `j2t31xge`
- **Dataset**: `production`
- **API Token**: Configured in each project's environment variables

## Project Configurations

### 1. Kroi Auto Center (`/home/behar/kroi-auto-center-clean`)

**Service Name**: `kroi-auto-center-clean`
**Region**: Oregon (USD market focus)
**URL**: `https://kroi-auto-center-clean.onrender.com`

**Key Features**:
- Next.js 15.5.4 with React 19
- Sanity CMS integration
- Performance optimizations
- Image optimization for automotive content

### 2. AUTO ANI (`/home/behar/auto-ani-website`)

**Service Name**: `auto-ani-website`
**Region**: Frankfurt (Kosovo/Europe focus)
**URL**: `https://auto-ani-website.onrender.com`

**Key Features**:
- Memory-optimized build process
- Contact form integration
- Radix UI components
- Performance monitoring

### 3. Car Wash Booking (`/home/behar/car-wash-clean`)

**Service Name**: `car-wash-clean`
**Region**: Oregon
**URL**: `https://car-wash-clean.onrender.com`

**Key Features**:
- Booking system functionality
- Email notifications (Nodemailer)
- Sanity CMS integration
- Form handling and validation

## Deployment Sequence

Deploy in this order for optimal success:

1. **Kroi Auto Center** (Most stable, least dependencies)
2. **Car Wash Booking** (Medium complexity)
3. **AUTO ANI** (Most complex, memory optimizations)

## Step-by-Step Deployment Process

### Prerequisites

1. Render.com account created
2. GitHub repositories for each project
3. Sanity CMS project setup and API token ready

### For Each Project:

#### Step 1: Repository Setup
```bash
# Ensure your project is pushed to GitHub
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

#### Step 2: Create Render Service

1. Log in to Render.com
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: Use the service name from render.yaml
   - **Region**: As specified in project config
   - **Branch**: `main`
   - **Runtime**: Node
   - **Build Command**: Use from render.yaml
   - **Start Command**: Use from render.yaml

#### Step 3: Environment Variables Setup

Configure these variables in Render dashboard for each project:

**Common Variables (All Projects)**:
```
NODE_ENV=production
NEXT_PUBLIC_SANITY_PROJECT_ID=j2t31xge
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=skVALaMvvJIxP9krYTpB6SYM6XgH3fe60cDRTpVg05znY5DlDGIx1LvUMre94xah8O1bk6ZIiz5QwNz7aA6B5XisFj8mWid17JAgnWh5tuncOehX5gsYt2oNpVxfpS9xsa1YWxHCjMUxkwGeeH9bynKZGz5OQFwIeNARmmN3ajJCCEfgMUiO
NEXT_TELEMETRY_DISABLED=1
NODE_OPTIONS=--max-old-space-size=512
```

**Project-Specific Variables**:

**Kroi Auto Center**:
```
NEXT_PUBLIC_SITE_URL=https://kroi-auto-center-clean.onrender.com
```

**AUTO ANI**:
```
NEXT_PUBLIC_SITE_URL=https://auto-ani-website.onrender.com
CONTACT_EMAIL=contact@autosalonani.com
UV_THREADPOOL_SIZE=2
```

**Car Wash Booking**:
```
NEXT_PUBLIC_SITE_URL=https://car-wash-clean.onrender.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=[your-email]
SMTP_PASSWORD=[your-app-password]
SMTP_FROM=[your-email]
```

#### Step 4: Deploy

1. Click "Create Web Service"
2. Wait for deployment to complete
3. Monitor build logs for any issues

## Service Configuration Optimization

### Starter Plan Features ($7/month per service)
- 512MB RAM
- 1 CPU
- 100GB bandwidth
- Auto-scaling
- Custom domains
- SSL certificates

### Performance Optimizations Applied

1. **Build Optimizations**:
   - `npm ci --only=production` for faster, deterministic builds
   - Cache cleanup after build
   - Memory-optimized build commands

2. **Runtime Optimizations**:
   - Next.js telemetry disabled
   - Optimized Node.js memory settings
   - Static asset caching

3. **Caching Strategy**:
   - Static assets: 1 year cache
   - Images: 1 week cache
   - API routes: No cache

## Monitoring and Health Checks

### Health Check Endpoints
- All services use `/` as health check path
- Automatic service restart on health check failure
- 10-second timeout for health checks

### Monitoring Setup
1. **Render Dashboard**: Basic metrics included
2. **Custom Monitoring**: Can integrate with external services
3. **Logs**: Real-time log streaming available

## Cost Optimization

### Monthly Cost Breakdown
- Kroi Auto Center: $7/month (Starter)
- AUTO ANI: $7/month (Starter)
- Car Wash Booking: $7/month (Starter)
- **Total**: $21/month for all 3 applications

### Cost-Saving Tips
1. Use shared Sanity CMS (single subscription)
2. Optimize images and static assets
3. Enable caching headers
4. Monitor usage to avoid overages

## Troubleshooting Common Issues

### Build Failures
```bash
# Check Node.js version compatibility
node --version  # Should be >=18

# Clear npm cache if build fails
npm cache clean --force

# Verify all dependencies
npm audit
```

### Memory Issues
- Increase `NODE_OPTIONS --max-old-space-size` if builds fail
- Monitor memory usage in Render dashboard
- Consider upgrading to Pro plan ($25/month) for 1GB RAM

### Deploy Key Failures
- Ensure GitHub repository is public or Render has access
- Check branch names match configuration
- Verify build commands are correct

### Runtime Errors
- Check environment variables are set correctly
- Verify Sanity API token has correct permissions
- Check logs for specific error messages

## Security Best Practices

1. **Environment Variables**:
   - Never commit API keys to repository
   - Use Render's environment variable encryption
   - Rotate API tokens regularly

2. **HTTPS**:
   - All services automatically get SSL certificates
   - Redirect HTTP to HTTPS enabled by default

3. **Headers**:
   - Security headers configured in render.yaml
   - Content Security Policy can be added if needed

## Rollback Procedures

### Quick Rollback
1. Go to Render dashboard
2. Navigate to service → Deployments
3. Click "Redeploy" on previous successful deployment

### Git-based Rollback
```bash
# Revert to previous commit
git revert HEAD
git push origin main
# Service will auto-redeploy
```

## Domain Configuration

### Custom Domains
1. Go to service settings in Render
2. Add custom domain
3. Update DNS records as instructed
4. SSL certificate will be auto-generated

### Recommended Domains
- Kroi Auto Center: `kroiauto.fi` or similar
- AUTO ANI: `autosalonani.com` or similar
- Car Wash Booking: `kiiltoloisto.fi` or similar

## Post-Deployment Checklist

### Immediate (After each deployment)
- [ ] Service shows "Live" status
- [ ] Health check passes
- [ ] Site loads correctly
- [ ] Sanity CMS data displays properly
- [ ] Contact forms work (if applicable)

### Within 24 hours
- [ ] Performance testing completed
- [ ] SSL certificate active
- [ ] Search engine indexing configured
- [ ] Analytics setup (if needed)
- [ ] Backup procedures verified

### Weekly
- [ ] Monitor service metrics
- [ ] Check error logs
- [ ] Review performance metrics
- [ ] Verify uptime statistics

## Support Resources

- **Render Documentation**: https://render.com/docs
- **Render Community**: https://community.render.com
- **Sanity Documentation**: https://sanity.io/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment

## Emergency Contacts

- Render Support: Available through dashboard
- DNS Provider: Contact your domain registrar
- Sanity Support: Available through Sanity dashboard

---

**Created**: October 2025
**Last Updated**: October 2025
**Deployment Engineer**: Claude Code Assistant