//fangkehou命名空间，避免混淆
this.fangkehou = this.fangkehou || {};

(function () {
    /**
     * <b>介绍</b><br />
     * 欢迎使用FPlayer - Fangkehou Player ！
     * 这是一款针对现代化浏览器设计的音乐播放器，具有界面美观，设置方便的优点（净能瞎吹-_-#）
     * 您既可以直接以默认设置直接使用，也可以对FPlayer做出自定义的设置
     *
     * FPlayer允许用户通过参数对FPlayer外观，行为进行调整，具体规则及定义如下：
     *
     * @todo 参数的定义
     *
     * 这是FPlayer构造函数，实现了FPlayer与容器和FPlayer设置参数的绑定，同时也承载FPlayer的类定义。
     *
     * @class FPlayer
     * @constructor
     *
     * @param {string|HTMLElement} container FPlayer将要填充的容器
     * @param {object} options FPlayer设置参数
     *
     * @return {FPlayer} FPlayer对象
     *
     * @example
     * var FPlayer = new fangkehou.FPlayer("container", {
     *
     * })
     */
    function FPlayer(container, options) {
        this.container = container;
        //TODO:和yao对接，实现具体功能

    }

    /**
     * FPlayer的初始化函数，与 ‘new FPlayer(...)’ 的作用相同，但是container可以使用container的id代替
     *
     * @static
     * @param {string|HTMLElement} container FPlayer将要填充的容器
     * @param {object} options FPlayer设置参数，不设置则使用默认参数（详见 FPlayer构造函数 {@link FPlayer FPlayer()}）
     *
     * @return {FPlayer} FPlayer对象
     *
     * @todo 和yao对接，设置默认参数
     */
    FPlayer.init = function (container, options = {}) {
        if (container instanceof HTMLElement) {
            return new this(container, options);
        }
        if (container instanceof String) {
            console.log(document.getElementById(container))
            if (document.getElementById(container)) {
                return new this(document.getElementById(container), options);
            }
        }
        console.error("Unable to initialize FPlayer: No valid Container available");
    }

    //todo: 和yao对接，完成FPlayer.THEME_ 主题，FPlayer.MODE_ 模式，FPlayer.ACTION_ 事件等常量设置

    /**
     * FPlayer将要填充的容器
     * @type {HTMLElement}
     */
    FPlayer.mContainer = undefined;
    /**
     * FPlayer主题
     * @type {number}
     */
    FPlayer.mTheme = undefined;
    /**
     * FPlayer音乐列表
     * @type {Array<fangkehou.Music>}
     */
    FPlayer.mMusicList = [];
    /**
     * FPlayer播放模式
     * @type {number}
     */
    FPlayer.mMode = undefined;
    /**
     * FPlayer事件监听器
     * @param player
     * @param event
     */
    FPlayer.mListener = function(player, event){

    };

    /**
     * 设置主题
     * @param {number} theme
     */
    FPlayer.setTheme = function (theme) {
        this.mTheme = theme;
    }
    /**
     * 获取当前主题
     * @returns {number} 主题代码
     */
    FPlayer.getTheme = function () {
        return this.mTheme;
    }
    /**
     * 设置音乐列表
     * @param {Array<fangkehou.Music>} list 音乐列表
     */
    FPlayer.setMusicList = function (list) {
        this.mMusicList = list;
    }
    /**
     * 获取音乐列表
     * @returns {Array<fangkehou.Music>}
     */
    FPlayer.getMusicList = function () {
        return this.mMusicList;
    }
    /**
     * 添加音乐到列表末尾
     * @param {fangkehou.Music} music
     */
    FPlayer.addMusic = function (music) {
        this.mMusicList[this.mMusicList.length] = music;
    }

    /**
     * 设置播放模式
     * @param {number} mode
     */
    FPlayer.setMode = function (mode) {
        this.mMode = mode;
    }
    /**
     * 获取当前播放模式
     * @returns {number}
     */
    FPlayer.getMode = function () {
        return this.mMode;
    }
    /**
     * 设置监听器
     * @param {function(fangkehou.FPlayer, number)} listener
     */
    FPlayer.setListener = function (listener) {
        this.mListener = listener;
    }

    //文档在FPlayer中。。。。。。
    fangkehou.FPlayer = FPlayer;

    function Music() {

    }

    //文档在Music中。。。。。。
    fangkehou.Music = Music;


    /**
     * Lyric 歌词类
     *
     * 主要功能为表示和解析歌词，每一个Lyric实例是一行歌词。
     *
     * 一般情况下Lyric类会以 Array<Lyric> 的形式出现，Lyric类中也有专门的方法将lrc文件（字符串形式）转换成Lyric数组
     *
     * 这是Lyric类的构造函数，同时也承载Lyric的类定义。
     *
     * @class Lyric
     * @constructor
     *
     * @param {number} time 开始时间
     * @param {string} lyric 歌词文本
     *
     * @return {Lyric} Lyric对象
     *
     */
    function Lyric(time, lyric) {
        this.time = time;
        this.lyric = lyric;
    }

    /**
     * 这段歌词开始的时间
     * @type {number}
     */
    Lyric.time = undefined;
    /**
     * 这段歌词的文本
     * @type {string}
     */
    Lyric.lyric = undefined;

    /**
     * 可能是Lyric类中唯一的函数了。。。。。负责解析lrc文件（字符串个事）
     * @param {string} lrcString
     * @returns {fangkehou.Lyric[]}
     */
    Lyric.fromLrcString = function(lrcString){
        let lyricLines = lrcString.split('\n');
        let lyricsList = [];
        let offset = 0;
        debugger;
        for(let i = 0; i < lyricLines.length; i++){
            let currentLyric = lyricLines[i].replace(/[\s]*\[/g, "[").replace(/][\s]*/g, "]");
            let time = currentLyric.substring(currentLyric.indexOf("[") + 1, currentLyric.indexOf("]")).split(':');
            if(time[0].toLowerCase() == "offset"){
                offset = parseInt(time[1]);
                continue;
            }
            if(isNaN(parseInt(time[0]))){
                continue;
            }
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
                lyricTime = parseFloat(Math.max((parseInt(lyricTime[0]) * 60 + parseFloat(lyricTime[1]) + offset / 1000.0), 0.0).toFixed(3));
                lyricsList[lyricsList.length] = new fangkehou.Lyric(lyricTime, lyricString);
            }
        }
        lyricsList.sort((a, b) => {
            return a.time - b.time;
        })
        return lyricsList;
    }

    //文档在Lyric中。。。。。。
    fangkehou.Lyric = Lyric;
}())