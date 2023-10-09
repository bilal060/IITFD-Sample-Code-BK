import path from "path";

const cfgApp = {
  assetsPath: path.join((process.env as { NODE_PATH: string }).NODE_PATH, "public", "assets"),
  defaultDbRowsReturnLimit: 10,
  appUniversalMomentDateFormat: "Do MMM YY",
  minimumPasswordLength: 6,
  businessName: "test Place",
  businessEmail: "testplace@testplace.com",
  businessAddress: "XYZ",
  verifyEmailButttonColor: "#ffffff",
  verifyEmailButttonBgColor: "#0077ff",
};

export default cfgApp;
