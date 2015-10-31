import del from "del";
import task from "./lib/task";
import fs from "fs-extra";

export default task("clean", async () => {
  await del([
    "android/app/src/main/res/drawable-mdpi",
    "android/app/src/main/res/raw",
    ".tmp"
  ], {dot: true});
  await fs.ensureDirSync("android/app/src/main/res/drawable-mdpi");
  await fs.ensureDirSync("android/app/src/main/res/raw");
});
