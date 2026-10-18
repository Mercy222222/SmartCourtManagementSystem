const fs = require('fs');
const path = require('path');

const srcPath = 'C:\\Users\\pc\\.gemini\\antigravity-ide\\brain\\a3dfc73d-0c92-416c-8c59-64f577626d54\\smart_court_icon_1792288404936.jpg';
const assetsDir = 'C:\\Users\\pc\\.gemini\\antigravity-ide\\scratch\\SmartCourtManagementSystem\\SmartCourtManagementSystem\\assets';

if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

// Read image buffer
const imgBuffer = fs.readFileSync(srcPath);

fs.writeFileSync(path.join(assetsDir, 'icon.png'), imgBuffer);
fs.writeFileSync(path.join(assetsDir, 'adaptive-icon.png'), imgBuffer);
fs.writeFileSync(path.join(assetsDir, 'splash.png'), imgBuffer);
fs.writeFileSync(path.join(assetsDir, 'favicon.png'), imgBuffer);

console.log('Successfully written asset images to:', assetsDir);
