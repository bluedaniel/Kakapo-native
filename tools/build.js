import proc from "child_process";
import task from "./lib/task";

export default task("start", async () => {
  await require("./clean")();
  await require("./copy")();

  // proc
  //   .spawn("node_modules/react-native/packager/packager.sh")
  //   .stdout.on("data", data => console.log(data.toString()));
});
