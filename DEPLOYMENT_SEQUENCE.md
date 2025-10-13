# Deployment Sequence Checklist

## Optimal Deployment Order

Deploy the projects in this specific order for maximum success rate:

### 1. Kroi Auto Center (Deploy First) ✅
**Reason**: Most stable, minimal dependencies, good baseline test

**Project Path**: `/home/behar/kroi-auto-center-clean`
**Service Name**: `kroi-auto-center-clean`
**Expected URL**: `https://kroi-auto-center-clean.onrender.com`

**Pre-deployment Checklist**:
- [ ] Repository pushed to GitHub
- [ ] `render.yaml` configured
- [ ] Environment variables prepared
- [ ] Sanity CMS connection tested locally

**Deployment Steps**:
1. Create new Render web service
2. Connect GitHub repository
3. Configure environment variables from `render-env-setup.md`
4. Deploy and test
5. Verify Sanity CMS data loading

**Success Criteria**:
- [ ] Service shows "Live" status
- [ ] Homepage loads with automotive content
- [ ] Sanity CMS data displays correctly
- [ ] No console errors
- [ ] Health check passes

---

### 2. Car Wash Booking (Deploy Second) ⏳
**Reason**: Medium complexity, email features can be tested independently

**Project Path**: `/home/behar/car-wash-clean`
**Service Name**: `car-wash-clean`
**Expected URL**: `https://car-wash-clean.onrender.com`

**Pre-deployment Checklist**:
- [ ] Kroi Auto Center successfully deployed
- [ ] Email service (Gmail) app password generated
- [ ] Repository pushed to GitHub
- [ ] `render.yaml` configured
- [ ] Environment variables prepared

**Deployment Steps**:
1. Create new Render web service
2. Connect GitHub repository
3. Configure environment variables from `render-env-setup.md`
4. **Important**: Set SMTP_PASSWORD as secret
5. Deploy and test
6. Test booking form and email notifications

**Success Criteria**:
- [ ] Service shows "Live" status
- [ ] Booking form loads and functions
- [ ] Email notifications work
- [ ] Sanity CMS integration works
- [ ] No console errors

---

### 3. AUTO ANI (Deploy Last) ⏳
**Reason**: Most complex, memory optimizations, previous deployments validate Sanity setup

**Project Path**: `/home/behar/auto-ani-website`
**Service Name**: `auto-ani-website`
**Expected URL**: `https://auto-ani-website.onrender.com`

**Pre-deployment Checklist**:
- [ ] Previous 2 projects successfully deployed
- [ ] Memory-optimized build commands tested
- [ ] Repository pushed to GitHub
- [ ] `render.yaml` configured
- [ ] Environment variables prepared

**Deployment Steps**:
1. Create new Render web service
2. Connect GitHub repository
3. Configure environment variables from `render-env-setup.md`
4. Monitor build process for memory issues
5. Deploy and test
6. Verify all Radix UI components work

**Success Criteria**:
- [ ] Service shows "Live" status
- [ ] Complex UI components render correctly
- [ ] Contact form functions
- [ ] Memory usage within limits
- [ ] Performance metrics acceptable

## Post-Deployment Validation

### All Services Health Check
After all deployments are complete:

1. **Connectivity Test**:
   ```bash
   curl -I https://kroi-auto-center-clean.onrender.com
   curl -I https://car-wash-clean.onrender.com
   curl -I https://auto-ani-website.onrender.com
   ```

2. **Sanity CMS Test**:
   - [ ] All services display Sanity content
   - [ ] Images load from Sanity CDN
   - [ ] Content updates reflect across all sites

3. **Performance Test**:
   - [ ] Page load times < 3 seconds
   - [ ] Lighthouse scores > 80
   - [ ] No memory warnings in logs

## Rollback Plan

If any deployment fails:

### Individual Service Rollback
1. Go to Render dashboard
2. Navigate to failed service
3. Click "Deployments" tab
4. Redeploy previous successful version

### Complete Rollback Sequence
If multiple services need rollback:
1. Rollback AUTO ANI first (most complex)
2. Rollback Car Wash second
3. Rollback Kroi Auto Center last (most stable)

## Timeline Estimation

### Conservative Timeline
- **Kroi Auto Center**: 30-45 minutes
- **Car Wash Booking**: 45-60 minutes (including email testing)
- **AUTO ANI**: 60-90 minutes (including memory optimization verification)
- **Total**: 2.5-4 hours

### Aggressive Timeline (experienced deployer)
- **Kroi Auto Center**: 15-20 minutes
- **Car Wash Booking**: 20-30 minutes
- **AUTO ANI**: 30-45 minutes
- **Total**: 1-1.5 hours

## Common Issues by Phase

### Phase 1 (Kroi Auto Center)
- Build failures due to Node.js version
- Environment variable configuration errors
- Sanity API token permissions

### Phase 2 (Car Wash Booking)
- SMTP authentication failures
- Email delivery testing issues
- Form validation errors

### Phase 3 (AUTO ANI)
- Memory limit exceeded during build
- Complex component rendering issues
- Performance optimization problems

## Emergency Protocols

### Critical Failure
If any service fails completely:
1. Check logs immediately
2. Verify environment variables
3. Test locally with production config
4. Contact Render support if infrastructure issue

### Partial Failure
If service deploys but doesn't function:
1. Check health check endpoint
2. Review console errors
3. Test Sanity CMS connection
4. Verify all required environment variables

## Success Metrics

### Technical Success
- [ ] All 3 services online and responding
- [ ] All health checks passing
- [ ] Shared Sanity CMS working across all projects
- [ ] Performance within acceptable limits

### Business Success
- [ ] All automotive content displaying correctly
- [ ] Contact forms functional
- [ ] Booking system operational
- [ ] SEO elements in place

---

**Deployment Date**: ___________
**Deployed By**: ___________
**Final Status**: ___________