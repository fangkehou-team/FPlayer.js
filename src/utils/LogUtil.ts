import InstanceUtil from "@/utils/InstanceUtil";

export default class LogUtil {
  public static debug(message: any) {
    if(InstanceUtil.getProcessEnv() == 'development') {
      console.log(message);
    }
  }

  public static info = console.log;
}