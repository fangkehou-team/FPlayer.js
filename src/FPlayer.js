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
            this._pushSong(this._mPlayList[0]);
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