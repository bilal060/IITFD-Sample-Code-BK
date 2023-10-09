import CfgDevelopmentEnv from "./cfgDevelopmentEnv";

abstract class CfgProductionEnv extends CfgDevelopmentEnv {
  static host = "0.0.0.0";
  static port = "4321";
  static allowedOrigins = ["http://127.0.0.1:5321", "http://localhost:5321"];
}

export default CfgProductionEnv;
