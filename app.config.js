const pkg = require("./package.json");

// const SPLASH_CONFIG = {
//   backgroundColor: "#ffffff",
//   image: "./assets/splash.png",
//   resizeMode: "cover",
// };
// const DARK_SPLASH_CONFIG = {
//   backgroundColor: "#001429",
//   image: "./assets/splash-dark.png",
//   resizeMode: "cover",
// };

module.exports = function (config) {
  /**
   * App version number. Should be incremented as part of a release cycle.
   */
  const VERSION = pkg.version;

  /**
   * Uses built-in Expo env vars
   *
   * @see https://docs.expo.dev/build-reference/variables/#built-in-environment-variables
   */
  //   const PLATFORM = process.env.EAS_BUILD_PLATFORM;

  //   const DIST_BUILD_NUMBER =
  //     PLATFORM === "android"
  //       ? process.env.BSKY_ANDROID_VERSION_CODE
  //       : process.env.BSKY_IOS_BUILD_NUMBER;

  return {
    expo: {
      version: VERSION,
      //   splash: SPLASH_CONFIG,
      runtimeVersion: {
        policy: "appVersion",
      },
      //   ios: {
      // splash: {
      //   ...SPLASH_CONFIG,
      //   dark: DARK_SPLASH_CONFIG,
      // },
      //   },
      //   android: {
      // adaptiveIcon: {
      //   foregroundImage: "./assets/icon-android-foreground.png",
      //   monochromeImage: "./assets/icon-android-foreground.png",
      //   backgroundImage: "./assets/icon-android-background.png",
      //   backgroundColor: "#1185FE",
      // },
      // googleServicesFile: "./google-services.json",
      // splash: {
      //   ...SPLASH_CONFIG,
      //   dark: DARK_SPLASH_CONFIG,
      // },
      //   },
    },
  };
};
