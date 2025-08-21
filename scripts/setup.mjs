#!/usr/bin/env node

import { execSync } from "child_process";
import { existsSync, copyFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

console.log("🚀 Setting up Twist MCP...\n");

// Install dependencies
console.log("📦 Installing dependencies...");
try {
    execSync("npm install", { cwd: projectRoot, stdio: "inherit" });
    console.log("✅ Dependencies installed successfully\n");
} catch (error) {
    console.error("❌ Failed to install dependencies:", error.message);
    process.exit(1);
}

// Copy .env.example to .env if .env doesn't exist
const envPath = join(projectRoot, ".env");
const envExamplePath = join(projectRoot, ".env.example");

if (!existsSync(envPath)) {
    if (existsSync(envExamplePath)) {
        console.log("📄 Creating .env file from .env.example...");
        try {
            copyFileSync(envExamplePath, envPath);
            console.log("✅ .env file created successfully\n");
        } catch (error) {
            console.error("❌ Failed to create .env file:", error.message);
            process.exit(1);
        }
    } else {
        console.warn(
            "⚠️  .env.example file not found, skipping .env creation\n"
        );
    }
} else {
    console.log("ℹ️  .env file already exists, skipping creation\n");
}

console.log("🎉 Setup complete!");
console.log("\n📝 Next steps:");
console.log("1. Edit the .env file and add your Twist app credentials");
console.log('2. Run "npm start" to start the server');
console.log("3. Visit http://localhost:3000/authorize to begin authentication");
