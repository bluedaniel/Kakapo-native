import Reflux from "reflux";

let soundActions = Reflux.createActions({
  "toggleMute": { sync: true },
  "togglePlayPause": { sync: true },
  "changeVolume": { sync: true }
});

export default soundActions;
