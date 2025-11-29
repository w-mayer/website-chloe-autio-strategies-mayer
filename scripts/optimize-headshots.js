#!/usr/bin/env node

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Source from original high-res images
const sourceDir = path.join(__dirname, '../public/images/headshot-orig');
const outputDir = path.join(__dirname, '../public/images/headshot/optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Responsive size configurations (width-based, preserving aspect ratio)
const SIZES = {
  thumbnail: 200,
  small: 400,
  medium: 600,
  large: 800,
};

// High-quality WebP settings
const WEBP_OPTIONS = {
  quality: 92,
  effort: 6, // Higher effort = better compression (0-6)
  smartSubsample: true,
  nearLossless: false,
};

async function getImageMetadata(inputPath) {
  try {
    const metadata = await sharp(inputPath).metadata();
    return metadata;
  } catch (error) {
    console.error(`Error reading metadata for ${inputPath}:`, error);
    return null;
  }
}

async function optimizeImage(inputPath, outputBaseName) {
  const metadata = await getImageMetadata(inputPath);
  if (!metadata) {
    console.error(`❌ Could not read: ${path.basename(inputPath)}`);
    return;
  }

  console.log(`📷 Processing: ${path.basename(inputPath)}`);
  console.log(`   Original: ${metadata.width}x${metadata.height} (${metadata.format})`);

  // Generate each responsive size
  for (const [sizeName, targetWidth] of Object.entries(SIZES)) {
    const outputPath = path.join(outputDir, `${outputBaseName}-${sizeName}.webp`);
    
    try {
      await sharp(inputPath)
        .resize(targetWidth, null, {
          fit: 'inside', // Preserve aspect ratio, don't crop
          withoutEnlargement: true, // Don't upscale if source is smaller
        })
        .sharpen({
          sigma: 0.5, // Subtle sharpening to counteract resize softening
          m1: 0.5,
          m2: 0.5,
        })
        .webp(WEBP_OPTIONS)
        .toFile(outputPath);

      const stats = fs.statSync(outputPath);
      console.log(`   ✅ ${sizeName}: ${targetWidth}w → ${(stats.size / 1024).toFixed(1)}KB`);
    } catch (error) {
      console.error(`   ❌ Error creating ${sizeName}:`, error.message);
    }
  }

  // Also create a default version at the largest size
  const defaultOutputPath = path.join(outputDir, `${outputBaseName}.webp`);
  try {
    await sharp(inputPath)
      .resize(SIZES.large, null, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .sharpen({
        sigma: 0.5,
        m1: 0.5,
        m2: 0.5,
      })
      .webp(WEBP_OPTIONS)
      .toFile(defaultOutputPath);

    const stats = fs.statSync(defaultOutputPath);
    console.log(`   ✅ default: ${SIZES.large}w → ${(stats.size / 1024).toFixed(1)}KB`);
  } catch (error) {
    console.error(`   ❌ Error creating default:`, error.message);
  }

  console.log('');
}

async function optimizeHeadshots() {
  console.log('🔄 Optimizing headshot images from original high-res sources...\n');
  console.log(`📁 Source: ${sourceDir}`);
  console.log(`📁 Output: ${outputDir}\n`);

  // Map original filenames to output names
  const images = [
    {
      input: path.join(sourceDir, 'Chloe Headshot Website.jpg'),
      outputBaseName: 'autio_headshot',
    },
    {
      input: path.join(sourceDir, 'Sam Headshot.jpeg'),
      outputBaseName: 'wells_headshot',
    },
    {
      // Lim headshot source is in the regular headshot folder
      input: path.join(__dirname, '../public/images/headshot/lim_headshot.jpg'),
      outputBaseName: 'lim_headshot',
    },
  ];

  for (const image of images) {
    if (fs.existsSync(image.input)) {
      await optimizeImage(image.input, image.outputBaseName);
    } else {
      console.log(`⚠️  File not found: ${image.input}`);
    }
  }

  console.log('🎉 Headshot optimization complete!');
  console.log('\n📊 Generated responsive sizes:');
  Object.entries(SIZES).forEach(([name, width]) => {
    console.log(`   - ${name}: ${width}px width`);
  });
  console.log('\n💡 Images are optimized with:');
  console.log('   - Preserved aspect ratios (no distortion)');
  console.log('   - High-quality WebP compression (quality: 92)');
  console.log('   - Subtle sharpening for crisp details');
  console.log('   - Multiple responsive sizes for fast loading');
}

// Run the optimization
optimizeHeadshots().catch(console.error);
