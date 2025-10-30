#!/bin/bash

# GAAKA Development Helper Script
# Usage: ./scripts/dev.sh [command]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Project info
PROJECT_NAME="GAAKA E-commerce"
PROJECT_VERSION=$(node -p "require('./package.json').version")

echo -e "${BLUE}🧺 ${PROJECT_NAME} v${PROJECT_VERSION}${NC}"
echo -e "${BLUE}Development Helper Script${NC}"
echo ""

# Function definitions
help() {
    echo -e "${YELLOW}Available commands:${NC}"
    echo "  setup     - Initial project setup"
    echo "  dev       - Start development server"
    echo "  build     - Build for production"
    echo "  lint      - Run code linting"
    echo "  clean     - Clean build artifacts"
    echo "  deploy    - Deploy to production"
    echo "  check     - Run all quality checks"
    echo "  help      - Show this help message"
}

setup() {
    echo -e "${YELLOW}🔧 Setting up project...${NC}"
    
    # Check Node version
    NODE_VERSION=$(node -v)
    echo -e "Node.js version: ${NODE_VERSION}"
    
    # Install dependencies
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    npm install
    
    # Create .env.local if it doesn't exist
    if [ ! -f .env.local ]; then
        echo -e "${YELLOW}📝 Creating .env.local file...${NC}"
        cat > .env.local << EOL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ANALYTICS_ID=
EOL
        echo -e "${GREEN}✅ Created .env.local - please update with your values${NC}"
    fi
    
    echo -e "${GREEN}✅ Setup complete!${NC}"
}

dev() {
    echo -e "${YELLOW}🚀 Starting development server...${NC}"
    npm run dev
}

build() {
    echo -e "${YELLOW}🏗️  Building for production...${NC}"
    npm run build
    echo -e "${GREEN}✅ Build complete!${NC}"
}

lint() {
    echo -e "${YELLOW}🔍 Running code linting...${NC}"
    npm run lint
    echo -e "${GREEN}✅ Linting complete!${NC}"
}

clean() {
    echo -e "${YELLOW}🧹 Cleaning build artifacts...${NC}"
    rm -rf .next
    rm -rf node_modules/.cache
    echo -e "${GREEN}✅ Clean complete!${NC}"
}

deploy() {
    echo -e "${YELLOW}🚀 Deploying to production...${NC}"
    
    # Run checks first
    check
    
    # Build
    build
    
    # Deploy (assumes Vercel CLI is installed)
    if command -v vercel &> /dev/null; then
        vercel --prod
        echo -e "${GREEN}✅ Deployment complete!${NC}"
    else
        echo -e "${RED}❌ Vercel CLI not found. Install with: npm i -g vercel${NC}"
        exit 1
    fi
}

check() {
    echo -e "${YELLOW}🔍 Running quality checks...${NC}"
    
    # Type check
    echo -e "${BLUE}Checking TypeScript...${NC}"
    npx tsc --noEmit
    
    # Lint check
    echo -e "${BLUE}Checking code style...${NC}"
    npm run lint
    
    # Build check
    echo -e "${BLUE}Testing build...${NC}"
    npm run build
    
    echo -e "${GREEN}✅ All checks passed!${NC}"
}

# Main command processing
case "$1" in
    setup)
        setup
        ;;
    dev)
        dev
        ;;
    build)
        build
        ;;
    lint)
        lint
        ;;
    clean)
        clean
        ;;
    deploy)
        deploy
        ;;
    check)
        check
        ;;
    help|*)
        help
        ;;
esac