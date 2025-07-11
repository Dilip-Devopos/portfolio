# AWS S3 Deployment Script for Portfolio
# Run this script after building your portfolio

# Configuration
$BUCKET_NAME = "your-portfolio-bucket"  # Replace with your bucket name
$REGION = "us-east-1"  # Replace with your region
$DIST_FOLDER = "dist"

Write-Host "🚀 Starting AWS S3 deployment..." -ForegroundColor Green

# Check if AWS CLI is installed
try {
    aws --version
    Write-Host "✅ AWS CLI found" -ForegroundColor Green
} catch {
    Write-Host "❌ AWS CLI not found. Please install AWS CLI first." -ForegroundColor Red
    Write-Host "Download from: https://aws.amazon.com/cli/" -ForegroundColor Yellow
    exit 1
}

# Check if dist folder exists
if (-not (Test-Path $DIST_FOLDER)) {
    Write-Host "❌ Build folder 'dist' not found. Please run 'npm run build' first." -ForegroundColor Red
    exit 1
}

Write-Host "📦 Uploading files to S3 bucket: $BUCKET_NAME" -ForegroundColor Blue

# Upload all files to S3
aws s3 sync $DIST_FOLDER s3://$BUCKET_NAME --delete --region $REGION

# Set proper content types for better performance
Write-Host "🔧 Setting content types..." -ForegroundColor Blue

# Set HTML files
aws s3 cp s3://$BUCKET_NAME/index.html s3://$BUCKET_NAME/index.html --content-type "text/html" --metadata-directive REPLACE --region $REGION

# Set CSS files
aws s3 cp s3://$BUCKET_NAME/assets/ s3://$BUCKET_NAME/assets/ --recursive --exclude "*" --include "*.css" --content-type "text/css" --metadata-directive REPLACE --region $REGION

# Set JS files
aws s3 cp s3://$BUCKET_NAME/assets/ s3://$BUCKET_NAME/assets/ --recursive --exclude "*" --include "*.js" --content-type "application/javascript" --metadata-directive REPLACE --region $REGION

# Set cache control for assets (1 year)
aws s3 cp s3://$BUCKET_NAME/assets/ s3://$BUCKET_NAME/assets/ --recursive --cache-control "max-age=31536000" --metadata-directive REPLACE --region $REGION

# Set cache control for HTML (no cache)
aws s3 cp s3://$BUCKET_NAME/index.html s3://$BUCKET_NAME/index.html --cache-control "no-cache" --metadata-directive REPLACE --region $REGION

Write-Host "✅ Deployment completed!" -ForegroundColor Green
Write-Host "🌐 Your website URL: http://$BUCKET_NAME.s3-website-$REGION.amazonaws.com" -ForegroundColor Cyan
Write-Host "📝 Next steps:" -ForegroundColor Yellow
Write-Host "   1. Set up CloudFront for HTTPS and better performance" -ForegroundColor White
Write-Host "   2. Configure custom domain (optional)" -ForegroundColor White
Write-Host "   3. Test your website" -ForegroundColor White
