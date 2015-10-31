/**
* Usage:
* `$ npm run start` for iOS
* `$ npm run start android` for Android
*/
import proc from "child_process";
import task from "./lib/task";

export default task("start", async () => {
  await require("./clean")();
  await require("./copy")();

  if (process.argv.slice(2)[2] === "android") {
    proc.spawn("react-native" , ["run-android"])
      .stdout.on("data", data => console.log(data.toString()));
  } else {
    proc.spawn("node_modules/react-native/packager/packager.sh")
      .stdout.on("data", data => console.log(data.toString()));
  }
});
