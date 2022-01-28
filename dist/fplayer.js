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
     * @param {HTMLElement} container FPlayer将要填充的容器
     * @param {object} options FPlayer设置参数
     *
     * @example
     * var FPlayer = new fangkehou.FPlayer.create("container", {
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

    FPlayer.ACTION_PREPARE_READY = "prepare_ready";

    FPlayer.ACTION_PREPARE_FAIL = "prepare_fail";

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
     *
     * @function setTheme
     * @param {number} theme
     */
    FPlayer.setTheme = function (theme) {
        this.mTheme = theme;
    }
    /**
     * 获取当前主题
     * @function getTheme
     * @returns {number} 主题代码
     */
    FPlayer.getTheme = function () {
        return this.mTheme;
    }
    /**
     * 设置音乐列表
     * @function setMusicList
     * @param {Array<fangkehou.Music>} list 音乐列表
     */
    FPlayer.setMusicList = function (list) {
        this.mMusicList = list;
        this.change(0);
    }
    /**
     * 获取音乐列表
     * @function getMusicList
     * @returns {Array<fangkehou.Music>}
     */
    FPlayer.getMusicList = function () {
        return this.mMusicList;
    }
    /**
     * 添加音乐到列表末尾
     * @function addMusic
     * @param {fangkehou.Music} music
     */
    FPlayer.addMusic = function (music) {
        this.mMusicList[this.mMusicList.length] = music;
        this._mPlayList[this._mPlayList.length] = music;
        this._refreshList();
    }

    /**
     * 设置播放模式
     * @function setMode
     * @param {number} mode
     */
    FPlayer.setMode = function (mode) {
        this.mMode = mode;
        this._refreshList();
    }
    /**
     * 获取当前播放模式
     * @function getMode
     * @returns {number}
     */
    FPlayer.getMode = function () {
        return this.mMode;
    }
    /**
     * 设置监听器
     * @function setListener
     * @param {function(fangkehou.FPlayer, number)} listener
     */
    FPlayer.setListener = function (listener) {
        this.mListener = listener;
    }
    /**
     * 播放逻辑
     * @function play
     */
    FPlayer.play = function () {

    }
    /**
     * 暂停逻辑
     * @function pause
     */
    FPlayer.pause = function () {

    }
    /**
     * 播放器的下一首逻辑
     * @function onNext
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
     * @function next
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
     * @function previous
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
     * @function switch
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
     * @function _refreshList
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
     * @function _getIdByMusic
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
     * @function _pushSong
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

}())
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
//fangkehou命名空间，避免混淆
this.fangkehou = this.fangkehou || {};

(function () {
    /**
     * Music 歌曲类
     *
     * 主要功能为保存歌曲信息，同时也可以处理部分关于歌词和音频内容的参数
     *
     * 会自动把lrc格式的歌词转化成Lyric数组，或者把
     *
     * 这是Music类的构造函数，同时也承载Music的类定义。
     *
     * @class Music
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
     * @function equals
     * @param {fangkehou.Music} music
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

}())
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZQbGF5ZXIuanMiLCJMeXJpYy5qcyIsIk11c2ljLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJmcGxheWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy9mYW5na2Vob3Xlkb3lkI3nqbrpl7TvvIzpgb/lhY3mt7fmt4ZcbnRoaXMuZmFuZ2tlaG91ID0gdGhpcy5mYW5na2Vob3UgfHwge307XG5cbihmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogPGI+5LuL57uNPC9iPjxiciAvPlxuICAgICAqIOasoui/juS9v+eUqEZQbGF5ZXIgLSBGYW5na2Vob3UgUGxheWVyIO+8gVxuICAgICAqIOi/meaYr+S4gOasvumSiOWvueeOsOS7o+WMlua1j+iniOWZqOiuvuiuoeeahOmfs+S5kOaSreaUvuWZqO+8jOWFt+acieeVjOmdoue+juingu+8jOiuvue9ruaWueS+v+eahOS8mOeCue+8iOWHgOiDveeejuWQuS1fLSPvvIlcbiAgICAgKiDmgqjml6Llj6/ku6Xnm7TmjqXku6Xpu5jorqTorr7nva7nm7TmjqXkvb/nlKjvvIzkuZ/lj6/ku6Xlr7lGUGxheWVy5YGa5Ye66Ieq5a6a5LmJ55qE6K6+572uXG4gICAgICpcbiAgICAgKiBGUGxheWVy5YWB6K6455So5oi36YCa6L+H5Y+C5pWw5a+5RlBsYXllcuWkluingu+8jOihjOS4uui/m+ihjOiwg+aVtO+8jOWFt+S9k+inhOWImeWPiuWumuS5ieWmguS4i++8mlxuICAgICAqXG4gICAgICogQHRvZG8g5Y+C5pWw55qE5a6a5LmJXG4gICAgICpcbiAgICAgKiDov5nmmK9GUGxheWVy5p6E6YCg5Ye95pWw77yM5a6e546w5LqGRlBsYXllcuS4juWuueWZqOWSjEZQbGF5ZXLorr7nva7lj4LmlbDnmoTnu5HlrprvvIzlkIzml7bkuZ/mib/ovb1GUGxheWVy55qE57G75a6a5LmJ44CCXG4gICAgICpcbiAgICAgKiBAY2xhc3MgRlBsYXllclxuICAgICAqIEBjb25zdHJ1Y3RvclxuICAgICAqXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY29udGFpbmVyIEZQbGF5ZXLlsIbopoHloavlhYXnmoTlrrnlmahcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBGUGxheWVy6K6+572u5Y+C5pWwXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHZhciBGUGxheWVyID0gbmV3IGZhbmdrZWhvdS5GUGxheWVyLmNyZWF0ZShcImNvbnRhaW5lclwiLCB7XG4gICAgICpcbiAgICAgKiB9KVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEZQbGF5ZXIoY29udGFpbmVyLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgICAgICAvL1RPRE865ZKMeWFv5a+55o6l77yM5a6e546w5YW35L2T5Yqf6IO9XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGUGxheWVy55qE5Yib5bu65Ye95pWw77yM5LiOIOKAmG5ldyBGUGxheWVyKC4uLinigJkg55qE5L2c55So55u45ZCM77yM5L2G5pivY29udGFpbmVy5Y+v5Lul5L2/55SoY29udGFpbmVy55qEaWTku6Pmm79cbiAgICAgKlxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xIVE1MRWxlbWVudH0gY29udGFpbmVyIEZQbGF5ZXLlsIbopoHloavlhYXnmoTlrrnlmahcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBGUGxheWVy6K6+572u5Y+C5pWw77yM5LiN6K6+572u5YiZ5L2/55So6buY6K6k5Y+C5pWw77yI6K+m6KeBIEZQbGF5ZXLmnoTpgKDlh73mlbAge0BsaW5rIEZQbGF5ZXIgRlBsYXllcigpfe+8iVxuICAgICAqXG4gICAgICogQHJldHVybiB7RlBsYXllcn0gRlBsYXllcuWvueixoVxuICAgICAqXG4gICAgICogQHRvZG8g5ZKMeWFv5a+55o6l77yM6K6+572u6buY6K6k5Y+C5pWwXG4gICAgICovXG4gICAgRlBsYXllci5jcmVhdGUgPSBmdW5jdGlvbiAoY29udGFpbmVyLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgaWYgKGNvbnRhaW5lciBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IHRoaXMoY29udGFpbmVyLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGNvbnRhaW5lciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb250YWluZXIpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyB0aGlzKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvbnRhaW5lciksIG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gaW5pdGlhbGl6ZSBGUGxheWVyOiBObyB2YWxpZCBDb250YWluZXIgYXZhaWxhYmxlXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGUGxheWVy5Yid5aeL5YyW5Ye95pWwXG4gICAgICogQHRvZG8gRlBsYXllcuWIneWni+WMluWHhuWkh1xuICAgICAqL1xuICAgIEZQbGF5ZXIuaW5pdCA9IGZ1bmN0aW9uKCl7XG5cbiAgICB9XG4gICAgLyoqXG4gICAgICogRlBsYXllcumUgOavgeWHveaVsFxuICAgICAqL1xuICAgIEZQbGF5ZXIuZGVzdHJveSA9IGZ1bmN0aW9uKCl7XG5cbiAgICB9XG4gICAgLyoqXG4gICAgICogRlBsYXllcumFjee9ruabtOaWsOWQjuiwg+eUqOWHveaVsO+8jOacrOi0qOS4iuaYr+WQp0ZQbGF5ZXLplIDmr4HlkI7ph43mlrDliJvlu7pcbiAgICAgKi9cbiAgICBGUGxheWVyLnVwZGF0ZSA9IGZ1bmN0aW9uKCl7XG5cbiAgICB9XG5cbiAgICAvL3RvZG86IOWSjHlhb+WvueaOpe+8jOWujOaIkEZQbGF5ZXIuVEhFTUVfIOS4u+mimO+8jEZQbGF5ZXIuTU9ERV8g5qih5byP77yMRlBsYXllci5BQ1RJT05fIOS6i+S7tuetieW4uOmHj+iuvue9rlxuXG4gICAgRlBsYXllci5BQ1RJT05fUFJFUEFSRV9SRUFEWSA9IFwicHJlcGFyZV9yZWFkeVwiO1xuXG4gICAgRlBsYXllci5BQ1RJT05fUFJFUEFSRV9GQUlMID0gXCJwcmVwYXJlX2ZhaWxcIjtcblxuICAgIEZQbGF5ZXIuQUNUSU9OX09OX1BMQVkgPSBcIm9uX3BsYXlcIjtcblxuICAgIEZQbGF5ZXIuQUNUSU9OX09OX0xPQUQgPSBcIm9uX2xvYWRcIjtcblxuICAgIEZQbGF5ZXIuQUNUSU9OX09OX1BBVVNFID0gXCJvbl9wYXVzZVwiO1xuXG4gICAgRlBsYXllci5BQ1RJT05fT05fU1dJVENIID0gXCJvbl9zd2l0Y2hcIjtcblxuICAgIEZQbGF5ZXIuQUNUSU9OX09OX0FERCA9IFwib25fYWRkXCI7XG5cbiAgICBGUGxheWVyLkFDVElPTl9PTl9ORVhUID0gXCJvbl9uZXh0XCI7XG5cbiAgICBGUGxheWVyLkFDVElPTl9PTl9QUkVWSU9VUyA9IFwib25fcHJldmlvdXNcIjtcblxuICAgIEZQbGF5ZXIuTU9ERV9TSU5HTEUgPSBcInNpbmdsZVwiO1xuXG4gICAgRlBsYXllci5NT0RFX0xJU1QgPSBcImxpc3RcIjtcblxuICAgIEZQbGF5ZXIuTU9ERV9SQU5ET00gPSBcInJhbmRvbVwiO1xuXG4gICAgLyoqXG4gICAgICogRlBsYXllcuWwhuimgeWhq+WFheeahOWuueWZqFxuICAgICAqIEB0eXBlIHtIVE1MRWxlbWVudH1cbiAgICAgKi9cbiAgICBGUGxheWVyLm1Db250YWluZXIgPSB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRlBsYXllcuS4u+mimFxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICovXG4gICAgRlBsYXllci5tVGhlbWUgPSB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRlBsYXllcumfs+S5kOWIl+ihqFxuICAgICAqIEB0eXBlIHtBcnJheTxmYW5na2Vob3UuTXVzaWM+fVxuICAgICAqL1xuICAgIEZQbGF5ZXIubU11c2ljTGlzdCA9IFtdO1xuICAgIC8qKlxuICAgICAqIEZQbGF5ZXLmkq3mlL7mqKHlvI9cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIEZQbGF5ZXIubU1vZGUgPSB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRlBsYXllcuS6i+S7tuebkeWQrOWZqFxuICAgICAqIEBwYXJhbSBwbGF5ZXJcbiAgICAgKiBAcGFyYW0gZXZlbnRcbiAgICAgKi9cbiAgICBGUGxheWVyLm1MaXN0ZW5lciA9IGZ1bmN0aW9uKHBsYXllciwgZXZlbnQpe1xuXG4gICAgfTtcblxuICAgIEZQbGF5ZXIuX21WaWV3ID0gdW5kZWZpbmVkO1xuXG4gICAgRlBsYXllci5fbVZvbHVtZSA9IHVuZGVmaW5lZDtcblxuICAgIEZQbGF5ZXIuX21QbGF5TGlzdCA9IFtdO1xuXG4gICAgRlBsYXllci5fbUN1cnJlbnRJZCA9IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIOiuvue9ruS4u+mimFxuICAgICAqXG4gICAgICogQGZ1bmN0aW9uIHNldFRoZW1lXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHRoZW1lXG4gICAgICovXG4gICAgRlBsYXllci5zZXRUaGVtZSA9IGZ1bmN0aW9uICh0aGVtZSkge1xuICAgICAgICB0aGlzLm1UaGVtZSA9IHRoZW1lO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDojrflj5blvZPliY3kuLvpophcbiAgICAgKiBAZnVuY3Rpb24gZ2V0VGhlbWVcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSDkuLvpopjku6PnoIFcbiAgICAgKi9cbiAgICBGUGxheWVyLmdldFRoZW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tVGhlbWU7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiuvue9rumfs+S5kOWIl+ihqFxuICAgICAqIEBmdW5jdGlvbiBzZXRNdXNpY0xpc3RcbiAgICAgKiBAcGFyYW0ge0FycmF5PGZhbmdrZWhvdS5NdXNpYz59IGxpc3Qg6Z+z5LmQ5YiX6KGoXG4gICAgICovXG4gICAgRlBsYXllci5zZXRNdXNpY0xpc3QgPSBmdW5jdGlvbiAobGlzdCkge1xuICAgICAgICB0aGlzLm1NdXNpY0xpc3QgPSBsaXN0O1xuICAgICAgICB0aGlzLmNoYW5nZSgwKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog6I635Y+W6Z+z5LmQ5YiX6KGoXG4gICAgICogQGZ1bmN0aW9uIGdldE11c2ljTGlzdFxuICAgICAqIEByZXR1cm5zIHtBcnJheTxmYW5na2Vob3UuTXVzaWM+fVxuICAgICAqL1xuICAgIEZQbGF5ZXIuZ2V0TXVzaWNMaXN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tTXVzaWNMaXN0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDmt7vliqDpn7PkuZDliLDliJfooajmnKvlsL5cbiAgICAgKiBAZnVuY3Rpb24gYWRkTXVzaWNcbiAgICAgKiBAcGFyYW0ge2ZhbmdrZWhvdS5NdXNpY30gbXVzaWNcbiAgICAgKi9cbiAgICBGUGxheWVyLmFkZE11c2ljID0gZnVuY3Rpb24gKG11c2ljKSB7XG4gICAgICAgIHRoaXMubU11c2ljTGlzdFt0aGlzLm1NdXNpY0xpc3QubGVuZ3RoXSA9IG11c2ljO1xuICAgICAgICB0aGlzLl9tUGxheUxpc3RbdGhpcy5fbVBsYXlMaXN0Lmxlbmd0aF0gPSBtdXNpYztcbiAgICAgICAgdGhpcy5fcmVmcmVzaExpc3QoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDorr7nva7mkq3mlL7mqKHlvI9cbiAgICAgKiBAZnVuY3Rpb24gc2V0TW9kZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtb2RlXG4gICAgICovXG4gICAgRlBsYXllci5zZXRNb2RlID0gZnVuY3Rpb24gKG1vZGUpIHtcbiAgICAgICAgdGhpcy5tTW9kZSA9IG1vZGU7XG4gICAgICAgIHRoaXMuX3JlZnJlc2hMaXN0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOiOt+WPluW9k+WJjeaSreaUvuaooeW8j1xuICAgICAqIEBmdW5jdGlvbiBnZXRNb2RlXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICBGUGxheWVyLmdldE1vZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1Nb2RlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDorr7nva7nm5HlkKzlmahcbiAgICAgKiBAZnVuY3Rpb24gc2V0TGlzdGVuZXJcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9uKGZhbmdrZWhvdS5GUGxheWVyLCBudW1iZXIpfSBsaXN0ZW5lclxuICAgICAqL1xuICAgIEZQbGF5ZXIuc2V0TGlzdGVuZXIgPSBmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5tTGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5pKt5pS+6YC76L6RXG4gICAgICogQGZ1bmN0aW9uIHBsYXlcbiAgICAgKi9cbiAgICBGUGxheWVyLnBsYXkgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB9XG4gICAgLyoqXG4gICAgICog5pqC5YGc6YC76L6RXG4gICAgICogQGZ1bmN0aW9uIHBhdXNlXG4gICAgICovXG4gICAgRlBsYXllci5wYXVzZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgIH1cbiAgICAvKipcbiAgICAgKiDmkq3mlL7lmajnmoTkuIvkuIDpppbpgLvovpFcbiAgICAgKiBAZnVuY3Rpb24gb25OZXh0XG4gICAgICovXG4gICAgRlBsYXllci5vbk5leHQgPSBmdW5jdGlvbigpe1xuICAgICAgICBpZih0aGlzLm1Nb2RlID09PSBmYW5na2Vob3UuRlBsYXllci5NT0RFX1NJTkdMRSl7XG5cbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoZmFuZ2tlaG91LkZQbGF5ZXIuQUNUSU9OX09OX05FWFQsIHtcbiAgICAgICAgICAgICAgICBcImRldGFpbFwiOiB7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm5leHQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog55So5oi35oyH5a6a5LiL5LiA6aaW6YC76L6RXG4gICAgICogQGZ1bmN0aW9uIG5leHRcbiAgICAgKi9cbiAgICBGUGxheWVyLm5leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBjdXJyZW50ID0gdGhpcy5fbVBsYXlMaXN0WzBdO1xuICAgICAgICB0aGlzLl9tUGxheUxpc3Quc2hpZnQoKTtcbiAgICAgICAgdGhpcy5fbVBsYXlMaXN0LnB1c2goY3VycmVudCk7XG4gICAgICAgIGN1cnJlbnQgPSB0aGlzLl9tUGxheUxpc3RbMF07XG4gICAgICAgIHRoaXMuX3B1c2hTb25nKGN1cnJlbnQpO1xuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KGZhbmdrZWhvdS5GUGxheWVyLkFDVElPTl9PTl9ORVhULCB7XG4gICAgICAgICAgICBcImRldGFpbFwiOiB7XG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpXG4gICAgfVxuICAgIC8qKlxuICAgICAqIOeUqOaIt+aMh+WumuS4iuS4gOmmlumAu+i+kVxuICAgICAqIEBmdW5jdGlvbiBwcmV2aW91c1xuICAgICAqL1xuICAgIEZQbGF5ZXIucHJldmlvdXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBjdXJyZW50ID0gdGhpcy5fbVBsYXlMaXN0W3RoaXMuX21QbGF5TGlzdC5sZW5ndGhdO1xuICAgICAgICB0aGlzLl9tUGxheUxpc3QudW5zaGlmdChjdXJyZW50KTtcbiAgICAgICAgdGhpcy5fbVBsYXlMaXN0LnBvcCgpO1xuICAgICAgICB0aGlzLl9wdXNoU29uZyhjdXJyZW50KTtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudChmYW5na2Vob3UuRlBsYXllci5BQ1RJT05fT05fUFJFVklPVVMsIHtcbiAgICAgICAgICAgIFwiZGV0YWlsXCI6IHtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KSlcbiAgICB9XG4gICAgLyoqXG4gICAgICog5YiH5q2M5bm26YeN5paw6K6h566X5YiX6KGoXG4gICAgICogQGZ1bmN0aW9uIHN3aXRjaFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpZFxuICAgICAqL1xuICAgIEZQbGF5ZXIuc3dpdGNoID0gZnVuY3Rpb24oaWQpe1xuICAgICAgICB0aGlzLl9tUGxheUxpc3QgPSBbXTtcbiAgICAgICAgZm9yKGxldCBpID0gaWQ7IGkgPCB0aGlzLm1NdXNpY0xpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgdGhpcy5fbVBsYXlMaXN0W3RoaXMuX21QbGF5TGlzdC5sZW5ndGhdID0gdGhpcy5tTXVzaWNMaXN0W2ldO1xuICAgICAgICB9XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBpZDsgaSsrKXtcbiAgICAgICAgICAgIHRoaXMuX21QbGF5TGlzdFt0aGlzLl9tUGxheUxpc3QubGVuZ3RoXSA9IHRoaXMubU11c2ljTGlzdFtpXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9yZWZyZXNoTGlzdCgpO1xuICAgICAgICBsZXQgY3VycmVudCA9IHRoaXMuX21QbGF5TGlzdFswXTtcbiAgICAgICAgdGhpcy5fcHVzaFNvbmcoY3VycmVudCk7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoZmFuZ2tlaG91LkZQbGF5ZXIuQUNUSU9OX09OX1NXSVRDSCwge1xuICAgICAgICAgICAgXCJkZXRhaWxcIjoge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9KSlcbiAgICB9XG4gICAgLyoqXG4gICAgICog6YeN5paw55Sf5oiQ6ZqP5py65YiX6KGoXG4gICAgICogQGZ1bmN0aW9uIF9yZWZyZXNoTGlzdFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgRlBsYXllci5fcmVmcmVzaExpc3QgPSBmdW5jdGlvbigpe1xuICAgICAgICBpZih0aGlzLm1Nb2RlICE9PSBmYW5na2Vob3UuRlBsYXllci5NT0RFX1JBTkRPTSl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGN1cnJlbnQgPSB0aGlzLl9tUGxheUxpc3RbMF07XG4gICAgICAgIHRoaXMuX21QbGF5TGlzdC5zaGlmdCgpO1xuICAgICAgICBsZXQgbCA9IHRoaXMuX21QbGF5TGlzdC5sZW5ndGg7XG4gICAgICAgIGxldCBpbmRleCwgdGVtcDtcbiAgICAgICAgd2hpbGUobD4wKXtcbiAgICAgICAgICAgIGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKmwpO1xuICAgICAgICAgICAgdGVtcCA9IHRoaXMuX21QbGF5TGlzdFtsLTFdO1xuICAgICAgICAgICAgdGhpcy5fbVBsYXlMaXN0W2wtMV0gPSB0aGlzLl9tUGxheUxpc3RbaW5kZXhdO1xuICAgICAgICAgICAgdGhpcy5fbVBsYXlMaXN0W2luZGV4XSA9IHRlbXA7XG4gICAgICAgICAgICBsLS07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbVBsYXlMaXN0LnVuc2hpZnQoY3VycmVudCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOmAmui/h011c2lj57G76I635Y+WaWRcbiAgICAgKiBAZnVuY3Rpb24gX2dldElkQnlNdXNpY1xuICAgICAqIEBwYXJhbSB7ZmFuZ2tlaG91Lk11c2ljfSBtdXNpYyDlvoXlr7vmib7pn7PkuZBcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfSBpZFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgRlBsYXllci5fZ2V0SWRCeU11c2ljID0gZnVuY3Rpb24obXVzaWMpe1xuICAgICAgICBpZih0aGlzLm1NdXNpY0xpc3QubGVuZ3RoID09IDApe1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLm1NdXNpY0xpc3QubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgaWYobXVzaWMuZXF1YWxzKHRoaXMubU11c2ljTGlzdFtpXSkpe1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5ZCR5pKt5pS+5Zmo5o6o6YCB5q2M5puy5bm25Yid5aeL5YyWXG4gICAgICogQGZ1bmN0aW9uIF9wdXNoU29uZ1xuICAgICAqIEBwYXJhbSB7ZmFuZ2tlaG91Lk11c2ljfSBtdXNpY1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgRlBsYXllci5fcHVzaFNvbmcgPSBmdW5jdGlvbiAobXVzaWMpe1xuICAgICAgICBpZihtdXNpYy5lcXVhbHModGhpcy5tTXVzaWNMaXN0W3RoaXMuX21DdXJyZW50SWRdKSl7XG5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tQ3VycmVudElkID0gdGhpcy5fZ2V0SWRCeU11c2ljKG11c2ljKTtcbiAgICB9XG5cbiAgICAvL+aWh+aho+WcqHtAbGluayBGUGxheWVyfeS4reOAguOAguOAguOAguOAguOAglxuICAgIGZhbmdrZWhvdS5GUGxheWVyID0gRlBsYXllcjtcblxufSgpKSIsIi8vZmFuZ2tlaG915ZG95ZCN56m66Ze077yM6YG/5YWN5re35reGXG50aGlzLmZhbmdrZWhvdSA9IHRoaXMuZmFuZ2tlaG91IHx8IHt9O1xuXG4oZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEx5cmljIOatjOivjeexu1xuICAgICAqXG4gICAgICog5Li76KaB5Yqf6IO95Li66KGo56S65ZKM6Kej5p6Q5q2M6K+N77yM5q+P5LiA5LiqTHlyaWPlrp7kvovmmK/kuIDooYzmrYzor43jgIJcbiAgICAgKlxuICAgICAqIOS4gOiIrOaDheWGteS4i0x5cmlj57G75Lya5LulIEFycmF5PEx5cmljPiDnmoTlvaLlvI/lh7rnjrDvvIxMeXJpY+exu+S4reS5n+acieS4k+mXqOeahOaWueazleWwhmxyY+aWh+S7tu+8iOWtl+espuS4suW9ouW8j++8iei9rOaNouaIkEx5cmlj5pWw57uEXG4gICAgICpcbiAgICAgKiDov5nmmK9MeXJpY+exu+eahOaehOmAoOWHveaVsO+8jOWQjOaXtuS5n+aJv+i9vUx5cmlj55qE57G75a6a5LmJ44CCXG4gICAgICpcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIOW8gOWni+aXtumXtFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBseXJpYyDmrYzor43mlofmnKxcbiAgICAgKlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEx5cmljKHRpbWUsIGx5cmljKSB7XG4gICAgICAgIHRoaXMudGltZSA9IHRpbWU7XG4gICAgICAgIHRoaXMubHlyaWMgPSBseXJpYztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDov5nmrrXmrYzor43lvIDlp4vnmoTml7bpl7RcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqL1xuICAgIEx5cmljLnRpbWUgPSB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICog6L+Z5q615q2M6K+N55qE5paH5pysXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICBMeXJpYy5seXJpYyA9IHVuZGVmaW5lZDtcblxuICAgIC8qKlxuICAgICAqIOWPr+iDveaYr0x5cmlj57G75Lit5ZSv5LiA55qE5Ye95pWw5LqG44CC44CC44CC44CC44CC6LSf6LSj6Kej5p6QbHJj5paH5Lu277yI5a2X56ym5Liy5Liq5LqL77yJXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxyY1N0cmluZ1xuICAgICAqIEByZXR1cm5zIHtmYW5na2Vob3UuTHlyaWNbXX1cbiAgICAgKi9cbiAgICBMeXJpYy5mcm9tTHJjU3RyaW5nID0gZnVuY3Rpb24obHJjU3RyaW5nKXtcbiAgICAgICAgLy/lhYjmiormrYzor43pgJrov4flm57ovabliIfliIZcbiAgICAgICAgbGV0IGx5cmljTGluZXMgPSBscmNTdHJpbmcuc3BsaXQoJ1xcbicpO1xuICAgICAgICBsZXQgbHlyaWNzTGlzdCA9IFtdO1xuICAgICAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGx5cmljTGluZXMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgLy/ljrvmjonmr4/kuKp0YWfliY3lkozlkI7nmoTnqbrmoLxcbiAgICAgICAgICAgIGxldCBjdXJyZW50THlyaWMgPSBseXJpY0xpbmVzW2ldLnJlcGxhY2UoL1tcXHNdKlxcWy9nLCBcIltcIikucmVwbGFjZSgvXVtcXHNdKi9nLCBcIl1cIik7XG4gICAgICAgICAgICBsZXQgdGltZSA9IGN1cnJlbnRMeXJpYy5zdWJzdHJpbmcoY3VycmVudEx5cmljLmluZGV4T2YoXCJbXCIpICsgMSwgY3VycmVudEx5cmljLmluZGV4T2YoXCJdXCIpKS5zcGxpdCgnOicpO1xuICAgICAgICAgICAgLy/moLnmja7lrprkuYnov5nph4zmnInkuKpvZmZzZXTmlbDlgLzvvIzmmK/mrYzor43mlbTkvZPnmoTlgY/np7vph4/vvIzlupTor6Xor4bliKvkuIDkuItcbiAgICAgICAgICAgIGlmKHRpbWVbMF0udG9Mb3dlckNhc2UoKSA9PSBcIm9mZnNldFwiKXtcbiAgICAgICAgICAgICAgICBvZmZzZXQgPSBwYXJzZUludCh0aW1lWzFdKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8v5Ymp5LiL55qE6Z2e5pe26Ze05qCH562+5oqb5o6J5bCx5aW95LqG77yM5a+55q2M6K+N5pi+56S65rKh5LuA5LmI55SoXG4gICAgICAgICAgICBpZihpc05hTihwYXJzZUludCh0aW1lWzBdKSkpe1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy/kuIDooYzmrYzor43lj6/og73mnInlpJrkuKrml7bpl7R0YWfvvIzliIbliKvku6PooajkuI3lkIznmoTml7bpl7TngrnvvIzlupTor6XliIblh7rmnaXvvIjov5nkuKrmmK9scmPmoLzlvI/mnIDng6bkurrnmoTngrnvvIlcbiAgICAgICAgICAgIGxldCByZWcgPSAvXFxbWzAtOTouXSpdL2c7XG4gICAgICAgICAgICB0aW1lID0gY3VycmVudEx5cmljLm1hdGNoKHJlZyk7XG4gICAgICAgICAgICBsZXQgbHlyaWNTdGFydCA9IDA7XG4gICAgICAgICAgICBmb3IobGV0IHggPSAwOyB4IDwgdGltZS5sZW5ndGg7IHgrKyl7XG4gICAgICAgICAgICAgICAgbHlyaWNTdGFydCArPSB0aW1lW3hdLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBseXJpY1N0cmluZyA9IGN1cnJlbnRMeXJpYy5zdWJzdHJpbmcobHlyaWNTdGFydCk7XG4gICAgICAgICAgICBmb3IobGV0IHggPSAwOyB4IDwgdGltZS5sZW5ndGg7IHgrKyl7XG4gICAgICAgICAgICAgICAgbGV0IGx5cmljVGltZSA9IHRpbWVbeF0uc3Vic3RyaW5nKDEsIHRpbWVbeF0ubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBseXJpY1RpbWUgPSBseXJpY1RpbWUuc3BsaXQoJzonKTtcbiAgICAgICAgICAgICAgICAvL+aKiuaXtumXtOi9rOaNouaIkOenkuaVsO+8iOW4puacieS4gOS4quS4ieS9jeWwj+aVsOihqOekuuavq+enku+8iVxuICAgICAgICAgICAgICAgIGx5cmljVGltZSA9IHBhcnNlRmxvYXQoTWF0aC5tYXgoKHBhcnNlSW50KGx5cmljVGltZVswXSkgKiA2MCArIHBhcnNlRmxvYXQobHlyaWNUaW1lWzFdKSArIG9mZnNldCAvIDEwMDAuMCksIDAuMCkudG9GaXhlZCgzKSk7XG4gICAgICAgICAgICAgICAgbHlyaWNzTGlzdFtseXJpY3NMaXN0Lmxlbmd0aF0gPSBuZXcgZmFuZ2tlaG91Lkx5cmljKGx5cmljVGltZSwgbHlyaWNTdHJpbmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8v5oqK5re35Lmx55qE5q2M6K+N5o6S5bqPXG4gICAgICAgIGx5cmljc0xpc3Quc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGEudGltZSAtIGIudGltZTtcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGx5cmljc0xpc3Q7XG4gICAgfVxuXG4gICAgLy/mlofmoaPlnKh7QGxpbmsgTHlyaWN95Lit44CC44CC44CC44CC44CC44CCXG4gICAgZmFuZ2tlaG91Lkx5cmljID0gTHlyaWM7XG59KCkpIiwiLy9mYW5na2Vob3Xlkb3lkI3nqbrpl7TvvIzpgb/lhY3mt7fmt4ZcbnRoaXMuZmFuZ2tlaG91ID0gdGhpcy5mYW5na2Vob3UgfHwge307XG5cbihmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogTXVzaWMg5q2M5puy57G7XG4gICAgICpcbiAgICAgKiDkuLvopoHlip/og73kuLrkv53lrZjmrYzmm7Lkv6Hmga/vvIzlkIzml7bkuZ/lj6/ku6XlpITnkIbpg6jliIblhbPkuo7mrYzor43lkozpn7PpopHlhoXlrrnnmoTlj4LmlbBcbiAgICAgKlxuICAgICAqIOS8muiHquWKqOaKimxyY+agvOW8j+eahOatjOivjei9rOWMluaIkEx5cmlj5pWw57uE77yM5oiW6ICF5oqKXG4gICAgICpcbiAgICAgKiDov5nmmK9NdXNpY+exu+eahOaehOmAoOWHveaVsO+8jOWQjOaXtuS5n+aJv+i9vU11c2lj55qE57G75a6a5LmJ44CCXG4gICAgICpcbiAgICAgKiBAY2xhc3MgTXVzaWNcbiAgICAgKiBAY29uc3RydWN0b3JcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIOatjOabsuWQjVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhcnRpc3Qg5ryU5ZSx6ICFXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNvdmVyIOWwgemdoumTvuaOpVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfGZhbmdrZWhvdS5MeXJpY1tdfSBscmMg5q2M6K+N77yI5Y+v5Lul5piv5o6S5bqP6L+H55qETHlyaWPmlbDnu4TvvIzkuZ/lj6/ku6XmmK9McmPmlofku7bvvIjlrZfnrKbkuLLmoLzlvI/vvInvvIlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xCbG9ifSBjb250ZW50IOmfs+mikeWGheWuue+8iOWPr+S7peaYr+mTvuaOpe+8iOacrOWcsOaIluWcqOe6v++8ieaIluiAhUJsb2LnsbvvvIlcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBNdXNpYyhuYW1lLCBhcnRpc3QsIGNvdmVyLCBscmMsIGNvbnRlbnQpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5hcnRpc3QgPSBhcnRpc3Q7XG4gICAgICAgIHRoaXMuY292ZXIgPSBjb3ZlcjtcbiAgICAgICAgaWYodHlwZW9mIGxyYyA9PT0gJ3N0cmluZycpe1xuICAgICAgICAgICAgdGhpcy5scmMgPSBmYW5na2Vob3UuTHlyaWMuZnJvbUxyY1N0cmluZyhscmMpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGxyYyBpbnN0YW5jZW9mIEFycmF5KXtcbiAgICAgICAgICAgIHRoaXMubHJjID0gbHJjO1xuICAgICAgICB9XG4gICAgICAgIGlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJyl7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICB9XG4gICAgICAgIGlmKGNvbnRlbnQgaW5zdGFuY2VvZiBCbG9iKXtcbiAgICAgICAgICAgIHRoaXMuY29udGVudCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoY29udGVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiDpn7PkuZDlkI3np7BcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIE11c2ljLm5hbWUgPSB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICog5q2M5omLXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKi9cbiAgICBNdXNpYy5hcnRpc3QgPSB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICog5bCB6Z2i77yI6ZO+5o6l77yMaHR0cOaIlmJsb2LmiJZiYXNlNjTvvIlcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqL1xuICAgIE11c2ljLmNvdmVyID0gdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIOatjOivje+8iEx5cmlj5pWw57uE77yJXG4gICAgICogQHR5cGUge2ZhbmdrZWhvdS5MeXJpY1tdfVxuICAgICAqL1xuICAgIE11c2ljLmxyYyA9IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiDpn7PpopHlhoXlrrnvvIhibG9i5oiWaHR0cO+8iVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICovXG4gICAgTXVzaWMuY29udGVudCA9IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiDliKTmlq3kuKTkuKpNdXNpY+exu+aYr+WQpuebuOWQjO+8jOmAmui/h+amgueOh+WIpOaWrVxuICAgICAqIEBmdW5jdGlvbiBlcXVhbHNcbiAgICAgKiBAcGFyYW0ge2ZhbmdrZWhvdS5NdXNpY30gbXVzaWNcbiAgICAgKi9cbiAgICBNdXNpYy5lcXVhbHMgPSBmdW5jdGlvbiAobXVzaWMpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IDA7XG4gICAgICAgIGlmKHRoaXMubmFtZSA9PT0gbXVzaWMubmFtZSkge1xuICAgICAgICAgICAgcmVzdWx0Kys7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5hcnRpc3QgPT09IG11c2ljLmFydGlzdCl7XG4gICAgICAgICAgICByZXN1bHQrKztcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLmNvbnRlbnQgPT09IG11c2ljLmNvbnRlbnQpe1xuICAgICAgICAgICAgcmVzdWx0Kys7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5jb3ZlciA9PT0gbXVzaWMuY292ZXIpe1xuICAgICAgICAgICAgcmVzdWx0Kys7XG4gICAgICAgIH1cbiAgICAgICAgaWYocmVzdWx0ID49IDIpe1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubHJjID09PSBtdXNpYy5scmM7XG5cbiAgICB9XG5cbiAgICAvL+aWh+aho+WcqHtAbGluayBNdXNpY33kuK3jgILjgILjgILjgILjgILjgIJcbiAgICBmYW5na2Vob3UuTXVzaWMgPSBNdXNpYztcblxufSgpKSJdfQ==