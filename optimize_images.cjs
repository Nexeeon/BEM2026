const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.join(__dirname, 'public/images');

async function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        const webpPath = fullPath.substring(0, fullPath.lastIndexOf('.')) + '.webp';
        
        try {
          const stats = fs.statSync(fullPath);
          console.log(`Processing: ${entry.name} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);

          const image = sharp(fullPath);
          const metadata = await image.metadata();

          let pipeline = sharp(fullPath);

          // Resize if width or height exceeds 1200px
          if (metadata.width > 1200 || metadata.height > 1200) {
            pipeline = pipeline.resize({
              width: metadata.width > metadata.height ? 1200 : undefined,
              height: metadata.height >= metadata.width ? 1200 : undefined,
              fit: 'inside',
              withoutEnlargement: true
            });
          }

          // Convert to WebP quality 82
          await pipeline
            .webp({ quality: 82, effort: 5 })
            .toFile(webpPath);

          const webpStats = fs.statSync(webpPath);
          console.log(` -> Generated ${path.basename(webpPath)}: (${(webpStats.size / 1024).toFixed(1)} KB)`);

          // Also compress original PNG/JPG if original was > 1MB
          if (stats.size > 1024 * 1024 && (ext === '.png' || ext === '.jpg' || ext === '.jpeg')) {
            const tempOptPath = fullPath + '.tmp';
            let optPipeline = sharp(fullPath);

            if (metadata.width > 1200 || metadata.height > 1200) {
              optPipeline = optPipeline.resize({
                width: metadata.width > metadata.height ? 1200 : undefined,
                height: metadata.height >= metadata.width ? 1200 : undefined,
                fit: 'inside',
                withoutEnlargement: true
              });
            }

            if (ext === '.png') {
              await optPipeline.png({ quality: 80, compressionLevel: 8 }).toFile(tempOptPath);
            } else {
              await optPipeline.jpeg({ quality: 82, progressive: true }).toFile(tempOptPath);
            }

            if (fs.existsSync(tempOptPath)) {
              fs.renameSync(tempOptPath, fullPath);
              const newStats = fs.statSync(fullPath);
              console.log(` -> Compressed original ${entry.name} from ${(stats.size / 1024 / 1024).toFixed(2)}MB to ${(newStats.size / 1024).toFixed(1)}KB`);
            }
          }
        } catch (err) {
          console.error(`Error processing ${fullPath}:`, err.message);
        }
      }
    }
  }
}

console.log('Starting image optimization...');
processDirectory(IMAGES_DIR)
  .then(() => console.log('Image optimization complete!'))
  .catch((err) => console.error('Optimization failed:', err));
