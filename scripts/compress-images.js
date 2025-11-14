const sharp = require('sharp');
const glob = require('glob');
const fs = require('fs');
const path = require('path');

async function compressImages() {
  console.log('🚀 Starting AUTOMATIC image compression with Sharp...');

  try {
    // Find all images
    const imagePatterns = [
      'public/**/*.{jpg,jpeg,png}',
      'src/**/*.{jpg,jpeg,png}'
    ];

    let totalFiles = 0;
    let totalSaved = 0;

    for (const pattern of imagePatterns) {
      const files = glob.sync(pattern);
      
      for (const file of files) {
        try {
          const originalSize = fs.statSync(file).size;
          const ext = path.extname(file).toLowerCase();
          
          console.log(`📸 Compressing: ${file}`);

          if (ext === '.jpg' || ext === '.jpeg') {
            // Compress JPEG
            await sharp(file)
              .jpeg({ 
                quality: 80, 
                progressive: true,
                mozjpeg: true 
              })
              .toFile(file + '.tmp');
          } else if (ext === '.png') {
            // Compress PNG
            await sharp(file)
              .png({ 
                quality: 80,
                compressionLevel: 9,
                palette: true
              })
              .toFile(file + '.tmp');
          }

          // Replace original with compressed
          const newSize = fs.statSync(file + '.tmp').size;
          const savedBytes = originalSize - newSize;
          const savedPercent = ((savedBytes / originalSize) * 100).toFixed(1);

          if (newSize < originalSize) {
            fs.renameSync(file + '.tmp', file);
            console.log(`   ✅ Saved ${(savedBytes / 1024).toFixed(1)}KB (${savedPercent}%)`);
            totalSaved += savedBytes;
          } else {
            fs.unlinkSync(file + '.tmp');
            console.log(`   ⚠️ No improvement, kept original`);
          }

          totalFiles++;

        } catch (err) {
          console.log(`   ❌ Error compressing ${file}:`, err.message);
          // Clean up temp file if exists
          if (fs.existsSync(file + '.tmp')) {
            fs.unlinkSync(file + '.tmp');
          }
        }
      }
    }

    console.log('\n🎉 COMPRESSION COMPLETED!');
    console.log(`📊 Processed: ${totalFiles} files`);
    console.log(`💾 Total saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB`);
    console.log('🚀 Images are now optimized and ready for deployment!');

  } catch (error) {
    console.error('❌ Fatal error:', error);
  }
}

compressImages();
