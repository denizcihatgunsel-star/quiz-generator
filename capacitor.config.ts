import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.examina.ink",
  appName: "Examina",
  webDir: "public",
  server: {
    url: "https://www.examina.ink",
    cleartext: false,
  },
  android: {
    allowMixedContent: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#FBF1EE",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
    },
  },
};

export default config;
