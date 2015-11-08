import proc from "child_process";
import fs from "fs-extra";
import task from "./lib/task";

export default task("copy", async () => {
  await Promise.all([
    fs.copySync("node_modules/kakapo-assets/images", "android/app/src/main/res/drawable-mdpi"),
    fs.copySync("node_modules/kakapo-assets/sounds", "android/app/src/main/res/raw")
  ]);
});
