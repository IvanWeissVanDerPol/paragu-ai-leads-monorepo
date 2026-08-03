const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const PACKAGES = [
  'client-kit',
  'i18n',
  'seo',
  'sections',
  'theme',
  'ui',
];

const DEST = path.join(__dirname, '..', '.packages');

function copyPackage(name) {
  const src = `/root/nexa-paraguay/node_modules/@ai-whisperers/${name}`;
  const dst = path.join(DEST, `ai-whisperers-${name.replace('/', '-')}.tgz`);
  if (!fs.existsSync(src)) {
    console.warn(`⚠️  Package not found: ${src}`);
    return;
  }
  fs.mkdirSync(DEST, { recursive: true });
  try {
    execSync(`cd ${src}/.. && npm pack @ai-whisperers/${name} --pack-destination=${DEST}`, {
      stdio: 'pipe',
    });
    console.log(`✅ Packed @ai-whisperers/${name}`);
  } catch (e) {
    console.warn(`⚠️  Failed to pack @ai-whisperers/${name}: ${e.message}`);
  }
}

for (const pkg of PACKAGES) {
  copyPackage(pkg);
}