/**
 * Auth0 Setup Script
 * 
 * This script helps install and configure Auth0 for your Next.js application.
 * Run with: node auth-setup.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n🔐 Auth0 Setup for Myanmar Trusted Shop\n');

// Check if package.json exists
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.error('❌ package.json not found. Please run this script from the project root.');
  process.exit(1);
}

// Install Auth0 dependencies
console.log('📦 Installing Auth0 dependencies...');
try {
  execSync('npm install @auth0/nextjs-auth0', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully!');
} catch (error) {
  console.error('❌ Failed to install dependencies:', error.message);
  process.exit(1);
}

// Create .env.local file if it doesn't exist
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('\n📝 Creating .env.local file...');
  
  rl.question('Enter your Auth0 domain (e.g., your-tenant.auth0.com): ', (domain) => {
    rl.question('Enter your Auth0 Client ID: ', (clientId) => {
      rl.question('Enter your Auth0 Client Secret: ', (clientSecret) => {
        // Generate a random string for AUTH0_SECRET
        const secret = require('crypto').randomBytes(32).toString('hex');
        
        const envContent = `# Auth0 Configuration\nAUTH0_SECRET='${secret}'\nAUTH0_BASE_URL='http://localhost:3000'\nAUTH0_ISSUER_BASE_URL='https://${domain}'\nAUTH0_CLIENT_ID='${clientId}'\nAUTH0_CLIENT_SECRET='${clientSecret}'`;
        
        fs.writeFileSync(envPath, envContent);
        console.log('✅ .env.local file created successfully!');
        
        console.log('\n🎉 Auth0 setup complete! Next steps:');
        console.log('1. Start your development server: npm run dev');
        console.log('2. Visit http://localhost:3000 to test authentication');
        console.log('3. Read AUTH_SETUP.md for more details on the authentication flow');
        
        rl.close();
      });
    });
  });
} else {
  console.log('\n⚠️ .env.local file already exists. Please update it manually with your Auth0 credentials.');
  console.log('\n🎉 Auth0 setup complete! Next steps:');
  console.log('1. Update your .env.local file with your Auth0 credentials');
  console.log('2. Start your development server: npm run dev');
  console.log('3. Visit http://localhost:3000 to test authentication');
  console.log('4. Read AUTH_SETUP.md for more details on the authentication flow');
  
  rl.close();
}
