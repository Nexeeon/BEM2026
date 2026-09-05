const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const filesToProcess = fs.readdirSync(srcDir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

for (const file of filesToProcess) {
  const filePath = path.join(srcDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace /images/.../*.png or *.jpeg or *.jpg with .webp
  const updatedContent = content.replace(/\/images\/([^"'\s]+\.(png|jpg|jpeg))/gi, (match, p1, ext) => {
    const webpPath = p1.substring(0, p1.lastIndexOf('.')) + '.webp';
    const fullWebpFsPath = path.join(__dirname, 'public/images', webpPath);
    if (fs.existsSync(fullWebpFsPath)) {
      return `/images/${webpPath}`;
    }
    return match;
  });

  if (updatedContent !== content) {
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`Updated image references in ${file}`);
  }
}
