export default class InstanceUtil {
  public static getVueInstance(element: any) {
    return element._instance;
  }

  public static getProcessEnv() {
    //@ts-ignore
    return process.env.NODE_ENV;
  }
}