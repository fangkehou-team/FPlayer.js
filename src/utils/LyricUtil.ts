import Lyric from "@/beans/Lyric";

export default class LyricUtil {
  /**
   * 可能是Lyric类中唯一的函数了。。。。。负责解析lrc文件（字符串个事）
   * @param {string} lrcString
   * @returns {Lyric[]}
   */
  public static generateLyricFromLrcString (lrcString: string){
    //先把歌词通过回车切分
    const lyricLines = lrcString.split('\n');
    let lyricsList = [];
    let offset = 0;
    for(let i = 0; i < lyricLines.length; i++){
      //去掉每个tag前和后的空格
      const currentLyric = lyricLines[i].replace(/[\s]*\[/g, "[").replace(/][\s]*/g, "]");
      let time = currentLyric.substring(currentLyric.indexOf("[") + 1, currentLyric.indexOf("]")).split(':');
      //根据定义这里有个offset数值，是歌词整体的偏移量，应该识别一下
      if(time[0].toLowerCase() == "offset"){
        offset = parseInt(time[1]);
        continue;
      }
      //剩下的非时间标签抛掉就好了，对歌词显示没什么用
      if(isNaN(parseInt(time[0]))){
        continue;
      }
      //一行歌词可能有多个时间tag，分别代表不同的时间点，应该分出来（这个是lrc格式最烦人的点）
      const reg = /\[[0-9:.]*]/g;
      time = currentLyric.match(reg)!;
      let lyricStart = 0;
      for(let x = 0; x < time.length; x++){
        lyricStart += time[x].length;
      }
      const lyricString = currentLyric.substring(lyricStart);
      for(let x = 0; x < time.length; x++){
        const lyricTime = time[x].substring(1, time[x].length);
        const lyricTimeList = lyricTime.split(':');
        //把时间转换成秒数（带有一个三位小数表示毫秒）
        const realLyricTime = parseFloat(Math.max((parseInt(lyricTimeList[0]) * 60 + parseFloat(lyricTimeList[1]) + offset / 1000.0), 0.0).toFixed(3));
        lyricsList[lyricsList.length] = new Lyric(realLyricTime, lyricString);
      }
    }
    //把混乱的歌词排序
    lyricsList.sort((a, b) => {
      return a.time - b.time;
    })

    if (lyricsList.length < 1){
      lyricsList = [new Lyric(0, '无歌词')];
    }

    return lyricsList;
  }
}