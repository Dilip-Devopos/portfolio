#!/bin/bash

# 🚀 Quick AWS Deployment Script for Portfolio (Ubuntu/Linux)
# This script will build and deploy your portfolio to AWS S3

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

# Default values
REGION="us-east-1"
DISTRIBUTION_ID=""

# Function to display usage
usage() {
    echo -e "${CYAN}🚀 Portfolio AWS Deployment Script${NC}"
    echo -e "${CYAN}=================================${NC}"
    echo ""
    echo "Usage: $0 -b BUCKET_NAME [-r REGION] [-d DISTRIBUTION_ID]"
    echo ""
    echo "Options:"
    echo "  -b BUCKET_NAME     S3 bucket name (required)"
    echo "  -r REGION          AWS region (default: us-east-1)"
    echo "  -d DISTRIBUTION_ID CloudFront distribution ID (optional)"
    echo "  -h                 Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 -b my-portfolio-2024"
    echo "  $0 -b my-portfolio-2024 -r us-west-2"
    echo "  $0 -b my-portfolio-2024 -d E123456789ABCD"
    exit 1
}

# Parse command line arguments
while getopts "b:r:d:h" opt; do
    case $opt in
        b) BUCKET_NAME="$OPTARG" ;;
        r) REGION="$OPTARG" ;;
        d) DISTRIBUTION_ID="$OPTARG" ;;
        h) usage ;;
        \?) echo "Invalid option -$OPTARG" >&2; usage ;;
    esac
done

# Check if bucket name is provided
if [ -z "$BUCKET_NAME" ]; then
    echo -e "${RED}❌ Bucket name is required${NC}"
    usage
fi

echo -e "${CYAN}🚀 Portfolio AWS Deployment Script${NC}"
echo -e "${CYAN}=================================${NC}"

# Check prerequisites
echo -e "${YELLOW}🔍 Checking prerequisites...${NC}"

# Check if Node.js is installed
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${GREEN}✅ Node.js found: $NODE_VERSION${NC}"
else
    echo -e "${RED}❌ Node.js not found. Installing Node.js...${NC}"
    
    # Install Node.js using NodeSource repository
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
    
    if command -v node &> /dev/null; then
        echo -e "${GREEN}✅ Node.js installed successfully${NC}"
    else
        echo -e "${RED}❌ Failed to install Node.js${NC}"
        exit 1
    fi
fi

# Check if npm is installed
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "${GREEN}✅ npm found: $NPM_VERSION${NC}"
else
    echo -e "${RED}❌ npm not found${NC}"
    exit 1
fi

# Check if AWS CLI is installed
if command -v aws &> /dev/null; then
    echo -e "${GREEN}✅ AWS CLI found${NC}"
else
    echo -e "${YELLOW}📦 Installing AWS CLI v2...${NC}"
    
    # Install required packages
    sudo apt update
    sudo apt install -y curl unzip
    
    # Download and install AWS CLI v2
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
    unzip awscliv2.zip
    sudo ./aws/install
    
    # Cleanup
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
    ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
    echo -e "${WHITE}   Account ID: $ACCOUNT_ID${NC}"
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

# Build the portfolio
echo -e "${BLUE}🔨 Building portfolio...${NC}"
if npm run build; then
    echo -e "${GREEN}✅ Build completed successfully${NC}"
else
    echo -e "${RED}❌ Build failed. Please check your code.${NC}"
    exit 1
fi

# Check if dist folder exists
if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Build output 'dist' folder not found.${NC}"
    exit 1
fi

# Create S3 bucket if it doesn't exist
echo -e "${BLUE}🪣 Checking S3 bucket...${NC}"
if aws s3api head-bucket --bucket "$BUCKET_NAME" --region "$REGION" 2>/dev/null; then
    echo -e "${GREEN}✅ Bucket '$BUCKET_NAME' exists${NC}"
else
    echo -e "${YELLOW}📦 Creating S3 bucket '$BUCKET_NAME'...${NC}"
    
    if [ "$REGION" = "us-east-1" ]; then
        aws s3api create-bucket --bucket "$BUCKET_NAME" --region "$REGION"
    else
        aws s3api create-bucket --bucket "$BUCKET_NAME" --region "$REGION" \
            --create-bucket-configuration LocationConstraint="$REGION"
    fi
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Bucket created successfully${NC}"
    else
        echo -e "${RED}❌ Failed to create bucket. It might already exist or name is taken.${NC}"
        exit 1
    fi
fi

# Configure bucket for static website hosting
echo -e "${BLUE}🌐 Configuring static website hosting...${NC}"
aws s3api put-bucket-website --bucket "$BUCKET_NAME" --website-configuration '{
    "IndexDocument": {"Suffix": "index.html"},
    "ErrorDocument": {"Key": "index.html"}
}' --region "$REGION"

# Set bucket policy for public read access
echo -e "${BLUE}🔓 Setting bucket policy for public access...${NC}"
cat > bucket-policy.json << EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BUCKET_NAME/*"
        }
    ]
}
EOF

aws s3api put-bucket-policy --bucket "$BUCKET_NAME" --policy file://bucket-policy.json --region "$REGION"
rm bucket-policy.json

# Upload files to S3
echo -e "${BLUE}📤 Uploading files to S3...${NC}"
aws s3 sync dist/ s3://"$BUCKET_NAME" --delete --region "$REGION"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Files uploaded successfully${NC}"
else
    echo -e "${RED}❌ Failed to upload files${NC}"
    exit 1
fi

# Set cache headers for optimization
echo -e "${BLUE}⚡ Optimizing cache headers...${NC}"

# Cache assets for 1 year
aws s3 cp s3://"$BUCKET_NAME"/assets/ s3://"$BUCKET_NAME"/assets/ \
    --recursive --cache-control "max-age=31536000, immutable" \
    --metadata-directive REPLACE --region "$REGION"

# Don't cache HTML files
aws s3 cp s3://"$BUCKET_NAME"/index.html s3://"$BUCKET_NAME"/index.html \
    --cache-control "no-cache, no-store, must-revalidate" \
    --metadata-directive REPLACE --region "$REGION"

# Invalidate CloudFront cache if distribution ID provided
if [ -n "$DISTRIBUTION_ID" ]; then
    echo -e "${BLUE}🌐 Invalidating CloudFront cache...${NC}"
    aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION_ID" --paths "/*"
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ CloudFront cache invalidated${NC}"
    else
        echo -e "${YELLOW}⚠️ Failed to invalidate CloudFront cache${NC}"
    fi
fi

# Display results
echo ""
echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo -e "${CYAN}=================================${NC}"
echo -e "${WHITE}📊 Deployment Summary:${NC}"
echo -e "   ${WHITE}Bucket: $BUCKET_NAME${NC}"
echo -e "   ${WHITE}Region: $REGION${NC}"
echo -e "   ${CYAN}Website URL: http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com${NC}"

if [ -n "$DISTRIBUTION_ID" ]; then
    echo -e "   ${WHITE}CloudFront: Cache invalidated${NC}"
fi

echo ""
echo -e "${YELLOW}🔗 Next Steps:${NC}"
echo -e "   ${WHITE}1. Test your website at the URL above${NC}"
echo -e "   ${WHITE}2. Set up CloudFront for HTTPS and better performance${NC}"
echo -e "   ${WHITE}3. Configure custom domain (optional)${NC}"
echo -e "   ${WHITE}4. Set up monitoring and alerts${NC}"

echo ""
echo -e "${CYAN}💡 Pro Tip: For HTTPS and custom domain, follow the CloudFront guide!${NC}"

# Make the script executable
chmod +x "$0"
