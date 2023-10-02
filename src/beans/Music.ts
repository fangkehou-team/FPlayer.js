import LyricUtil from "@/utils/LyricUtil";
import Lyric from "@/beans/Lyric";

/**
 * Music 歌曲类
 *
 * 主要功能为保存歌曲信息，同时也可以处理部分关于歌词和音频内容的参数
 *
 * 会自动把lrc格式的歌词转化成Lyric数组。
 *
 *
 * @class Music
 */
export default class Music {
  /**
   * Music类构造函数
   *
   * @constructor
   *
   * @param {string} name 歌曲名
   * @param {string} artist 演唱者
   * @param {string} cover 封面链接
   * @param {string|Lyric[]} lrc 歌词（可以是排序过的Lyric数组，也可以是Lrc文件（字符串格式））
   * @param {string|Blob} content 音频内容（可以是链接（本地或在线）或者Blob类）
   */
  constructor(name: string, artist: string, cover: string, lrc: string | Lyric[], content: string | Blob) {
    this.name = name;
    this.artist = artist;
    this.cover = cover;
    this.lrc = [new Lyric(0, '无歌词')];
    this.content = "";

    if(typeof lrc === 'string'){
      this.lrc = LyricUtil.generateLyricFromLrcString(lrc);
    }
    if(lrc instanceof Array){
      this.lrc = lrc;
    }

    if(typeof content === 'string'){
      this.content = content;
    }
    if(content instanceof Blob){
      this.content = URL.createObjectURL(content);
    }
  }


  /**
   * 音乐名称
   * @type {string}
   */
  public name: string;

  /**
   * 歌手
   * @type {string}
   */
  public artist: string;

  /**
   * 封面（链接，http或blob或base64）
   * @type {string}
   */
  public cover: string;

  /**
   * 歌词（Lyric数组）
   * @type {Lyric[]}
   */
  public lrc: Lyric[];

  /**
   * 音频内容（blob或http）
   * @type {string}
   */
  public content: string;

  /**
   * 判断两个Music类是否相同，通过概率判断
   * @function equals
   * @param {Music} music
   */
  public equals(music: Music) {
    let result = 0;
    if(this.name === music.name) {
      result++;
    }
    if(this.artist === music.artist){
      result++;
    }
    if(this.content === music.content){
      result++;
    }
    if(this.cover === music.cover){
      result++;
    }
    if(result >= 2){
      return true;
    }
    return this.lrc === music.lrc;

  }
}