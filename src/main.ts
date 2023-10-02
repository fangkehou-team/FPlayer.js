import { defineCustomElement } from 'vue'
import FPlayerCE from './FPlayer.ce.vue'
import RandomUtil from "@/utils/RandomUtil";
import LogUtil from "@/utils/LogUtil";
import type Music from "@/beans/Music";
import InstanceUtil from "@/utils/InstanceUtil";

const FPlayerComponent = defineCustomElement(FPlayerCE);

/**
 * FPlayerConfig FPlayer配置参数<br>
 * <br>
 * {string} mode: 播放模式（可选三个值：FPlayer.MODE_SINGLE 单曲循环, FPlayer.MODE_LIST 列表循环, FPlayer.MODE_RANDOM 列表随机）<br>
 * {boolean} autoPlay: 加载完成自动播放（仅第一首歌需要该设置，且需要用户同意自动播放或用户在网页内操作后才能自动播放）<br>
 * {boolean} autoSkip: 播放失败是否自动切换下一曲（true 或 false）
 */
type FPlayerConfig = {
  mode: string;
  autoPlay: boolean;
  autoSkip: boolean;
}

/**
 * <b>介绍</b><br>
 * 欢迎使用FPlayer - Fangkehou Player ！<br>
 * 这是一款针对现代化浏览器设计的音乐播放器，具有界面美观，设置方便的优点（净能瞎吹-_-#）<br>
 * 您既可以直接以默认设置直接使用，也可以对FPlayer做出自定义的设置<br>
 * <br>
 * FPlayer允许用户通过参数对FPlayer外观，行为进行调整。<br>
 *
 *
 * @class FPlayer
 *
 * @example
 * var FPlayer = FPlayer.create("container", {
 *
 * });
 */
export default class FPlayer {

  /**
   * 监听常量，FPlayer加载完成时触发
   * @type {string}
   */
  public static readonly ACTION_PREPARE_READY = "prepare_ready";
  /**
   * 监听常量，FPlayer加载失败时触发
   * @type {string}
   */
  public static readonly ACTION_PREPARE_FAIL = "prepare_fail";
  /**
   * 监听常量，开始播放时触发
   * @type {string}
   */
  public static readonly ACTION_ON_PLAY = "on_play";
  /**
   * 监听常量，音乐加载完成时触发
   * @type {string}
   */
  public static readonly ACTION_ON_LOAD = "on_load";
  /**
   * 监听常量，暂停时触发
   * @type {string}
   */
  public static readonly ACTION_ON_PAUSE = "on_pause";
  /**
   * 监听常量，切歌时触发
   * @type {string}
   */
  public static readonly ACTION_ON_SWITCH = "on_switch";
  /**
   * 监听常量，下一曲触发
   * @type {string}
   */
  public static readonly ACTION_ON_NEXT = "on_next";
  /**
   * 监听常量，上一曲触发
   * @type {string}
   */
  public static readonly ACTION_ON_PREVIOUS = "on_previous";
  /**
   * 监听常量，失败时触发
   * @type {string}
   */
  public static readonly ACTION_ON_FAIL = "on_fail";
  /**
   * 播放模式，单曲循环
   * @type {string}
   */
  public static readonly MODE_SINGLE = "single";
  /**
   * 播放模式，列表循环
   * @type {string}
   */
  public static readonly MODE_LIST = "list";
  /**
   * 播放模式，列表随机
   * @type {string}
   */
  public static readonly MODE_RANDOM = "random";

  private mView: HTMLElement;
  private config: FPlayerConfig;
  private rootViewId: string;
  private listeners: ((player: FPlayer, action: string) => void)[];

  public static init() {
    customElements.define('f-player', FPlayerComponent)
  }


  /**
   *
   * 这是FPlayer构造函数，实现了FPlayer与容器和FPlayer设置参数的绑定，同时也承载FPlayer的类定义。
   *
   * @class FPlayer
   * @constructor
   *
   * @param {HTMLElement} container FPlayer将要填充的容器
   * @param {object} config FPlayer设置参数
   *
   * @example
   * var FPlayer = FPlayer.create("container", {
   *
   * })
   *
   * @see
   * FPlayerConfig
   */

  public static create(container: string | HTMLElement, config: FPlayerConfig) {

    if (container instanceof HTMLElement) {
      return new FPlayer(container, config);
    }
    if (document.getElementById(container) != null) {
      return new this(document.getElementById(container)!, config);
    }
    throw new Error("Unable to initialize FPlayer: No valid Container available");
  }

  /**
   * 这是FPlayer构造函数，实现了FPlayer与容器和FPlayer设置参数的绑定，同时也承载FPlayer的类定义。
   *
   * @constructor
   *
   * @param {HTMLElement} container FPlayer将要填充的容器
   * @param {FPlayerConfig} config FPlayer设置参数
   */
  private constructor(container: HTMLElement, config: FPlayerConfig) {
    const rootViewId = RandomUtil.randomString(20);
    this.rootViewId = rootViewId;

    config = {
      //@ts-ignore
      mode: FPlayer.MODE_SINGLE,
      //@ts-ignore
      autoPlay: false,
      //@ts-ignore
      autoSkip: true,
      ...config
    }

    this.mView = new DOMParser().parseFromString(`<f-player mode="${config.mode}" ${config.autoPlay ? "auto-play" : ""} ${config.autoSkip ? "auto-skip" : ""} class="${rootViewId}"></f-player>`, 'text/html')
      .querySelector(`.${rootViewId}`)!;
    this.config = config;
    this.listeners = [];
    container.appendChild(this.mView);

    InstanceUtil.getVueInstance(this.mView).exposed.setFPlayerInstance(this);

    LogUtil.info("%c FPlayer %c https://github.com/fangkehou-team/FPlayer.js", "padding: 5px; font-weight: bold; font-size: 20px; color: #272727; background: #FFD033", "padding: 5px; font-weight: bold; font-size: 20px; color: #272727; background: #9EFF3C");
  }

  public setMusicList(newMusicList: Music[]) {
    LogUtil.debug(InstanceUtil.getVueInstance(this.mView).exposed);
    LogUtil.debug(typeof this.mView);
    InstanceUtil.getVueInstance(this.mView).exposed.setMusicList(newMusicList);
  }

  public play() {
    LogUtil.debug(InstanceUtil.getVueInstance(this.mView).exposed);
    LogUtil.debug("FPlayer play");
    InstanceUtil.getVueInstance(this.mView).exposed.play();
  }

  public pause() {
    LogUtil.debug(InstanceUtil.getVueInstance(this.mView).exposed);
    LogUtil.debug("FPlayer pause");
    InstanceUtil.getVueInstance(this.mView).exposed.pause();
  }

  public next() {
    LogUtil.debug(InstanceUtil.getVueInstance(this.mView).exposed);
    LogUtil.debug("FPlayer next");
    InstanceUtil.getVueInstance(this.mView).exposed.next();
  }

  public previous() {
    LogUtil.debug(InstanceUtil.getVueInstance(this.mView).exposed);
    LogUtil.debug("FPlayer previous");
    InstanceUtil.getVueInstance(this.mView).exposed.previous();
  }

  public addListener(listener: (player: FPlayer, action: string) => void) {
    this.listeners.push(listener);
  }

  public notifyListener(action: string) {
    this.listeners.forEach((listener) => {
      listener(this, action);
    })
  }
}
