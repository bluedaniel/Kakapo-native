import proc from "child_process";
import fs from "fs-extra";
import task from "./lib/task";

export default task("copy", async () => {
  await Promise.all([
    fs.copySync("src/images", "android/app/src/main/res/drawable-mdpi"),
    fs.copySync("src/sounds", "android/app/src/main/res/raw")
  ]);
});
