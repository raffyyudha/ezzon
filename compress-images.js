const sharp = require('sharp');
const fs = require('fs');

const filesToCompress = [
  { input: 'src/images/1.png', output: 'src/images/1.webp' },
  { input: 'src/images/2.png', output: 'src/images/2.webp' },
  { input: 'src/images/3.png', output: 'src/images/3.webp' },
  { input: 'src/images/4.png', output: 'src/images/4.webp' },
  { input: 'src/android 1.png', output: 'src/android1.webp' },
  { input: 'src/android 2.png', output: 'src/android2.webp' },
  { input: 'src/android 3.png', output: 'src/android3.webp' },
];

async function compressImage(input, output) {
  try {
    const originalSize = fs.statSync(output).size;
    await sharp(input)
      .resize(1200, null, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 50 })
      .toFile(output + '.tmp');
    
    const newSize = fs.statSync(output + '.tmp').size;
    console.log(`${input}: ${Math.round(originalSize/1024)} KB -> ${Math.round(newSize/1024)} KB (Saved: ${Math.round((originalSize-newSize)/1024)} KB)`);
    
    fs.renameSync(output + '.tmp', output);
  } catch (err) {
    console.error(`Error compressing ${input}:`, err.message);
  }
}

(async () => {
  for (const file of filesToCompress) {
    await compressImage(file.input, file.output);
  }
  console.log('\nAll images compressed!');
})();
