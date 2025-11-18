const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

async function compressImage(filePath) {
  try {
    const stats = fs.statSync(filePath);
    if (stats.size < 50 * 1024) return; // Skip files < 50KB
    
    const ext = path.extname(filePath).toLowerCase();
    const outputPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    
    // Skip if already WebP and small enough
    if (ext === '.webp' && stats.size < 100 * 1024) return;
    
    const originalSize = stats.size;
    const tempPath = outputPath + '.compress';
    
    await sharp(filePath)
      .resize(1200, null, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 45 })
      .toFile(tempPath);
    
    const newSize = fs.statSync(tempPath).size;
    
    // Only replace if significantly smaller
    if (newSize < originalSize * 0.9) {
      console.log(`${path.basename(filePath)}: ${Math.round(originalSize/1024)} KB -> ${Math.round(newSize/1024)} KB`);
      
      if (fs.existsSync(outputPath)) {
        fs.unlinkSync(outputPath);
      }
      fs.renameSync(tempPath, outputPath);
    } else {
      fs.unlinkSync(tempPath);
    }
  } catch (err) {
    console.error(`Error: ${path.basename(filePath)}:`, err.message);
  }
}

(async () => {
  const patterns = [
    'src/**/*.{png,jpg,jpeg,webp}',
    'public/**/*.{png,jpg,jpeg,webp}'
  ];
  
  const files = await glob(patterns, { ignore: ['**/node_modules/**', '**/.next/**'] });
  console.log(`Found ${files.length} image files. Processing...`);
  
  for (const file of files) {
    await compressImage(file);
  }
  
  console.log('\n✅ All images processed!');
})();
