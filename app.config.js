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
      owner: "pixel-team",
      runtimeVersion: {
        policy: "appVersion",
      },
      name: "PreTalks",
      slug: "pretalks",
      orientation: "portrait",
      icon: "./assets/icon.png",
      userInterfaceStyle: "automatic",
      splash: {
        image: "./assets/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },

      assetBundlePatterns: ["**/*"],
      ios: {
        supportsTablet: true,
        bundleIdentifier: "com.koksoft.pretalks",
      },
      android: {
        package: "com.koksoft.pretalks",
        adaptiveIcon: {
          foregroundImage: "./assets/icon.png",
          backgroundColor: "#ffffff",
        },
      },
      web: {
        favicon: "./assets/favicon.png",
      },
      extra: {
        eas: {
          projectId: "1ee2d6b3-6c96-405b-9761-b403914e663a",
        },
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
      updates: {
        enabled: true,
        fallbackToCacheTimeout: 1000,
        url: "https://u.expo.dev/1ee2d6b3-6c96-405b-9761-b403914e663a",
      },
      experiments: {
        tsconfigPaths: true,
      },
      //   plugins: [
      //     "@react-native-firebase/app",
      //     "@react-native-firebase/crashlytics",
      //     [
      //       "expo-build-properties",
      //       {
      //         ios: {
      //           useFrameworks: "static",
      //         },
      //       },
      //     ],
      //     "expo-font",
      //   ],
    },
  };
};
