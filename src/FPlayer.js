//fangkehou命名空间，避免混淆
this.fangkehou = this.fangkehou || {};

(function () {
    /**
     * <b>介绍</b><br />
     * 欢迎使用FPlayer - Fangkehou Player ！
     * 这是一款针对现代化浏览器设计的音乐播放器，具有界面美观，设置方便的优点（净能瞎吹-_-#）<br/>
     * 您既可以直接以默认设置直接使用，也可以对FPlayer做出自定义的设置
     *
     * FPlayer允许用户通过参数对FPlayer外观，行为进行调整，具体规则及定义如下：
     *
     * @todo 参数的定义
     * {string} mode: 播放模式（可选三个值：FPlayer.MODE_SINGLE 单曲循环, FPlayer.MODE_LIST 列表循环, FPlayer.MODE_RANDOM 列表随机）<br/>
     * {boolean} autoPlay: 加载完成自动播放（仅第一首歌需要该设置，且需要用户同意自动播放或用户在网页内操作后才能自动播放）<br/>
     * {boolean} autoSkip: 播放失败是否自动切换下一曲（true 或 false）
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
        //TODO:和yao对接，实现view相关
        this.mMode = options.mode || fangkehou.FPlayer.MODE_LIST;
        this.mAutoSkip = options.autoSkip || true;
        this._mPlayer = new Audio();
        this._mPlayer.mFPlayerInstance = this;
        this._mPlayer.addEventListener("canplaythrough", function () {
            //todo: view更新
            this.mFPlayerInstance.mListener(this.mFPlayerInstance, fangkehou.FPlayer.ACTION_ON_LOAD);
            if (this.mFPlayerInstance._mIsPlaying) {
                this.play()
                    .catch();
            }
        })
        this._mPlayer.addEventListener("pause", function () {
            //todo: view更新
            if (this.mFPlayerInstance._mIsPlaying) {
                console.log("end of song");
                this.mFPlayerInstance.mListener(this.mFPlayerInstance, fangkehou.FPlayer.ACTION_ON_NEXT);
                this.mFPlayerInstance.onNext();
            }
        })
        this._mPlayer.addEventListener("error", function () {
            console.log("failed to load")
            this.mFPlayerInstance.mListener(this.mFPlayerInstance, fangkehou.FPlayer.ACTION_ON_FAIL);
            if (this.mFPlayerInstance._mIsPlaying) {
                if (this.mFPlayerInstance.mAutoSkip) {
                    this.mFPlayerInstance.next();
                } else {
                    //todo:停止并报错，更新view
                    this.mFPlayerInstance.pause();
                }

            }
        })
        this._mPlayer.addEventListener("timeupdate", function(){
            this.mFPlayerInstance._doLyricChange(this.currentTime);
        })
        console.log("%c FPlayer %c https://github.com/fangkehou-team/FPlayer", "padding: 5px; font-weight: bold; font-size: 20px; color: #272727; background: #FFD033", "padding: 5px; font-weight: bold; font-size: 20px; color: #272727; background: #9EFF3C");
    }

    let f = FPlayer.prototype;
    f.constructor = FPlayer;

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
    f.init = function () {

    }
    /**
     * FPlayer销毁函数
     */
    f.destroy = function () {

    }
    /**
     * FPlayer配置更新后调用函数，本质上是吧FPlayer销毁后重新创建
     */
    f.update = function () {

    }

    //todo: 和yao对接，完成FPlayer.THEME_ 主题，FPlayer.MODE_ 模式，FPlayer.ACTION_ 事件等常量设置
    /**
     * 监听常量，FPlayer加载完成时触发
     * @type {string}
     */
    FPlayer.ACTION_PREPARE_READY = "prepare_ready";
    /**
     * 监听常量，FPlayer加载失败时触发
     * @type {string}
     */
    FPlayer.ACTION_PREPARE_FAIL = "prepare_fail";
    /**
     * 监听常量，开始播放时触发
     * @type {string}
     */
    FPlayer.ACTION_ON_PLAY = "on_play";
    /**
     * 监听常量，音乐加载完成时触发
     * @type {string}
     */
    FPlayer.ACTION_ON_LOAD = "on_load";
    /**
     * 监听常量，暂停时触发
     * @type {string}
     */
    FPlayer.ACTION_ON_PAUSE = "on_pause";
    /**
     * 监听常量，切歌时触发
     * @type {string}
     */
    FPlayer.ACTION_ON_SWITCH = "on_switch";
    /**
     * 监听常量，下一曲触发
     * @type {string}
     */
    FPlayer.ACTION_ON_NEXT = "on_next";
    /**
     * 监听常量，上一曲触发
     * @type {string}
     */
    FPlayer.ACTION_ON_PREVIOUS = "on_previous";
    /**
     * 监听常量，失败时触发
     * @type {string}
     */
    FPlayer.ACTION_ON_FAIL = "on_fail";
    /**
     * 播放模式，单曲循环
     * @type {string}
     */
    FPlayer.MODE_SINGLE = "single";
    /**
     * 播放模式，列表循环
     * @type {string}
     */
    FPlayer.MODE_LIST = "list";
    /**
     * 播放模式，列表随机
     * @type {string}
     */
    FPlayer.MODE_RANDOM = "random";
    /**
     * 播放器panel模板
     * @type {string}
     */
    FPlayer.TEMPLATE_HTML_PANEL = '';
    /**
     * 播放列表模板
     * @type {string}
     */
    FPlayer.TEMPLATE_HTML_LIST = '';
    /**
     * 歌词模板
     * @type {string}
     */
    FPlayer.TEMPLATE_HTML_LYRIC = '';
    /**
     * CSS
     * @type {string}
     */
    FPlayer.TEMPLATE_CSS = '';

    /**
     * FPlayer将要填充的容器
     * @type {HTMLElement}
     */
    f.mContainer = undefined;
    /**
     * FPlayer主题
     * @type {number}
     */
    f.mTheme = undefined;
    /**
     * FPlayer音乐列表
     * @type {Array<Music>}
     */
    f.mMusicList = [];
    /**
     * FPlayer播放模式
     * @type {number}
     */
    f.mMode = undefined;
    /**
     * FPlayer事件监听器
     * @type {function(FPlayer, string)}
     * @param {FPlayer} player 监听返回的播放器
     * @param {string} event 监听ACTION
     */
    f.mListener = function (player, event) {

    };
    /**
     * 播放失败自动下一曲
     * @type {boolean}
     */
    f.mAutoSkip = true;
    /**
     * 绑定的view
     * @type {HTMLElement}
     * @private
     */
    f._mView = undefined;
    /**
     * 音量
     * @type {number}
     * @private
     */
    f._mVolume = undefined;
    /**
     * 播放列表（真正的播放顺序）
     * @type {Music[]}
     * @private
     */
    f._mPlayList = [];
    /**
     * 当前播放音乐Id
     * @type {number}
     * @private
     */
    f._mCurrentId = undefined;
    /**
     * 当前播放使用的audio标签
     * @type {HTMLAudioElement}
     * @private
     */
    f._mPlayer = undefined;
    /**
     * 当前是否播放音乐
     * @type {boolean}
     * @private
     */
    f._mIsPlaying = false;
    /**
     * 当前音乐的lyric数组
     * @type {Lyric[]}
     * @private
     */
    f._mCurrentLyric = [];
    /**
     * 当前播放到的lyric id
     * @type {number}
     * @private
     */
    f._mCurrentLyricId = undefined;
    /**
     * 该lyric开始时间
     * @type {number}
     * @private
     */
    f._mCurrentLyricStartTime = undefined;
    /**
     * 该lyric停止时间
     * @type {number}
     * @private
     */
    f._mCurrentLyricEndTime = undefined;

    /**
     * 设置主题
     *
     * @function setTheme
     * @param {number} theme
     */
    FPlayer.setTheme = function (theme) {
        this.mTheme = theme;
        //todo: 更新view
    }
    /**
     * 获取当前主题
     * @function getTheme
     * @returns {number} 主题代码
     */
    f.getTheme = function () {
        return this.mTheme;
    }
    /**
     * 设置音乐列表
     * @function setMusicList
     * @param {Array<Music>} list 音乐列表
     */
    f.setMusicList = function (list) {
        this.mMusicList = list;
        this.switch(0);
    }
    /**
     * 获取音乐列表
     * @function getMusicList
     * @returns {Array<Music>}
     */
    f.getMusicList = function () {
        return this.mMusicList;
    }
    /**
     * 添加音乐到列表末尾
     * @function addMusic
     * @param {Music} music
     */
    f.addMusic = function (music) {
        this.mMusicList[this.mMusicList.length] = music;
        this._mPlayList[this._mPlayList.length] = music;
        if (typeof this._mCurrentId == "undefined") {
            this.switch(0);
        } else {
            this._refreshList();
        }
    }

    /**
     * 设置播放模式
     * @function setMode
     * @param {number} mode
     */
    f.setMode = function (mode) {
        this.mMode = mode;
        this._refreshList();
    }
    /**
     * 获取当前播放模式
     * @function getMode
     * @returns {number}
     */
    f.getMode = function () {
        return this.mMode;
    }
    /**
     * 设置监听器
     * @function setListener
     * @param {function(FPlayer, number)} listener
     */
    f.setListener = function (listener) {
        this.mListener = listener;
    }
    /**
     * 播放逻辑
     * @function play
     */
    f.play = function () {
        //todo: 更新view
        this._mIsPlaying = true;
        if (this._mPlayer.readyState >= 2) {
            this._mPlayer.play()
                .catch();
        }
    }
    /**
     * 暂停逻辑
     * @function pause
     */
    f.pause = function () {
        //todo: 更新view
        this._mIsPlaying = false;
        this._mPlayer.pause();
    }
    /**
     * 设置进度
     * @param {number} progress
     */
    f.setProgress = function (progress) {
        if (this._mPlayer.readyState >= 2 && this._mPlayer.duration >= progress) {
            this._mPlayer.currentTime = progress;
        }
    }
    /**
     * 音量修改
     * @param {number} volume
     */
    f.setVolume = function (volume) {
        if(volume >= 0 && volume <= 1){
            this._mPlayer.volume = volume;
            return;
        }
        console.error("FPlayer: Failed to set volume");
    }
    /**
     * 播放器的下一首逻辑
     * @function onNext
     */
    f.onNext = function () {
        console.log("onNext");
        if (this.mMode === fangkehou.FPlayer.MODE_SINGLE) {
            console.log("single mode");
            this._pushSong(this._mPlayList[0]);
            this.mListener(this, fangkehou.FPlayer.ACTION_ON_NEXT);
            return;
        }
        this.next();
    }
    /**
     * 用户指定下一首逻辑
     * @function next
     */
    f.next = function () {
        let current = this._mPlayList[0];
        this._mPlayList.shift();
        this._mPlayList.push(current);
        current = this._mPlayList[0];
        this._pushSong(current);
        this.play();
        this.mListener(this, fangkehou.FPlayer.ACTION_ON_NEXT);
    }
    /**
     * 用户指定上一首逻辑
     * @function previous
     */
    f.previous = function () {
        let current = this._mPlayList[this._mPlayList.length - 1];
        this._mPlayList.unshift(current);
        this._mPlayList.pop();
        this._pushSong(current);
        this.mListener(this, fangkehou.FPlayer.ACTION_ON_PREVIOUS);
    }
    /**
     * 切歌并重新计算列表
     * @function switch
     * @param {number} id
     */
    f.switch = function (id) {
        this._mPlayList = [];
        for (let i = id; i < this.mMusicList.length; i++) {
            this._mPlayList[this._mPlayList.length] = this.mMusicList[i];
        }
        for (let i = 0; i < id; i++) {
            this._mPlayList[this._mPlayList.length] = this.mMusicList[i];
        }
        this._refreshList();
        let current = this._mPlayList[0];
        this._pushSong(current);
        this.mListener(this, fangkehou.FPlayer.ACTION_ON_SWITCH);
    }
    /**
     * 重新生成随机列表
     * @function _refreshList
     * @private
     */
    f._refreshList = function () {
        if (this.mMode !== fangkehou.FPlayer.MODE_RANDOM) {
            return;
        }
        let current = this._mPlayList[0];
        this._mPlayList.shift();
        let l = this._mPlayList.length;
        let index, temp;
        while (l > 0) {
            index = Math.floor(Math.random() * l);
            temp = this._mPlayList[l - 1];
            this._mPlayList[l - 1] = this._mPlayList[index];
            this._mPlayList[index] = temp;
            l--;
        }
        this._mPlayList.unshift(current);
    }
    /**
     * 通过Music类获取id
     * @function _getIdByMusic
     * @param {Music} music 待寻找音乐
     * @returns {number} id
     * @private
     */
    f._getIdByMusic = function (music) {
        if (this.mMusicList.length == 0) {
            return -1;
        }
        for (let i = 0; i < this.mMusicList.length; i++) {
            if (music.equals(this.mMusicList[i])) {
                return i;
            }
        }
        return -1;
    }
    /**
     * 向播放器推送歌曲并初始化
     * @function _pushSong
     * @param {Music} music
     * @private
     */
    f._pushSong = function (music) {
        console.log("pushSong")
        if (typeof this._mCurrentId != "undefined" && music.equals(this.mMusicList[this._mCurrentId])) {
            console.log("single");
            if (this._mPlayer.readyState >= 2) {
                this._mPlayer.play()
                    .catch();
            }
            return;
        }
        console.log("next")
        this._mCurrentId = this._getIdByMusic(music);
        this._mCurrentLyric = music.lrc;
        this._switchLyric(0);
        //todo:view更新
        this._mPlayer.src = music.content;
        this._mPlayer.load();
    }
    /**
     * player的监听，负责控制歌词
     * @param {number} currentTime 当前进度
     * @private
     */
    f._doLyricChange = function(currentTime){
        if(currentTime >= this._mCurrentLyricStartTime && currentTime < this._mCurrentLyricEndTime){
            //todo: view更新
        }else if(currentTime >= this._mCurrentLyricEndTime && this._mCurrentLyricId < this._mCurrentLyric.length - 1){
            for(let i = this._mCurrentLyricId; i < this._mCurrentLyric.length; i++){
                if(currentTime <= this._mCurrentLyric[i].time){
                    this._switchLyric(i - 1);
                    break;
                }
            }
        }else if(currentTime <= this._mCurrentLyricStartTime){
            for(let i = 0; i < this._mCurrentLyricId + 1; i++){
                if(currentTime <= this._mCurrentLyric[i].time){
                    this._switchLyric(i - 1);
                    break;
                }
            }
        }
    }
    /**
     * 切换歌词到新的一行
     * @param {number} currentLyricId 应该切换到的歌词id
     * @private
     */
    f._switchLyric = function(currentLyricId){
        if(this._mCurrentLyric[currentLyricId].lyric.length != 0){
            this._mCurrentLyricId = currentLyricId;
            this._mCurrentLyricStartTime = this._mCurrentLyric[currentLyricId].time;
            if(typeof this._mCurrentLyric[currentLyricId + 1] != "undefined"){
                this._mCurrentLyricEndTime = this._mCurrentLyric[currentLyricId + 1].time;
            }
            console.log(this._mCurrentLyric[currentLyricId].lyric);
            //todo: view更新
        }else{
            this._mCurrentLyricId = currentLyricId;
            this._mCurrentLyricEndTime = this._mCurrentLyric[currentLyricId + 1].time;
        }
    }

    fangkehou.FPlayer = FPlayer;

}())