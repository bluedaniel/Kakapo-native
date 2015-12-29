import fs from 'fs-extra';

export default async function copy() {
  await fs.copy('node_modules/kakapo-assets/images', 'android/app/src/main/res/drawable-mdpi', {});
  await fs.copy('node_modules/kakapo-assets/sounds', 'android/app/src/main/res/raw', {});
}
