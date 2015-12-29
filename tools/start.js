import { argv } from 'yargs';
import proc from 'child_process';
import run from './run';

export default async function start() {
  await run(require('./clean'));
  await run(require('./copy'));

  if (argv.platform === 'android') {
    proc.spawn('react-native' , [ 'run-android' ])
      .stdout.on('data', data => console.log(data.toString()));
  } else {
    proc.spawn('node_modules/react-native/packager/packager.sh')
      .stdout.on('data', data => console.log(data.toString()));
  }
}
