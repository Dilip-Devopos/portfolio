# 🌐 AWS S3 + CloudFront Deployment Guide

Complete guide for hosting your portfolio on AWS S3 with CloudFront CDN for optimal performance and cost.

## 💰 Cost Comparison

| Service | Monthly Cost | Features |
|---------|-------------|----------|
| **S3 + CloudFront** | $1-3/month | Full control, cheapest |
| **AWS Amplify** | $1-5/month | Easiest, CI/CD included |
| **EC2** | $5-20/month | Full server control |

## 🎯 S3 + CloudFront Setup (Recommended for Cost)

### Step 1: Create S3 Bucket

1. **AWS Console** → S3 → "Create bucket"
2. **Bucket Configuration**:
   ```
   Bucket name: your-portfolio-2024 (globally unique)
   Region: us-east-1 (cheapest)
   Block all public access: UNCHECK ❌
   Bucket Versioning: Disable
   Default encryption: Disable (optional)
   ```

3. **Bucket Policy** (Replace `your-portfolio-2024` with your bucket name):
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::your-portfolio-2024/*"
       }
     ]
   }
   ```

4. **Static Website Hosting**:
   ```
   Properties → Static website hosting → Enable
   Index document: index.html
   Error document: index.html
   ```

### Step 2: Upload Your Build

#### Option A: AWS Console (Easy)
1. **Upload files**: Drag `dist` folder contents to S3 bucket
2. **Set permissions**: Make all files public

#### Option B: AWS CLI (Recommended)
```bash
# Install AWS CLI first: https://aws.amazon.com/cli/

# Configure AWS credentials
aws configure
# Enter your Access Key ID, Secret Access Key, Region (us-east-1), Output format (json)

# Upload files
aws s3 sync dist/ s3://your-portfolio-2024 --delete

# Set public read permissions
aws s3api put-bucket-policy --bucket your-portfolio-2024 --policy file://bucket-policy.json
```

### Step 3: Create CloudFront Distribution

1. **AWS Console** → CloudFront → "Create distribution"
2. **Origin Settings**:
   ```
   Origin domain: your-portfolio-2024.s3.us-east-1.amazonaws.com
   Origin path: (leave empty)
   Origin access: Public
   ```

3. **Default Cache Behavior**:
   ```
   Viewer protocol policy: Redirect HTTP to HTTPS
   Allowed HTTP methods: GET, HEAD, OPTIONS
   Cache policy: Managed-CachingOptimized
   ```

4. **Distribution Settings**:
   ```
   Price class: Use all edge locations (best performance)
   Default root object: index.html
   ```

5. **Custom Error Pages** (for SPA routing):
   ```
   Error code: 403
   Response page path: /index.html
   HTTP response code: 200
   
   Error code: 404
   Response page path: /index.html
   HTTP response code: 200
   ```

### Step 4: Configure Custom Domain (Optional)

1. **Request SSL Certificate** (Certificate Manager):
   ```
   Region: us-east-1 (required for CloudFront)
   Domain: yourname.com
   Validation: DNS validation (recommended)
   ```

2. **Add Domain to CloudFront**:
   ```
   Alternate domain names: yourname.com, www.yourname.com
   SSL certificate: Select your certificate
   ```

3. **Update DNS Records**:
   ```
   Type: CNAME
   Name: www
   Value: d123456789.cloudfront.net
   
   Type: A (Alias if Route 53)
   Name: @
   Value: d123456789.cloudfront.net
   ```

## 🚀 Automated Deployment Script

Save this as `deploy.sh` (Linux/Mac) or use the PowerShell script provided:

```bash
#!/bin/bash

# Configuration
BUCKET_NAME="your-portfolio-2024"
DISTRIBUTION_ID="E123456789ABCD"  # Get from CloudFront console
REGION="us-east-1"

echo "🚀 Building portfolio..."
npm run build

echo "📦 Uploading to S3..."
aws s3 sync dist/ s3://$BUCKET_NAME --delete --region $REGION

echo "🔧 Setting cache headers..."
# Cache assets for 1 year
aws s3 cp s3://$BUCKET_NAME/assets/ s3://$BUCKET_NAME/assets/ \
  --recursive --cache-control "max-age=31536000" \
  --metadata-directive REPLACE --region $REGION

# Don't cache HTML
aws s3 cp s3://$BUCKET_NAME/index.html s3://$BUCKET_NAME/index.html \
  --cache-control "no-cache" --metadata-directive REPLACE --region $REGION

echo "🌐 Invalidating CloudFront cache..."
aws cloudfront create-invalidation \
  --distribution-id $DISTRIBUTION_ID \
  --paths "/*"

echo "✅ Deployment complete!"
echo "🌐 Your website: https://yourname.com"
```

## 📊 Performance Optimization

### Cache Headers Configuration
```bash
# CSS/JS files (1 year cache)
aws s3 cp s3://bucket/assets/ s3://bucket/assets/ \
  --recursive --include "*.css" --include "*.js" \
  --cache-control "max-age=31536000, immutable" \
  --metadata-directive REPLACE

# Images (1 month cache)
aws s3 cp s3://bucket/assets/ s3://bucket/assets/ \
  --recursive --include "*.png" --include "*.jpg" --include "*.webp" \
  --cache-control "max-age=2592000" \
  --metadata-directive REPLACE

# HTML files (no cache)
aws s3 cp s3://bucket/index.html s3://bucket/index.html \
  --cache-control "no-cache, no-store, must-revalidate" \
  --metadata-directive REPLACE
```

### CloudFront Optimization
1. **Enable Gzip compression**: Automatic
2. **HTTP/2 support**: Enabled by default
3. **Edge locations**: Use all for best performance
4. **Origin request policy**: CORS-S3Origin

## 🔧 Troubleshooting

### Common Issues

1. **403 Forbidden Error**:
   - Check bucket policy is applied
   - Verify files are publicly readable
   - Check bucket name in policy matches actual bucket

2. **404 on Refresh**:
   - Add custom error pages in CloudFront
   - Set 404 → /index.html with 200 response

3. **Changes Not Visible**:
   - Clear CloudFront cache (create invalidation)
   - Check browser cache (hard refresh: Ctrl+F5)

4. **SSL Certificate Issues**:
   - Certificate must be in us-east-1 region
   - DNS validation can take 24-48 hours
   - Check domain ownership

### Performance Testing
```bash
# Test website speed
curl -w "@curl-format.txt" -o /dev/null -s "https://yourname.com"

# Check CloudFront headers
curl -I "https://yourname.com"
```

## 💡 Pro Tips

### Cost Optimization
1. **Use S3 Intelligent Tiering**: Automatic cost optimization
2. **CloudFront price class**: Use "Use Only US, Canada and Europe" for lower cost
3. **Monitor usage**: Set up billing alerts

### Security
1. **Block direct S3 access**: Use Origin Access Control (OAC)
2. **Security headers**: Add via CloudFront Functions
3. **WAF**: Add Web Application Firewall for protection

### Monitoring
1. **CloudWatch**: Monitor CloudFront metrics
2. **Real User Monitoring**: Add to your portfolio
3. **Uptime monitoring**: Use external service

## 📈 Expected Performance

With this setup, your portfolio will achieve:
- **Load time**: < 2 seconds globally
- **Lighthouse score**: 95+ performance
- **Uptime**: 99.99%
- **Global CDN**: 200+ edge locations
- **HTTPS**: A+ SSL rating

## 🎯 Final Checklist

- [ ] S3 bucket created and configured
- [ ] Files uploaded with correct permissions
- [ ] CloudFront distribution created
- [ ] Custom error pages configured
- [ ] SSL certificate (if using custom domain)
- [ ] DNS records updated
- [ ] Cache headers optimized
- [ ] Performance tested
- [ ] Contact form tested
- [ ] Mobile responsiveness verified

🎉 **Your portfolio is now live on AWS with enterprise-grade performance and reliability!**
