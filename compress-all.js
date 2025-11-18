const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const filesToCompress = [
  'src/images/Coffee Cup Background Banner (4).webp',
  'public/bgsemua.webp',
  'public/senter-bg.webp',
  'public/sertec-bg.webp',
  'public/expertpower-bg.webp',
  'public/satec-bg.webp',
  'public/products/sertec/cmce-120.webp',
  'src/images/public fasilities.webp',
  'src/images/industrii.webp',
  'public/industrial.webp',
  'public/utilities.webp',
  'public/contact us 4.webp',
];

async function compressImage(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`Skip: ${filePath} not found`);
      return;
    }
    
    const originalSize = fs.statSync(filePath).size;
    const tempPath = filePath + '.tmp';
    
    await sharp(filePath)
      .resize(1200, null, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 45 })
      .toFile(tempPath);
    
    const newSize = fs.statSync(tempPath).size;
    console.log(`${path.basename(filePath)}: ${Math.round(originalSize/1024)} KB -> ${Math.round(newSize/1024)} KB`);
    
    fs.unlinkSync(filePath);
    fs.renameSync(tempPath, filePath);
  } catch (err) {
    console.error(`Error: ${path.basename(filePath)}:`, err.message);
  }
}

(async () => {
  for (const file of filesToCompress) {
    await compressImage(file);
  }
  console.log('\nDone!');
})();
