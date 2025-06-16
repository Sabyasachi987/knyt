const fs = require('fs');
const path = require('path');

const projectDir = process.cwd();
const searchString = 'knyt';  //THIS ALSO CHANGES ALWAYS SO KEEP CHECK
const replaceString = 'knyt';

// File extensions you want to replace inside (adjust if needed)
const fileExtensions = ['.js', '.json', '.txt', '.md'];

// Recursively walk directory except .knyt folder
function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip real .knyt folder
      if (entry.name === '.knyt') continue;
      walkDir(fullPath);
    } else {
      // Process only specific file extensions
      if (fileExtensions.includes(path.extname(entry.name))) {
        replaceInFile(fullPath);
      }
    }
  }
}

// Replace .knyt -> .knyt in file contents
function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  if (content.includes(searchString)) {
    const updated = content.split(searchString).join(replaceString);
    fs.writeFileSync(filePath, updated, 'utf-8');
    console.log(`Updated: ${filePath}`);
  }
}

walkDir(projectDir);
console.log('Replacement done!');
