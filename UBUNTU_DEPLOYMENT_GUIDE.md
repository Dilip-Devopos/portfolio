# 🐧 Ubuntu AWS Deployment Guide

Complete guide for deploying your optimized portfolio to AWS from Ubuntu Linux.

## 🚀 Quick Start (5 Minutes)

### Step 1: Setup Dependencies
```bash
# Make setup script executable and run it
chmod +x setup-ubuntu.sh
./setup-ubuntu.sh
```

### Step 2: Configure AWS
```bash
# Configure AWS credentials
aws configure

# You'll need:
# AWS Access Key ID: [Your Access Key]
# AWS Secret Access Key: [Your Secret Key]
# Default region name: us-east-1
# Default output format: json
```

### Step 3: Deploy Portfolio
```bash
# Build and deploy in one command
./quick-deploy.sh -b your-portfolio-2024

# Or with custom region
./quick-deploy.sh -b your-portfolio-2024 -r us-west-2

# Or with CloudFront distribution
./quick-deploy.sh -b your-portfolio-2024 -d E123456789ABCD
```

## 📋 Manual Installation (If Needed)

### Install Node.js 18.x LTS
```bash
# Update package list
sudo apt update

# Install Node.js 18.x from NodeSource
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version  # Should show v18.x.x
npm --version   # Should show 9.x.x or higher
```

### Install AWS CLI v2
```bash
# Install required packages
sudo apt install -y curl unzip

# Download and install AWS CLI v2
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Cleanup
rm -rf awscliv2.zip aws/

# Verify installation
aws --version  # Should show aws-cli/2.x.x
```

### Install Git (if needed)
```bash
sudo apt install -y git
git --version
```

## 🎯 Deployment Options

### Option 1: Quick Deploy (Recommended)
```bash
# All-in-one deployment script
./quick-deploy.sh -b your-portfolio-bucket

# What it does:
# ✅ Checks all prerequisites
# ✅ Builds your portfolio
# ✅ Creates S3 bucket
# ✅ Configures static hosting
# ✅ Sets bucket policy
# ✅ Uploads files
# ✅ Optimizes cache headers
# ✅ Invalidates CloudFront (if provided)
```

### Option 2: Manual S3 Deploy
```bash
# Build portfolio
npm run build

# Deploy to existing bucket
./deploy-s3.sh

# Edit the script first to set your bucket name:
# BUCKET_NAME="your-portfolio-bucket"
```

### Option 3: AWS Amplify (GitHub Integration)
```bash
# Push to GitHub first
git init
git add .
git commit -m "Initial portfolio commit"
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main

# Then follow AWS_AMPLIFY_DEPLOYMENT.md
```

## 🔧 Script Usage

### quick-deploy.sh Options
```bash
./quick-deploy.sh -b BUCKET_NAME [-r REGION] [-d DISTRIBUTION_ID]

Options:
  -b BUCKET_NAME     S3 bucket name (required)
  -r REGION          AWS region (default: us-east-1)
  -d DISTRIBUTION_ID CloudFront distribution ID (optional)
  -h                 Show help message

Examples:
  ./quick-deploy.sh -b my-portfolio-2024
  ./quick-deploy.sh -b my-portfolio-2024 -r eu-west-1
  ./quick-deploy.sh -b my-portfolio-2024 -d E123456789ABCD
```

### deploy-s3.sh Configuration
Edit the script to set your configuration:
```bash
# Configuration
BUCKET_NAME="your-portfolio-bucket"  # Replace with your bucket name
REGION="us-east-1"                   # Replace with your region
DIST_FOLDER="dist"                   # Build output folder
```

## 🛠️ Troubleshooting

### Permission Denied Errors
```bash
# Make scripts executable
chmod +x setup-ubuntu.sh
chmod +x quick-deploy.sh
chmod +x deploy-s3.sh

# Or make all shell scripts executable
chmod +x *.sh
```

### AWS CLI Installation Issues
```bash
# If AWS CLI installation fails, try manual installation
sudo apt remove awscli  # Remove old version if exists

# Download and install manually
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install --bin-dir /usr/local/bin --install-dir /usr/local/aws-cli --update

# Add to PATH if needed
echo 'export PATH=/usr/local/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### Node.js Version Issues
```bash
# If you need a different Node.js version, use nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Install and use Node.js 18
nvm install 18
nvm use 18
nvm alias default 18
```

### AWS Credentials Issues
```bash
# Check if credentials are configured
aws sts get-caller-identity

# If not configured, run:
aws configure

# Or set environment variables
export AWS_ACCESS_KEY_ID=your_access_key
export AWS_SECRET_ACCESS_KEY=your_secret_key
export AWS_DEFAULT_REGION=us-east-1
```

### Build Failures
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

## 📊 Expected Results

### Build Output
```
✓ 1485 modules transformed.
dist/index.html                    0.73 kB │ gzip:  0.44 kB
dist/assets/index-DcjzCqpM.css     59.08 kB │ gzip:  8.92 kB
dist/assets/index-jLFyrVe7.js     146.45 kB │ gzip: 47.58 kB
✓ built in 3.36s
```

### Deployment Success
```
🎉 Deployment completed successfully!
=================================
📊 Deployment Summary:
   Bucket: your-portfolio-2024
   Region: us-east-1
   Website URL: http://your-portfolio-2024.s3-website-us-east-1.amazonaws.com
```

## 🌐 Post-Deployment

### Test Your Website
```bash
# Test the S3 website URL
curl -I http://your-portfolio-2024.s3-website-us-east-1.amazonaws.com

# Should return HTTP/1.1 200 OK
```

### Set Up CloudFront (Optional)
Follow the `AWS_S3_CLOUDFRONT_GUIDE.md` for:
- HTTPS support
- Custom domain
- Global CDN
- Better performance

### Monitor Your Deployment
```bash
# Check S3 bucket contents
aws s3 ls s3://your-portfolio-2024 --recursive

# Check bucket website configuration
aws s3api get-bucket-website --bucket your-portfolio-2024
```

## 💰 Cost Estimation

### S3 + CloudFront Monthly Costs:
- **S3 Storage**: $0.023/GB (your portfolio ~0.1GB = $0.002)
- **S3 Requests**: $0.0004/1000 requests (~$0.01)
- **CloudFront**: $0.085/GB for first 10TB (~$0.50)
- **Total**: ~$1-3/month for typical portfolio traffic

### Free Tier Benefits (First 12 months):
- **S3**: 5GB storage, 20,000 GET requests
- **CloudFront**: 50GB data transfer, 2,000,000 requests
- **Your portfolio**: Likely stays within free tier limits

## 🎯 Next Steps

1. **Test everything**: Contact form, interview modal, dark mode
2. **Set up monitoring**: CloudWatch, uptime monitoring
3. **Configure custom domain**: Route 53 or external DNS
4. **Enable HTTPS**: CloudFront with SSL certificate
5. **Optimize performance**: Follow CloudFront guide

## 🚀 Ready to Deploy!

Your Ubuntu environment is now ready to deploy your optimized portfolio to AWS. Choose your deployment method and launch your portfolio to the world!

```bash
# Quick deployment (recommended)
./quick-deploy.sh -b your-portfolio-2024

# Your portfolio will be live in ~2 minutes! 🎉
```
