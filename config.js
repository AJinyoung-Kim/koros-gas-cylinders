// Koros Lab gas cylinder board — shared database settings.
//
// Leave `firebase: null` to run in local-only mode (each browser keeps its own data).
// To share one live inventory with the whole lab, paste the web-app config from the
// Firebase console (Project settings → Your apps → SDK setup and configuration → Config).
// These values are public identifiers, not secrets; write access is controlled by the
// database rules in firebase.rules.json plus the lab PIN stored at /secret/pin.
window.KOROS_CONFIG = {
  firebase: null,
  // firebase: {
  //   apiKey: "...",
  //   authDomain: "your-project.firebaseapp.com",
  //   databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  //   projectId: "your-project",
  //   storageBucket: "your-project.appspot.com",
  //   messagingSenderId: "...",
  //   appId: "..."
  // },
};
