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
     * @constructor
     *
     * @param {HTMLElement} container FPlayer将要填充的容器
     * @param {object} options FPlayer设置参数
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
     * FPlayer的创建函数，与 ‘new FPlayer(...)’ 的作用相同，但是container可以使用container的id代替
     *
     * @static
     * @param {string|HTMLElement} container FPlayer将要填充的容器
     * @param {object} options FPlayer设置参数，不设置则使用默认参数（详见 FPlayer构造函数 {@link FPlayer FPlayer()}）
     *
     * @return {FPlayer} FPlayer对象
     *
     * @todo 和yao对接，设置默认参数
     */
    FPlayer.create = function (container, options = {}) {
        if (container instanceof HTMLElement) {
            return new this(container, options);
        }
        if (typeof container === 'string') {
            if (document.getElementById(container)) {
                return new this(document.getElementById(container), options);
            }
        }
        console.error("Unable to initialize FPlayer: No valid Container available");
    }
    /**
     * FPlayer初始化函数
     * @todo FPlayer初始化准备
     */
    FPlayer.init = function(){

    }
    /**
     * FPlayer销毁函数
     */
    FPlayer.destroy = function(){

    }
    /**
     * FPlayer配置更新后调用函数，本质上是吧FPlayer销毁后重新创建
     */
    FPlayer.update = function(){

    }

    //todo: 和yao对接，完成FPlayer.THEME_ 主题，FPlayer.MODE_ 模式，FPlayer.ACTION_ 事件等常量设置

    FPlayer.ACTION_READY = "ready";

    FPlayer.ACTION_ON_PLAY = "on_play";

    FPlayer.ACTION_ON_LOAD = "on_load";

    FPlayer.ACTION_ON_PAUSE = "on_pause";

    FPlayer.ACTION_ON_SWITCH = "on_switch";

    FPlayer.ACTION_ON_ADD = "on_add";

    FPlayer.ACTION_ON_NEXT = "on_next";

    FPlayer.ACTION_ON_PREVIOUS = "on_previous";

    FPlayer.MODE_SINGLE = "single";

    FPlayer.MODE_LIST = "list";

    FPlayer.MODE_RANDOM = "random";

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

    FPlayer._mView = undefined;

    FPlayer._mVolume = undefined;

    FPlayer._mPlayList = [];

    FPlayer._mCurrentId = undefined;

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
        this.change(0);
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
        this._mPlayList[this._mPlayList.length] = music;
        this._refreshList();
    }

    /**
     * 设置播放模式
     * @param {number} mode
     */
    FPlayer.setMode = function (mode) {
        this.mMode = mode;
        this._refreshList();
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
    /**
     * 播放逻辑
     */
    FPlayer.play = function () {

    }
    /**
     * 暂停逻辑
     */
    FPlayer.pause = function () {

    }
    /**
     * 播放器的下一首逻辑
     */
    FPlayer.onNext = function(){
        if(this.mMode === fangkehou.FPlayer.MODE_SINGLE){

            this.dispatchEvent(new CustomEvent(fangkehou.FPlayer.ACTION_ON_NEXT, {
                "detail": {

                }
            }))
            return;
        }
        this.next();
    }
    /**
     * 用户指定下一首逻辑
     */
    FPlayer.next = function () {
        let current = this._mPlayList[0];
        this._mPlayList.shift();
        this._mPlayList.push(current);
        current = this._mPlayList[0];
        this._pushSong(current);
        this.dispatchEvent(new CustomEvent(fangkehou.FPlayer.ACTION_ON_NEXT, {
            "detail": {

            }
        }))
    }
    /**
     * 用户指定上一首逻辑
     */
    FPlayer.previous = function () {
        let current = this._mPlayList[this._mPlayList.length];
        this._mPlayList.unshift(current);
        this._mPlayList.pop();
        this._pushSong(current);
        this.dispatchEvent(new CustomEvent(fangkehou.FPlayer.ACTION_ON_PREVIOUS, {
            "detail": {

            }
        }))
    }
    /**
     * 切歌并重新计算列表
     * @param {number} id
     */
    FPlayer.switch = function(id){
        this._mPlayList = [];
        for(let i = id; i < this.mMusicList.length; i++){
            this._mPlayList[this._mPlayList.length] = this.mMusicList[i];
        }
        for(let i = 0; i < id; i++){
            this._mPlayList[this._mPlayList.length] = this.mMusicList[i];
        }
        this._refreshList();
        let current = this._mPlayList[0];
        this._pushSong(current);
        this.dispatchEvent(new Event(fangkehou.FPlayer.ACTION_ON_SWITCH, {
            "detail": {
                
            }
        }))
    }
    /**
     * 重新生成随机列表
     * @private
     */
    FPlayer._refreshList = function(){
        if(this.mMode !== fangkehou.FPlayer.MODE_RANDOM){
            return;
        }
        let current = this._mPlayList[0];
        this._mPlayList.shift();
        let l = this._mPlayList.length;
        let index, temp;
        while(l>0){
            index = Math.floor(Math.random()*l);
            temp = this._mPlayList[l-1];
            this._mPlayList[l-1] = this._mPlayList[index];
            this._mPlayList[index] = temp;
            l--;
        }
        this._mPlayList.unshift(current);
    }
    /**
     * 通过Music类获取id
     * @param {fangkehou.Music} music 待寻找音乐
     * @returns {number} id
     * @private
     */
    FPlayer._getIdByMusic = function(music){
        if(this.mMusicList.length == 0){
            return -1;
        }
        for(let i = 0; i < this.mMusicList.length; i++){
            if(music.equals(this.mMusicList[i])){
                return i;
            }
        }
        return -1;
    }
    /**
     * 向播放器推送歌曲并初始化
     * @param {fangkehou.Music} music
     * @private
     */
    FPlayer._pushSong = function (music){
        if(music.equals(this.mMusicList[this._mCurrentId])){

        }
        this._mCurrentId = this._getIdByMusic(music);
    }

    //文档在{@link FPlayer}中。。。。。。
    fangkehou.FPlayer = FPlayer;

    /**
     * Music 歌曲类
     *
     * 主要功能为保存歌曲信息，同时也可以处理部分关于歌词和音频内容的参数
     *
     * 会自动把lrc格式的歌词转化成Lyric数组，或者把
     *
     * 这是Music类的构造函数，同时也承载Music的类定义。
     *
     * @constructor
     *
     * @param {string} name 歌曲名
     * @param {string} artist 演唱者
     * @param {string} cover 封面链接
     * @param {string|fangkehou.Lyric[]} lrc 歌词（可以是排序过的Lyric数组，也可以是Lrc文件（字符串格式））
     * @param {string|Blob} content 音频内容（可以是链接（本地或在线）或者Blob类）
     */
    function Music(name, artist, cover, lrc, content) {
        this.name = name;
        this.artist = artist;
        this.cover = cover;
        if(typeof lrc === 'string'){
            this.lrc = fangkehou.Lyric.fromLrcString(lrc);
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
    Music.name = undefined;
    /**
     * 歌手
     * @type {string}
     */
    Music.artist = undefined;
    /**
     * 封面（链接，http或blob或base64）
     * @type {string}
     */
    Music.cover = undefined;
    /**
     * 歌词（Lyric数组）
     * @type {fangkehou.Lyric[]}
     */
    Music.lrc = undefined;
    /**
     * 音频内容（blob或http）
     * @type {string}
     */
    Music.content = undefined;
    /**
     * 判断两个Music类是否相同，通过概率判断
     * @param music
     */
    Music.equals = function (music) {
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

    //文档在{@link Music}中。。。。。。
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