/**
 * Resize carousel logos and header logo to optimal sizes for performance
 * 
 * This script resizes oversized logo images to 2x their display dimensions
 * to support retina displays while minimizing download size.
 * 
 * Run with: node scripts/resize-carousel-logos.js
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

// Quality setting for WebP output (85-90 is good for logos)
const QUALITY = 90;

// Logo configurations with target 2x display sizes
// Based on display sizes in ClientLogosCarousel.tsx and header.tsx
const LOGO_CONFIGS = [
  // Carousel logos (from ClientLogosCarousel.tsx logoSizes)
  {
    input: 'public/images/partner_logos/optimized/Google_DeepMind_logo.webp',
    output: 'public/images/partner_logos/optimized/Google_DeepMind_logo.webp',
    width: 440,  // 2x of 220
    height: 180, // 2x of 90
    name: 'Google DeepMind'
  },
  {
    input: 'public/images/partner_logos/optimized/Google_Cloud_Platform-Logo.webp',
    output: 'public/images/partner_logos/optimized/Google_Cloud_Platform-Logo.webp',
    width: 480,  // 2x of 240
    height: 280, // 2x of 140
    name: 'Google Cloud Platform'
  },
  {
    input: 'public/images/partner_logos/optimized/Cohere-Logo.webp',
    output: 'public/images/partner_logos/optimized/Cohere-Logo.webp',
    width: 400,  // 2x of 200
    height: 160, // 2x of 80
    name: 'Cohere'
  },
  {
    input: 'public/images/partner_logos/optimized/DoD-Logo-Stacked.webp',
    output: 'public/images/partner_logos/optimized/DoD-Logo-Stacked.webp',
    width: 340,  // 2x of 170
    height: 170, // 2x of 85
    name: 'Department of Defense'
  },
  {
    input: 'public/images/partner_logos/optimized/f_nist-logo-brand-black.webp',
    output: 'public/images/partner_logos/optimized/f_nist-logo-brand-black.webp',
    width: 600,  // 2x of 300
    height: 260, // 2x of 130
    name: 'NIST'
  },
  // Header logo (from header.tsx)
  {
    input: 'public/images/logo/optimized/AutioStrategies_Logo_FullColor_Horz (1).webp',
    output: 'public/images/logo/optimized/AutioStrategies_Logo_FullColor_Horz (1).webp',
    width: 276,  // 2x of 138
    height: 80,  // 2x of 40
    name: 'AutioStrategies Header Logo'
  }
];

// Backup directory and resized output directory
const BACKUP_DIR = 'public/images/logo-backups';
const RESIZED_DIR = 'public/images/logo-resized';

async function ensureDirectories() {
  try {
    await fs.mkdir(BACKUP_DIR, { recursive: true });
    await fs.mkdir(RESIZED_DIR, { recursive: true });
  } catch (error) {
    // Directories might already exist
  }
}

async function backupFile(filePath) {
  const fileName = path.basename(filePath);
  const backupPath = path.join(BACKUP_DIR, fileName);
  
  try {
    // Check if file exists
    await fs.access(filePath);
    
    // Check if backup already exists
    try {
      await fs.access(backupPath);
      console.log(`  📦 Backup already exists: ${fileName}`);
      return true;
    } catch {
      // Backup doesn't exist, create it
      await fs.copyFile(filePath, backupPath);
      console.log(`  📦 Backed up: ${fileName}`);
      return true;
    }
  } catch (error) {
    console.error(`  ❌ File not found: ${filePath}`);
    return false;
  }
}

async function getFileSize(filePath) {
  try {
    const stats = await fs.stat(filePath);
    return stats.size;
  } catch {
    return 0;
  }
}

async function getImageDimensions(filePath) {
  try {
    const metadata = await sharp(filePath).metadata();
    return { width: metadata.width, height: metadata.height };
  } catch {
    return { width: 0, height: 0 };
  }
}

async function resizeLogo(config) {
  console.log(`\n🔄 Processing: ${config.name}`);
  
  // Get original file info
  const originalSize = await getFileSize(config.input);
  const originalDimensions = await getImageDimensions(config.input);
  
  if (originalSize === 0) {
    console.log(`  ❌ Skipping - file not found`);
    return null;
  }
  
  console.log(`  📐 Original: ${originalDimensions.width}x${originalDimensions.height} (${(originalSize / 1024).toFixed(1)} KB)`);
  console.log(`  🎯 Target: ${config.width}x${config.height}`);
  
  // Skip if already smaller than target
  if (originalDimensions.width <= config.width && originalDimensions.height <= config.height) {
    console.log(`  ✅ Already optimized - skipping`);
    return { savings: 0, name: config.name };
  }
  
  // Backup original
  const backedUp = await backupFile(config.input);
  if (!backedUp) {
    return null;
  }
  
  // Output to resized directory first (avoids file locking issues)
  const fileName = path.basename(config.input);
  const resizedPath = path.join(RESIZED_DIR, fileName);
  
  try {
    // Resize image while maintaining aspect ratio
    await sharp(config.input)
      .resize(config.width, config.height, {
        fit: 'inside',           // Fit within bounds, maintain aspect ratio
        withoutEnlargement: true // Don't upscale if smaller
      })
      .webp({ quality: QUALITY })
      .toFile(resizedPath);
    
    // Get new file size
    const newSize = await getFileSize(resizedPath);
    const newDimensions = await getImageDimensions(resizedPath);
    
    const savings = originalSize - newSize;
    const savingsPercent = ((savings / originalSize) * 100).toFixed(1);
    
    console.log(`  ✅ Resized: ${newDimensions.width}x${newDimensions.height} (${(newSize / 1024).toFixed(1)} KB)`);
    console.log(`  💾 Saved: ${(savings / 1024).toFixed(1)} KB (${savingsPercent}%)`);
    console.log(`  📁 Output: ${resizedPath}`);
    
    return { savings, name: config.name, resizedPath, originalPath: config.output };
  } catch (error) {
    console.error(`  ❌ Error resizing: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('🚀 Starting carousel logo optimization...');
  console.log(`📊 Quality setting: ${QUALITY}`);
  console.log(`📁 Backup directory: ${BACKUP_DIR}`);
  console.log(`📁 Resized output: ${RESIZED_DIR}`);
  
  await ensureDirectories();
  
  let totalSavings = 0;
  let processedCount = 0;
  const results = [];
  
  for (const config of LOGO_CONFIGS) {
    const result = await resizeLogo(config);
    if (result) {
      totalSavings += result.savings;
      processedCount++;
      results.push(result);
    }
  }
  
  // Now copy the resized files to their original locations
  console.log('\n📋 Copying resized files to original locations...');
  let copiedCount = 0;
  for (const result of results) {
    if (result.resizedPath && result.originalPath) {
      try {
        await fs.copyFile(result.resizedPath, result.originalPath);
        console.log(`  ✅ Copied: ${path.basename(result.originalPath)}`);
        copiedCount++;
      } catch (error) {
        console.log(`  ⚠️  Could not copy ${path.basename(result.originalPath)}: ${error.message}`);
        console.log(`     Manual copy needed from: ${result.resizedPath}`);
      }
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 SUMMARY');
  console.log('='.repeat(50));
  console.log(`✅ Processed: ${processedCount}/${LOGO_CONFIGS.length} logos`);
  console.log(`📋 Copied: ${copiedCount}/${processedCount} files`);
  console.log(`💾 Total savings: ${(totalSavings / 1024).toFixed(1)} KB`);
  console.log(`📦 Backups stored in: ${BACKUP_DIR}`);
  console.log(`📁 Resized files in: ${RESIZED_DIR}`);
  
  if (copiedCount < processedCount) {
    console.log('\n⚠️  Some files could not be copied (likely locked by dev server).');
    console.log('   Stop the dev server and run this script again, or manually copy');
    console.log('   files from the resized directory to their original locations.');
  }
  
  console.log('\n🎉 Optimization complete!');
}

// Run if executed directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { resizeLogo, LOGO_CONFIGS };

