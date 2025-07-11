# 🚀 Quick AWS Deployment Script for Portfolio
# This script will build and deploy your portfolio to AWS S3

param(
    [Parameter(Mandatory=$true)]
    [string]$BucketName,
    
    [Parameter(Mandatory=$false)]
    [string]$Region = "us-east-1",
    
    [Parameter(Mandatory=$false)]
    [string]$DistributionId = ""
)

Write-Host "🚀 Portfolio AWS Deployment Script" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan

# Check prerequisites
Write-Host "🔍 Checking prerequisites..." -ForegroundColor Yellow

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Check if AWS CLI is installed
try {
    $awsVersion = aws --version
    Write-Host "✅ AWS CLI found" -ForegroundColor Green
} catch {
    Write-Host "❌ AWS CLI not found. Please install AWS CLI first." -ForegroundColor Red
    Write-Host "Download from: https://aws.amazon.com/cli/" -ForegroundColor Yellow
    exit 1
}

# Check AWS credentials
try {
    aws sts get-caller-identity | Out-Null
    Write-Host "✅ AWS credentials configured" -ForegroundColor Green
} catch {
    Write-Host "❌ AWS credentials not configured. Run 'aws configure' first." -ForegroundColor Red
    exit 1
}

# Build the portfolio
Write-Host "🔨 Building portfolio..." -ForegroundColor Blue
try {
    npm run build
    Write-Host "✅ Build completed successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ Build failed. Please check your code." -ForegroundColor Red
    exit 1
}

# Check if dist folder exists
if (-not (Test-Path "dist")) {
    Write-Host "❌ Build output 'dist' folder not found." -ForegroundColor Red
    exit 1
}

# Create S3 bucket if it doesn't exist
Write-Host "🪣 Checking S3 bucket..." -ForegroundColor Blue
try {
    aws s3api head-bucket --bucket $BucketName --region $Region 2>$null
    Write-Host "✅ Bucket '$BucketName' exists" -ForegroundColor Green
} catch {
    Write-Host "📦 Creating S3 bucket '$BucketName'..." -ForegroundColor Yellow
    
    if ($Region -eq "us-east-1") {
        aws s3api create-bucket --bucket $BucketName --region $Region
    } else {
        aws s3api create-bucket --bucket $BucketName --region $Region --create-bucket-configuration LocationConstraint=$Region
    }
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Bucket created successfully" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to create bucket. It might already exist or name is taken." -ForegroundColor Red
        exit 1
    }
}

# Configure bucket for static website hosting
Write-Host "🌐 Configuring static website hosting..." -ForegroundColor Blue
aws s3api put-bucket-website --bucket $BucketName --website-configuration '{
    "IndexDocument": {"Suffix": "index.html"},
    "ErrorDocument": {"Key": "index.html"}
}' --region $Region

# Set bucket policy for public read access
Write-Host "🔓 Setting bucket policy for public access..." -ForegroundColor Blue
$bucketPolicy = @"
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BucketName/*"
        }
    ]
}
"@

$bucketPolicy | Out-File -FilePath "bucket-policy.json" -Encoding UTF8
aws s3api put-bucket-policy --bucket $BucketName --policy file://bucket-policy.json --region $Region
Remove-Item "bucket-policy.json"

# Upload files to S3
Write-Host "📤 Uploading files to S3..." -ForegroundColor Blue
aws s3 sync dist/ s3://$BucketName --delete --region $Region

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Files uploaded successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to upload files" -ForegroundColor Red
    exit 1
}

# Set cache headers for optimization
Write-Host "⚡ Optimizing cache headers..." -ForegroundColor Blue

# Cache assets for 1 year
aws s3 cp s3://$BucketName/assets/ s3://$BucketName/assets/ --recursive --cache-control "max-age=31536000" --metadata-directive REPLACE --region $Region

# Don't cache HTML files
aws s3 cp s3://$BucketName/index.html s3://$BucketName/index.html --cache-control "no-cache" --metadata-directive REPLACE --region $Region

# Invalidate CloudFront cache if distribution ID provided
if ($DistributionId -ne "") {
    Write-Host "🌐 Invalidating CloudFront cache..." -ForegroundColor Blue
    aws cloudfront create-invalidation --distribution-id $DistributionId --paths "/*"
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ CloudFront cache invalidated" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Failed to invalidate CloudFront cache" -ForegroundColor Yellow
    }
}

# Display results
Write-Host ""
Write-Host "🎉 Deployment completed successfully!" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Cyan
Write-Host "📊 Deployment Summary:" -ForegroundColor White
Write-Host "   Bucket: $BucketName" -ForegroundColor White
Write-Host "   Region: $Region" -ForegroundColor White
Write-Host "   Website URL: http://$BucketName.s3-website-$Region.amazonaws.com" -ForegroundColor Cyan

if ($DistributionId -ne "") {
    Write-Host "   CloudFront: Cache invalidated" -ForegroundColor White
}

Write-Host ""
Write-Host "🔗 Next Steps:" -ForegroundColor Yellow
Write-Host "   1. Test your website at the URL above" -ForegroundColor White
Write-Host "   2. Set up CloudFront for HTTPS and better performance" -ForegroundColor White
Write-Host "   3. Configure custom domain (optional)" -ForegroundColor White
Write-Host "   4. Set up monitoring and alerts" -ForegroundColor White

Write-Host ""
Write-Host "💡 Pro Tip: For HTTPS and custom domain, follow the CloudFront guide!" -ForegroundColor Cyan
