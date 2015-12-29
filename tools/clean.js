import fs from 'fs-extra';

export default async function clean() {
  await Promise.all([
    fs.removeSync('android/app/src/main/res/drawable-mdpi'),
    fs.removeSync('android/app/src/main/res/raw'),
    fs.removeSync('.tmp')
  ]);
  await fs.mkdirs('android/app/src/main/res/drawable-mdpi');
  await fs.mkdirs('android/app/src/main/res/raw');
}
