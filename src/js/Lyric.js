//fangkehou命名空间，避免混淆
this.fangkehou = this.fangkehou || {};

(function () {
    /**
     * Lyric 歌词类
     *
     * 主要功能为表示和解析歌词，每一个Lyric实例是一行歌词。
     *
     * 一般情况下Lyric类会以 Array<Lyric> 的形式出现，Lyric类中也有专门的方法将lrc文件（字符串形式）转换成Lyric数组
     *
     * 这是Lyric类的构造函数，同时也承载Lyric的类定义。
     *
     * @constructor
     *
     * @param {number} time 开始时间
     * @param {string} lyric 歌词文本
     *
     */
    function Lyric(time, lyric) {
        this.time = time;
        this.lyric = lyric;
    }

    let l = Lyric.prototype;
    l.constructor = Lyric;

    /**
     * 这段歌词开始的时间
     * @type {number}
     */
    l.time = undefined;
    /**
     * 这段歌词的文本
     * @type {string}
     */
    l.lyric = undefined;

    /**
     * 可能是Lyric类中唯一的函数了。。。。。负责解析lrc文件（字符串个事）
     * @param {string} lrcString
     * @returns {Lyric[]}
     */
    Lyric.fromLrcString = function(lrcString){
        //先把歌词通过回车切分
        let lyricLines = lrcString.split('\n');
        let lyricsList = [];
        let offset = 0;
        for(let i = 0; i < lyricLines.length; i++){
            //去掉每个tag前和后的空格
            let currentLyric = lyricLines[i].replace(/[\s]*\[/g, "[").replace(/][\s]*/g, "]");
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
            let reg = /\[[0-9:.]*]/g;
            time = currentLyric.match(reg);
            let lyricStart = 0;
            for(let x = 0; x < time.length; x++){
                lyricStart += time[x].length;
            }
            let lyricString = currentLyric.substring(lyricStart);
            for(let x = 0; x < time.length; x++){
                let lyricTime = time[x].substring(1, time[x].length);
                lyricTime = lyricTime.split(':');
                //把时间转换成秒数（带有一个三位小数表示毫秒）
                lyricTime = parseFloat(Math.max((parseInt(lyricTime[0]) * 60 + parseFloat(lyricTime[1]) + offset / 1000.0), 0.0).toFixed(3));
                lyricsList[lyricsList.length] = new fangkehou.Lyric(lyricTime, lyricString);
            }
        }
        //把混乱的歌词排序
        lyricsList.sort((a, b) => {
            return a.time - b.time;
        })
        return lyricsList;
    }

    //文档在{@link Lyric}中。。。。。。
    fangkehou.Lyric = Lyric;
}())