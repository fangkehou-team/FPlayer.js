export default class RandomUtil {
  public static randomString(stringLength: number) {
    stringLength = stringLength || 32;
    const stringTemplate = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz012345678-";
    const templateLength = stringTemplate.length;

    let result = "";
    for (let i = 0; i < stringLength; i++) {
      result += stringTemplate.charAt(Math.floor(Math.random() * templateLength));
    }
    return result;
  }

}