import Reflux from "reflux";

let soundActions = Reflux.createActions({
  "togglePlayPause": { sync: true },
  "changeVolume": { sync: true },
  "toggleMultiple": { sync: true },
});

export default soundActions;
