# Kroi Auto Center - Clean Version

A clean, modern auto center website built with Next.js and Sanity CMS.

## 🚀 Features

- **Clean Architecture**: Simplified from 59 database models to 3 Sanity schemas
- **Modern Stack**: Next.js 15, React 19, Tailwind CSS 4
- **Sanity CMS**: Headless CMS for easy content management
- **Performance**: Optimized images and fast loading
- **Mobile-First**: Responsive design for all devices

## 📊 Cleanup Results

### Dependencies Reduced
- **Original**: 41 total dependencies (24 + 17 dev)
- **Clean**: 20 total dependencies (14 + 6 dev)
- **Reduction**: 51% fewer dependencies

### Database Models Simplified
- **Original**: 59 Prisma models (1,290 lines)
- **Clean**: 3 Sanity schemas (simple, focused)
- **Reduction**: 95% fewer models

### Architecture Simplified
- Removed: Prisma, NextAuth, Redis, Sentry, i18n, PWA
- Added: Sanity CMS for content management
- Focus: Core automotive business functionality

## 🛠️ Tech Stack

### Core
- **Next.js 15** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling

### CMS & Data
- **Sanity** - Headless CMS
- **@sanity/client** - Data fetching
- **@sanity/image-url** - Image optimization

### UI & Animation
- **Framer Motion** - Smooth animations
- **Lucide React** - Modern icons
- **clsx** - Conditional classes

## 🚀 Getting Started

1. **Clone and install**:
   ```bash
   cd /home/behar/kroi-auto-center-clean
   npm install
   ```

2. **Set up Sanity**:
   ```bash
   # Install Sanity CLI
   npm install -g @sanity/cli

   # Create new Sanity project
   sanity init

   # Copy the project ID to .env.local
   ```

3. **Configure environment**:
   ```bash
   cp .env.local.example .env.local
   # Add your Sanity project ID and dataset
   ```

4. **Run development server**:
   ```bash
   npm run dev
   ```

5. **Start Sanity Studio**:
   ```bash
   cd sanity
   npm run dev
   ```

## 📁 Project Structure

```
kroi-auto-center-clean/
├── app/                    # Next.js app directory
│   ├── components/         # React components
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── lib/                   # Utilities
│   └── sanity.ts          # Sanity client & queries
├── sanity/                # Sanity CMS
│   ├── config.ts          # Sanity configuration
│   └── schema.ts          # Content schemas
├── types/                 # TypeScript types
│   └── car.ts             # Car interfaces
└── public/                # Static assets
    └── cars/              # Vehicle images
```

## 📋 Sanity Schemas

### 1. Car
- Basic info (name, brand, model, year, price)
- Technical specs (fuel, transmission, mileage)
- Media (main image, gallery)
- Features and specifications
- Availability and featured status

### 2. Contact Inquiry
- Customer information
- Message and inquiry type
- Related car reference
- Status tracking

### 3. Testimonial
- Customer feedback
- Rating system
- Optional customer photo
- Featured testimonials

## 🎯 What Was Removed

### Over-Engineering Eliminated
- **59 Prisma models** → 3 Sanity schemas
- **Complex authentication** → Simple contact forms
- **Multi-language i18n** → Single language focus
- **PWA functionality** → Standard web app
- **Enterprise monitoring** → Essential logging only
- **Redis caching** → Built-in Next.js caching
- **Complex user roles** → Content management focus

### Dependencies Eliminated
- @auth/prisma-adapter
- @prisma/client
- @sentry/nextjs
- bcryptjs
- ioredis
- next-auth
- next-intl
- nodemailer
- prisma
- redis
- And many more...

## 🎉 Benefits

1. **Faster Development**: Simpler architecture, fewer dependencies
2. **Better Performance**: Lighter bundle, faster builds
3. **Easier Maintenance**: Less complexity, clearer code
4. **Cost Effective**: No database hosting, simpler deployment
5. **Content-Focused**: Perfect for automotive showcase website

This clean version maintains all essential automotive business functionality while eliminating unnecessary complexity.