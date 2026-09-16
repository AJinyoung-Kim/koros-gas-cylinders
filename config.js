// Koros Lab gas cylinder board — shared database settings.
//
// Set `firebase: null` to run in local-only mode (each browser keeps its own data).
// These values are public identifiers, not secrets; write access is controlled by the
// database rules in firebase.rules.json plus the lab PIN stored at /secret/pin.
window.KOROS_CONFIG = {
  firebase: {
    apiKey: "AIzaSyAcAAIlTzecejdhSu9Nt6G-EX0_m7x8ClI",
    authDomain: "koros-gas-1f336.firebaseapp.com",
    databaseURL: "https://koros-gas-1f336-default-rtdb.firebaseio.com",
    projectId: "koros-gas-1f336",
    storageBucket: "koros-gas-1f336.firebasestorage.app",
    messagingSenderId: "289047254277",
    appId: "1:289047254277:web:8f35c1c9064794dabcd36c"
  },
};
