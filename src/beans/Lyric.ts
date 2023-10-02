/**
 * Lyric 歌词类
 *
 * 主要功能为表示和解析歌词，每一个Lyric实例是一行歌词。
 *
 * 一般情况下Lyric类会以 Array<Lyric> 的形式出现，Lyric类中也有专门的方法将lrc文件（字符串形式）转换成Lyric数组
 *
 * @class Lyric
 */
export default class Lyric {

  /**
   * 这段歌词开始的时间
   * @type {number}
   */
  public time: number;
  /**
   * 这段歌词的文本
   * @type {string}
   */
  public lyric: string;

  /**
   *
   * Lyric类构造函数
   *
   * @constructor
   *
   * @param {number} time 开始时间
   * @param {string} lyric 歌词文本
   *
   */
  constructor(time: number, lyric: string) {
    this.time = time;
    this.lyric = lyric;
  }
}