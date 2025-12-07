import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, statSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputPath = join(__dirname, '../public/images/vision.jpeg');
const outputPath = join(__dirname, '../public/images/vision-resized.jpeg');

async function resizeImage() {
  try {
    if (!existsSync(inputPath)) {
      console.error('Input file does not exist:', inputPath);
      return;
    }

    await sharp(inputPath)
      .resize(1200, 800, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ 
        quality: 85,
        mozjpeg: true
      })
      .toFile(outputPath);

    console.log('Vision image resized successfully!');
    console.log('Original size:', (statSync(inputPath).size / 1024).toFixed(2) + 'KB');
    console.log('Resized size:', (statSync(outputPath).size / 1024).toFixed(2) + 'KB');
  } catch (error) {
    console.error('Error resizing vision image:', error);
  }
}

resizeImage();
