# Sanity Automotive Data Generator

A comprehensive data generation and import system for automotive Sanity CMS projects. Creates realistic, production-ready content for three distinct automotive businesses:

1. **Kroi Auto Center** (Finland) - Car dealership
2. **Car Wash Clean** (Finland) - Car wash and detailing services
3. **AUTO ANI** (Kosovo) - Car dealership and service center

## Features

- ✅ **Realistic Data**: Market-appropriate pricing, vehicle specs, and business details
- ✅ **Multi-language Support**: Finnish, English, Albanian content
- ✅ **Complete Business Profiles**: Hours, locations, contact info, certifications
- ✅ **Professional Team Members**: Realistic profiles with specialties and contact info
- ✅ **Comprehensive Services**: Detailed service descriptions, pricing, and booking info
- ✅ **Diverse Vehicle Inventory**: 15-20 vehicles per dealership with realistic specs
- ✅ **SEO Optimized**: Meta titles, descriptions, and keywords
- ✅ **Batch Processing**: Efficient import with retry logic and rate limiting
- ✅ **Market-specific**: Pricing and content adapted to Finnish and Kosovo markets

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy the example environment file and configure:

```bash
cp .env.example .env
```

Edit `.env` with your Sanity credentials:

```env
SANITY_PROJECT_ID=j2t31xge
SANITY_DATASET=production
SANITY_API_TOKEN=your_token_here
NODE_ENV=development
```

### 3. Import All Data

```bash
npm run generate-all
npm run import-data
```

## Detailed Usage

### Generate Data for Specific Projects

```bash
# Generate individual project data
npm run generate-kroi      # Kroi Auto Center (Finland)
npm run generate-carwash   # Car Wash Clean
npm run generate-kosovo    # AUTO ANI Kosovo

# Generate all projects
npm run generate-all
```

### Import Data Options

```bash
# Import all projects
node import-data.js

# Import specific projects
node import-data.js kroi     # Kroi Auto Center only
node import-data.js carwash  # Car Wash Clean only
node import-data.js kosovo   # AUTO ANI Kosovo only

# Clear existing data before import
node import-data.js --clear
```

## Generated Content Overview

### Kroi Auto Center (Finland)
- **18 Vehicles**: BMW, Mercedes-Benz, Audi, VW, Toyota, Ford
- **7 Services**: Inspection, oil change, tire service, brakes, AC, diagnostics, financing
- **3 Team Members**: CEO, Sales Manager, Service Manager
- **Business Info**: Tampere location, Finnish business details, EU compliance

### Car Wash Clean (Finland)
- **0 Vehicles**: Service-only business
- **6 Services**: Basic wash, premium wash, deluxe detailing, interior cleaning, wax, express
- **3 Team Members**: Location Manager, Detailing Specialist, Customer Service
- **Business Info**: Helsinki + Espoo locations, booking system, eco-friendly focus

### AUTO ANI Kosovo
- **20 Vehicles**: Mostly used cars, import market pricing
- **8 Services**: Technical inspection, oil change, brakes, tires, diagnostics, body work, financing, import assistance
- **4 Team Members**: General Manager, Sales Manager, Service Manager, Customer Service
- **Business Info**: Pristina location, Kosovo business registration, multi-language

## Data Structure

### Vehicles
- Complete specifications (engine, transmission, drivetrain)
- Realistic pricing based on market and vehicle age
- Professional descriptions in local language
- Feature lists and detailed specifications
- Status tracking (available, sold, reserved)
- SEO optimization

### Services
- Detailed descriptions and pricing
- Duration and capacity information
- Booking requirements and advance notice
- Step-by-step process descriptions
- Seasonal availability (where applicable)
- Feature lists and benefits

### Team Members
- Professional profiles with photos
- Contact information and specialties
- Experience levels and certifications
- Multi-language capabilities
- Department and seniority structure

### Business Information
- Complete contact details and locations
- Business hours and holiday information
- Legal registration and certifications
- Social media and payment methods
- Services offered and languages spoken

## Technical Details

### Schema Compatibility
Built for the automotive CMS schemas in `/automotive-cms-schemas/`:
- `vehicle.ts` - Vehicle listings with comprehensive specs
- `service.ts` - Service offerings with booking capabilities
- `teamMember.ts` - Staff profiles and expertise
- `businessInfo.ts` - Company information and locations

### Data Generation Features
- **Realistic Pricing**: Market-appropriate prices for each region
- **Age-appropriate Mileage**: Realistic mileage based on vehicle year
- **Market Adaptation**: Different vehicle mix and pricing for Kosovo vs Finland
- **Localized Content**: Native language descriptions and terminology
- **SEO Optimization**: Proper meta tags and keywords for each market

### Import Features
- **Batch Processing**: Processes documents in configurable batches
- **Retry Logic**: Automatic retry on failed imports with exponential backoff
- **Rate Limiting**: Prevents API throttling with delays between batches
- **Error Handling**: Graceful failure handling with detailed logging
- **Progress Tracking**: Real-time progress updates and statistics

## Customization

### Adding More Vehicles
Modify the vehicle specs in `data/vehicle-specs.js`:

```javascript
export const vehicleSpecs = {
  'NewBrand': {
    models: {
      'ModelName': {
        category: 'suv',
        engines: ['2.0L Turbo'],
        colors: ['White', 'Black'],
        priceRange: { min: 30000, max: 50000 },
        features: ['Feature1', 'Feature2']
      }
    }
  }
}
```

### Modifying Business Information
Edit the generator files:
- `generators/kroi-auto-center.js` - Finnish dealership
- `generators/car-wash-clean.js` - Car wash services
- `generators/auto-ani-kosovo.js` - Kosovo dealership

### Adding New Services
Service templates are in `data/vehicle-specs.js` under `serviceSpecifications`.

## Production Considerations

### Image Handling
The current setup uses placeholder images. For production:

1. Replace placeholder URLs with actual vehicle/service/team photos
2. Upload images to Sanity's asset management system
3. Update image references in the data generation scripts

### Content Review
Generated content is realistic but should be reviewed for:
- Brand-specific terminology and messaging
- Local regulations and compliance requirements
- Pricing accuracy for current market conditions
- Contact information and business details

### Performance Optimization
- Use smaller batch sizes for slower connections
- Implement image optimization for faster loading
- Consider CDN setup for global performance

## Troubleshooting

### Common Issues

**Authentication Errors**
- Verify `SANITY_API_TOKEN` has write permissions
- Check project ID and dataset name
- Ensure token is not expired

**Rate Limiting**
- Reduce batch size in import script
- Increase delay between batches
- Check Sanity plan limits

**Data Validation Errors**
- Verify required fields are populated
- Check field format requirements (email, phone, etc.)
- Validate localized string structures

### Support
For issues with the data generator:
1. Check the console logs for detailed error messages
2. Verify environment configuration
3. Test with smaller data sets first
4. Review Sanity Studio schema requirements

## License

MIT License - Feel free to modify and adapt for your projects.