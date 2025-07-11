# 🚀 AWS Amplify Deployment Guide

AWS Amplify is the **easiest way** to deploy your portfolio with automatic CI/CD, HTTPS, and custom domains.

## 📋 Prerequisites

1. **GitHub Repository**: Your portfolio code should be in a GitHub repo
2. **AWS Account**: Free tier is sufficient
3. **Built Portfolio**: Run `npm run build` to ensure it builds successfully

## 🎯 Step-by-Step Deployment

### Step 1: Push to GitHub

```bash
# If not already in a git repo
git init
git add .
git commit -m "Initial portfolio commit"

# Create GitHub repo and push
git remote add origin https://github.com/yourusername/your-portfolio.git
git branch -M main
git push -u origin main
```

### Step 2: AWS Amplify Setup

1. **Login to AWS Console** → Search for "Amplify"
2. **Click "Get Started"** under "Amplify Hosting"
3. **Connect Repository**:
   - Choose "GitHub"
   - Authorize AWS Amplify to access your GitHub
   - Select your portfolio repository
   - Choose the `main` branch

### Step 3: Build Settings

Amplify will auto-detect your build settings. Verify they look like this:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

### Step 4: Deploy

1. **Click "Save and Deploy"**
2. **Wait for deployment** (usually 2-5 minutes)
3. **Get your URL**: `https://main.d1234567890.amplifyapp.com`

## 🎨 Advanced Configuration

### Custom Domain Setup

1. **In Amplify Console** → Your app → "Domain management"
2. **Add domain** → Enter your domain (e.g., `yourname.com`)
3. **DNS Configuration**:
   - If using Route 53: Automatic setup
   - If using other DNS: Add provided CNAME records
4. **SSL Certificate**: Automatically provisioned

### Environment Variables

If you need environment variables:

1. **Amplify Console** → Your app → "Environment variables"
2. **Add variables**:
   ```
   VITE_API_URL=https://api.yoursite.com
   VITE_CONTACT_EMAIL=your@email.com
   ```

### Build Performance Optimization

Add this to your `amplify.yml` for faster builds:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci --cache .npm --prefer-offline
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - .npm/**/*
      - node_modules/**/*
```

## 💰 Cost Estimation

### Free Tier (First 12 months):
- **Build minutes**: 1,000 minutes/month
- **Data served**: 15 GB/month
- **Data stored**: 5 GB
- **Requests**: 15 GB served

### After Free Tier:
- **Build minutes**: $0.01 per minute
- **Data served**: $0.15 per GB
- **Data stored**: $0.023 per GB/month

**Estimated monthly cost for portfolio**: $1-5/month

## 🔧 Troubleshooting

### Build Fails

1. **Check Node version**:
   ```yaml
   preBuild:
     commands:
       - nvm use 18
       - npm ci
   ```

2. **Clear cache**:
   - Amplify Console → Your app → "Build settings" → "Clear cache"

### Custom Domain Issues

1. **DNS propagation**: Wait 24-48 hours
2. **SSL certificate**: Can take up to 24 hours
3. **Check DNS records**: Use `dig` or online DNS checker

### Performance Issues

1. **Enable compression**: Automatic in Amplify
2. **CDN caching**: Automatic with CloudFront
3. **Image optimization**: Use WebP format

## 🎯 Benefits of Amplify

### ✅ Automatic Features:
- **HTTPS/SSL**: Free SSL certificates
- **CDN**: Global CloudFront distribution
- **CI/CD**: Automatic builds on git push
- **Branch deployments**: Preview branches
- **Rollback**: Easy rollback to previous versions
- **Monitoring**: Built-in analytics

### ✅ Perfect for Portfolios:
- **Fast deployment**: 2-5 minutes
- **Zero server management**: Fully managed
- **Scalable**: Handles traffic spikes
- **Reliable**: 99.95% uptime SLA
- **Cost-effective**: Pay only for what you use

## 🚀 Next Steps After Deployment

1. **Test your website**: Check all functionality
2. **Set up custom domain**: Professional appearance
3. **Configure analytics**: Track visitors
4. **Set up monitoring**: Get alerts for issues
5. **Enable branch deployments**: For testing changes

## 📱 Mobile Optimization

Your portfolio is already mobile-optimized, but verify:

1. **Test on mobile devices**
2. **Check loading speed**: Use Google PageSpeed Insights
3. **Verify touch interactions**: All buttons work on mobile
4. **Test contact form**: Ensure it works on mobile

Your portfolio will be live at: `https://main.d[random].amplifyapp.com`

🎉 **Congratulations!** Your optimized portfolio is now live on AWS with automatic deployments!
