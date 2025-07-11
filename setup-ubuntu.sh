#!/bin/bash

# 🛠️ Ubuntu Setup Script for Portfolio Deployment
# This script installs all required dependencies for deploying your portfolio to AWS

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

echo -e "${CYAN}🛠️ Ubuntu Setup for Portfolio Deployment${NC}"
echo -e "${CYAN}=======================================${NC}"
echo ""

# Update package list
echo -e "${BLUE}📦 Updating package list...${NC}"
sudo apt update

# Install essential packages
echo -e "${BLUE}📦 Installing essential packages...${NC}"
sudo apt install -y curl wget unzip git build-essential

# Install Node.js 18.x (LTS)
echo -e "${BLUE}📦 Installing Node.js 18.x LTS...${NC}"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "${YELLOW}⚠️ Node.js already installed: $NODE_VERSION${NC}"
    echo -e "${YELLOW}Do you want to update to Node.js 18.x? (y/n)${NC}"
    read -r response
    if [[ "$response" =~ ^([yY][eS]|[yY])$ ]]; then
        # Remove existing Node.js
        sudo apt remove -y nodejs npm
        sudo apt autoremove -y
    else
        echo -e "${GREEN}✅ Keeping existing Node.js installation${NC}"
    fi
fi

# Install Node.js 18.x using NodeSource repository
if ! command -v node &> /dev/null || [[ "$response" =~ ^([yY][eS]|[yY])$ ]]; then
    echo -e "${BLUE}📥 Downloading Node.js 18.x setup script...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    
    echo -e "${BLUE}📦 Installing Node.js and npm...${NC}"
    sudo apt-get install -y nodejs
    
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        NPM_VERSION=$(npm --version)
        echo -e "${GREEN}✅ Node.js installed: $NODE_VERSION${NC}"
        echo -e "${GREEN}✅ npm installed: $NPM_VERSION${NC}"
    else
        echo -e "${RED}❌ Failed to install Node.js${NC}"
        exit 1
    fi
fi

# Install AWS CLI v2
echo -e "${BLUE}📦 Installing AWS CLI v2...${NC}"
if command -v aws &> /dev/null; then
    AWS_VERSION=$(aws --version)
    echo -e "${YELLOW}⚠️ AWS CLI already installed: $AWS_VERSION${NC}"
    echo -e "${YELLOW}Do you want to update to the latest version? (y/n)${NC}"
    read -r response
    if [[ "$response" =~ ^([yY][eS]|[yY])$ ]]; then
        sudo rm -rf /usr/local/aws-cli
        sudo rm /usr/local/bin/aws
        sudo rm /usr/local/bin/aws_completer
    else
        echo -e "${GREEN}✅ Keeping existing AWS CLI installation${NC}"
    fi
fi

if ! command -v aws &> /dev/null || [[ "$response" =~ ^([yY][eS]|[yY])$ ]]; then
    echo -e "${BLUE}📥 Downloading AWS CLI v2...${NC}"
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
    
    echo -e "${BLUE}📦 Installing AWS CLI v2...${NC}"
    unzip awscliv2.zip
    sudo ./aws/install
    
    # Cleanup
    rm -rf awscliv2.zip aws/
    
    if command -v aws &> /dev/null; then
        AWS_VERSION=$(aws --version)
        echo -e "${GREEN}✅ AWS CLI installed: $AWS_VERSION${NC}"
    else
        echo -e "${RED}❌ Failed to install AWS CLI${NC}"
        exit 1
    fi
fi

# Install Git (if not already installed)
if ! command -v git &> /dev/null; then
    echo -e "${BLUE}📦 Installing Git...${NC}"
    sudo apt install -y git
    
    if command -v git &> /dev/null; then
        GIT_VERSION=$(git --version)
        echo -e "${GREEN}✅ Git installed: $GIT_VERSION${NC}"
    else
        echo -e "${RED}❌ Failed to install Git${NC}"
    fi
else
    GIT_VERSION=$(git --version)
    echo -e "${GREEN}✅ Git already installed: $GIT_VERSION${NC}"
fi

# Make deployment scripts executable
echo -e "${BLUE}🔧 Making deployment scripts executable...${NC}"
if [ -f "quick-deploy.sh" ]; then
    chmod +x quick-deploy.sh
    echo -e "${GREEN}✅ quick-deploy.sh is now executable${NC}"
fi

if [ -f "deploy-s3.sh" ]; then
    chmod +x deploy-s3.sh
    echo -e "${GREEN}✅ deploy-s3.sh is now executable${NC}"
fi

# Display installation summary
echo ""
echo -e "${GREEN}🎉 Setup completed successfully!${NC}"
echo -e "${CYAN}================================${NC}"
echo -e "${WHITE}📊 Installed Software:${NC}"

if command -v node &> /dev/null; then
    echo -e "   ${GREEN}✅ Node.js: $(node --version)${NC}"
else
    echo -e "   ${RED}❌ Node.js: Not installed${NC}"
fi

if command -v npm &> /dev/null; then
    echo -e "   ${GREEN}✅ npm: $(npm --version)${NC}"
else
    echo -e "   ${RED}❌ npm: Not installed${NC}"
fi

if command -v aws &> /dev/null; then
    echo -e "   ${GREEN}✅ AWS CLI: $(aws --version | cut -d' ' -f1)${NC}"
else
    echo -e "   ${RED}❌ AWS CLI: Not installed${NC}"
fi

if command -v git &> /dev/null; then
    echo -e "   ${GREEN}✅ Git: $(git --version | cut -d' ' -f3)${NC}"
else
    echo -e "   ${RED}❌ Git: Not installed${NC}"
fi

echo ""
echo -e "${YELLOW}🔗 Next Steps:${NC}"
echo -e "   ${WHITE}1. Configure AWS credentials: ${CYAN}aws configure${NC}"
echo -e "   ${WHITE}2. Build your portfolio: ${CYAN}npm run build${NC}"
echo -e "   ${WHITE}3. Deploy to AWS: ${CYAN}./quick-deploy.sh -b your-bucket-name${NC}"

echo ""
echo -e "${CYAN}💡 AWS Configuration:${NC}"
echo -e "   ${WHITE}You'll need:${NC}"
echo -e "   ${WHITE}• AWS Access Key ID${NC}"
echo -e "   ${WHITE}• AWS Secret Access Key${NC}"
echo -e "   ${WHITE}• Default region (e.g., us-east-1)${NC}"
echo -e "   ${WHITE}• Default output format (json)${NC}"

echo ""
echo -e "${CYAN}🚀 Ready to deploy your portfolio to AWS!${NC}"
