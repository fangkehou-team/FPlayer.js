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