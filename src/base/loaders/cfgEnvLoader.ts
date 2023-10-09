import DevelopmentConfig from "../../env/cfgDevelopmentEnv";
import ProductionConfig from "../../env/cfgProductionEnv";

export type APP_ENV = "development" | "production";

class CfgEnv {
  static getEnvConfig(env: APP_ENV): typeof DevelopmentConfig {
    if (env === "production") return ProductionConfig;
    return DevelopmentConfig;
  }
}

export default CfgEnv;
