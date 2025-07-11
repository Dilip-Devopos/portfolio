#!/bin/bash

# AWS S3 Deployment Script for Portfolio (Ubuntu/Linux)
# Run this script after building your portfolio

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
BUCKET_NAME="your-portfolio-bucket"  # Replace with your bucket name
REGION="us-east-1"  # Replace with your region
DIST_FOLDER="dist"

echo -e "${GREEN}🚀 Starting AWS S3 deployment...${NC}"

# Check if AWS CLI is installed
if command -v aws &> /dev/null; then
    echo -e "${GREEN}✅ AWS CLI found${NC}"
    aws --version
else
    echo -e "${RED}❌ AWS CLI not found. Installing AWS CLI...${NC}"
    
    # Install AWS CLI v2 for Ubuntu
    echo -e "${YELLOW}📦 Installing AWS CLI v2...${NC}"
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
    
    if command -v unzip &> /dev/null; then
        unzip awscliv2.zip
    else
        echo -e "${YELLOW}Installing unzip...${NC}"
        sudo apt update && sudo apt install -y unzip
        unzip awscliv2.zip
    fi
    
    sudo ./aws/install
    rm -rf awscliv2.zip aws/
    
    if command -v aws &> /dev/null; then
        echo -e "${GREEN}✅ AWS CLI installed successfully${NC}"
    else
        echo -e "${RED}❌ Failed to install AWS CLI${NC}"
        exit 1
    fi
fi

# Check AWS credentials
if aws sts get-caller-identity &> /dev/null; then
    echo -e "${GREEN}✅ AWS credentials configured${NC}"
else
    echo -e "${RED}❌ AWS credentials not configured${NC}"
    echo -e "${YELLOW}Please run: aws configure${NC}"
    echo -e "${YELLOW}You'll need:${NC}"
    echo -e "${YELLOW}  - AWS Access Key ID${NC}"
    echo -e "${YELLOW}  - AWS Secret Access Key${NC}"
    echo -e "${YELLOW}  - Default region (e.g., us-east-1)${NC}"
    echo -e "${YELLOW}  - Default output format (json)${NC}"
    exit 1
fi

# Check if dist folder exists
if [ ! -d "$DIST_FOLDER" ]; then
    echo -e "${RED}❌ Build folder 'dist' not found. Please run 'npm run build' first.${NC}"
    exit 1
fi

echo -e "${BLUE}📦 Uploading files to S3 bucket: $BUCKET_NAME${NC}"

# Upload all files to S3
aws s3 sync $DIST_FOLDER s3://$BUCKET_NAME --delete --region $REGION

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Files uploaded successfully${NC}"
else
    echo -e "${RED}❌ Failed to upload files${NC}"
    exit 1
fi

# Set proper content types for better performance
echo -e "${BLUE}🔧 Setting content types and cache headers...${NC}"

# Set HTML files with no cache
aws s3 cp s3://$BUCKET_NAME/index.html s3://$BUCKET_NAME/index.html \
    --content-type "text/html" \
    --cache-control "no-cache, no-store, must-revalidate" \
    --metadata-directive REPLACE \
    --region $REGION

# Set CSS files with 1 year cache
aws s3 cp s3://$BUCKET_NAME/assets/ s3://$BUCKET_NAME/assets/ \
    --recursive --exclude "*" --include "*.css" \
    --content-type "text/css" \
    --cache-control "max-age=31536000, immutable" \
    --metadata-directive REPLACE \
    --region $REGION

# Set JS files with 1 year cache
aws s3 cp s3://$BUCKET_NAME/assets/ s3://$BUCKET_NAME/assets/ \
    --recursive --exclude "*" --include "*.js" \
    --content-type "application/javascript" \
    --cache-control "max-age=31536000, immutable" \
    --metadata-directive REPLACE \
    --region $REGION

# Set image files with 1 month cache
aws s3 cp s3://$BUCKET_NAME/assets/ s3://$BUCKET_NAME/assets/ \
    --recursive --exclude "*" --include "*.png" --include "*.jpg" --include "*.jpeg" --include "*.webp" --include "*.svg" \
    --cache-control "max-age=2592000" \
    --metadata-directive REPLACE \
    --region $REGION

echo -e "${GREEN}✅ Deployment completed!${NC}"
echo -e "${CYAN}🌐 Your website URL: http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com${NC}"
echo ""
echo -e "${YELLOW}📝 Next steps:${NC}"
echo -e "   ${NC}1. Set up CloudFront for HTTPS and better performance${NC}"
echo -e "   ${NC}2. Configure custom domain (optional)${NC}"
echo -e "   ${NC}3. Test your website${NC}"
echo ""
echo -e "${CYAN}💡 Pro Tip: Use the quick-deploy.sh script for automated bucket creation!${NC}"
