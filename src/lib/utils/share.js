/**
 * share 分享组件，现继承手Q分享和微信内嵌页分享
 * 2014/12/30 by lqlongli
 *
 * @ref: [MQQ JS API](http://mqq.oa.com/api/index.html)
 * @ref: [微信WebView常用JS API介绍](http://km.oa.com/group/700/articles/show/172714)
 *
 * 初始化
 * @flag: 初始化组件标识位，目前有share.FLAG_MQQ和share.FLAG_WEIXIN两个，可组合
 * @title: 分享标题，默认是'腾讯课堂'，会被<meta itemprop="name" content="..."/>覆盖
 * @desc: 分享描述，默认是'海量精品课，限时免费，赶快来学吧！'，会被<meta itemprop="description" content="..."/>覆盖
 * @image: 分享图片链接，默认是在线教育logo，会被<meta itemprop="image" content="..."/>覆盖
 * @url: 分享链接，默认是当前页面链接
 * @beforeMQQShare: function，在MQQ分享之前调用，可以修改分享内容
 *  - args:
 *      - shareParams: 分享内容对象
 *  - return:
 *      - shareParams: 修改之后的分享内容对象
 * @beforeMQQShareTimeline: function，在MQQ分享微信朋友圈之前调用，可以修改分享内容，因为分享朋友圈默认会把desc隐藏，因此与分享好友分开
 *  - args:
 *      - shareParams: 分享内容对象，title已经替换为desc，原来的title在otitle字段
 *  - return:
 *      - shareParams: 修改之后的分享内容对象
 * @onMQQShareBtnClick: function，在MQQ分享面板中点击了分享类型之后回调
 *  - args:
 *      - type: 用户点击的分享类型，0：QQ好友；1：QQ空间；2：微信好友；3：微信朋友圈
 *  - return: none
 * @onMQQShare: function，MQQ分享回调，注：IOS不支持回调，分享微信好友和朋友圈不支持回调
 *  - args: （注：4.6版本以下无参数）
 *      - result: MQQ分享结果
 *          - retCode: 0：用户点击发送，完成整个分享流程；1：用户点击取消，中断分享流程
 *      - type: 用户点击的分享类型，0：QQ好友；1：QQ空间；2：微信好友；3：微信朋友圈
 *  - return: none
 *
 * @beforeWeiXinShareToFriend: function，在微信分享好友之前调用，可以修改分享内容
 *  - args:
 *      - shareParams: 分享内容对象
 *  - return:
 *      - shareParams: 修改之后的分享内容对象
 * @beforeWeiXinShareTimeline: function，在微信分享朋友圈之前调用，可以修改分享内容，因为分享朋友圈默认会把desc隐藏，因此与分享好友分开
 *  - args:
 *      - shareParams: 分享内容对象，title已经替换为desc，原来的title在otitle字段
 *  - return:
 *      - shareParams: 修改之后的分享内容对象
 * @onShareWeiXinFriend: function，微信分享好友回调
 *  - args:
 *      - res: 分享结果
 *          - err_msg: send_app_msg:cancel 用户取消
 *                     send_app_msg:ok 分享成功
 *                     fail: 分享失败
 *  - return: none
 * @onShareWeiXinTimeline: function，微信分享朋友圈回调
 *  - args:
 *      - res: 分享结果
 *          - err_msg: share_timeline:cancel 用户取消，注：检测用户取消动作只有IOS支持
 *                     share_timeline:ok 分享成功
 *                     fail: 分享失败
 *  - return: none
 *
 * share.init({
 *      flag: share.FLAG_MQQ+share.FLAG_WEIXIN
 * });
 *
 * MQQ分享消息
 * @opts: 同init参数
 * @type: 分享类型，0：QQ好友；1：QQ空间；2：微信好友；3：微信朋友圈
 * @cb: 4.7.2版本以下不支持此分享，这时会调用cb
 * share.MQQShareMessage(opts, type, cb);
 *
 * 展示MQQ分享面板
 * @opts: 同init参数
 *  -onMQQShowShareMenu: function，面板展示之后回调
 * @cb: 5.2版本以下不支持此分享，这时会调用cb
 * share.MQQShowShareMenu(opts, cb);
 *
 * 微信分享好友
 * @opts: 同init参数
 * share.WeiXinShareToFriend(opts);
 *
 * 微信分享朋友圈
 * @opts: 同init参数
 * share.WeiXinShareToTimeline(opts);
 *
 * 静态扩展，永久可用：
 * 1. 在OP内添加分享组件的初始化代码，key为位数值，从低到高，如1，2，4，8，value为function(opts)
 * 2. 在share内添加flag常量供用户使用
 *
 * 动态扩展，页面内可用，同静态扩展，只是用程序来实现上面两个步骤
 * 1. share.OP[4] = function(opts) { ... };
 * 2. share.FLAG_XXX = 4;
 */
const MAP = { name: 'title', description: 'desc', image: 'image' };
const defaultOpt = function() {
  return {
    title: '腾讯企鹅辅导',
    desc: '我在腾讯企鹅辅导发现..',
    url: window.location.href,
    image: 'https://9.url.cn/fudao/assets/images/favicon_d7caf9a.ico',
  };
};

// function isWindow(obj)     { return obj != null && obj == obj.window; }
// function isObject(obj)     { return type(obj) == "object"; }

// function isPlainObject(obj) {
//     return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype;
// }

function extend(target, source) {
  for (const key in source) {
    if (source[key] !== undefined) { target[key] = source[key]; }
  }
}

// Copy all but undefined properties from one or more
// objects to the `target` object.
function ext(target) {
  let deep;
  const args = Array.prototype.slice.call(arguments, 1);
  if (typeof target === 'boolean') {
    deep = target;
    target = args.shift();
  }
  args.forEach((arg) => {
    extend(target, arg);
  });
  return target;
}

const T = {
  isValidMQQ(mqq) {
    return mqq && parseInt(mqq.QQVersion) != 0;
  },
};

var OP = {
  getMQQParams(o) {
    // 手Q 5.4版本终端的严重BUG，要把公众号id置空，不然用户点击公众号标签app就会崩溃
    return {
      oaUin: '',
      title: o.title,
      desc: o.desc,
      share_url: o.url,
      image_url: o.image,
      puin: '',
      appid: o.qqAppid,
    };
  },
  getWeiXinParams(o) {
    return {
      img_url: o.image,
      link: o.url,
      desc: o.desc,
      title: o.title,
      appid: o.wxAppid,
    };
  },
  WeiXinShareToFriend(opts) {
    if (
      typeof window.WeixinJSBridge === 'object'
      && typeof window.WeixinJSBridge.invoke === 'function'
    ) {
      let shareParams = this.getWeiXinParams(ext({}, defaultOpt(), opts));
      opts.beforeWeiXinShareToFriend && (shareParams = opts.beforeWeiXinShareToFriend(shareParams));
      window.WeixinJSBridge.invoke('sendAppMessage', shareParams, (res) => {
        opts.onShareWeiXinFriend && opts.onShareWeiXinFriend(res);
      });
    }
  },
  WeiXinShareToTimeline(opts) {
    if (
      typeof window.WeixinJSBridge === 'object'
      && typeof window.WeixinJSBridge.invoke === 'function'
    ) {
      let shareParams = this.getWeiXinParams(ext({}, defaultOpt(), opts));
      // 朋友圈默认不显示desc，需要fix
      shareParams.otitle = shareParams.title;
      shareParams.title = shareParams.desc;
      opts.beforeWeiXinShareTimeline && (shareParams = opts.beforeWeiXinShareTimeline(shareParams));
      window.WeixinJSBridge.invoke('shareTimeline', shareParams, (res) => {
        opts.onShareWeiXinTimeline && opts.onShareWeiXinTimeline(res);
      });
    }
  },
  WeiXinShareToQQ(opts) {
    if (
      typeof window.WeixinJSBridge === 'object'
      && typeof window.WeixinJSBridge.invoke === 'function'
    ) {
      const shareParams = this.getWeiXinParams(ext({}, defaultOpt(), opts));

      window.WeixinJSBridge.invoke('shareQQ', shareParams, (res) => {
        opts.onShareWeiXinTimeline && opts.onShareWeiXinTimeline(res);
      });
    }
  },
  initHelperForWeiXin(initFun) {
    const that = this;
    if (
      typeof window.WeixinJSBridge === 'object'
      && typeof window.WeixinJSBridge.invoke === 'function'
    ) {
      initFun();
    } else if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', initFun, false);
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', initFun);
      document.attachEvent('onWeixinJSBridgeReady', initFun);
    }
  },
  1(opts) {
    // MQQ分享初始化
    const that = this;
    if (T.isValidMQQ(window.mqq) && mqq.ui) {
      const o = ext({}, defaultOpt(), opts);
      if (mqq.compare('4.7.2') !== -1) {
        var shareParams = that.getMQQParams(o);
        o.beforeMQQShare && (shareParams = o.beforeMQQShare(shareParams));
        // fix 微信朋友圈
        let shareParams2 = ext({}, shareParams);
        shareParams2.otitle = shareParams2.title;
        shareParams2.title = shareParams2.desc;
        o.beforeMQQShareTimeline && (shareParams2 = o.beforeMQQShareTimeline(shareParams2));
        mqq.ui.setOnShareHandler((type) => {
          // type: 0：QQ好友；1：QQ空间；2：微信好友；3：微信朋友圈。默认为 0
          o.onMQQShareBtnClick && o.onMQQShareBtnClick(type);
          mqq.ui.shareMessage(
            ext({}, type == 3 ? shareParams2 : shareParams, {
              share_type: type,
            }),
            (result) => {
              // result.retCode: 0: 完成 1: 取消
              o.onMQQShare && o.onMQQShare(result, type);
            }
          );
        });
      } else if (mqq.compare('4.6') !== -1) {
        var shareParams = that.getMQQParams(o);
        o.beforeMQQShare && (shareParams = o.beforeMQQShare(shareParams));
        mqq.data
          && mqq.data.setShareInfo(shareParams, () => {
            o.onMQQShare && o.onMQQShare(); // IOS不支持此回调
          });
      } else {
        // 用户版本太低，我没办法了...
      }
    }
  },
  2(opts) {
    // 微信分享初始化分享
    const that = this;

    OP.initHelperForWeiXin.call(this, () => {
      window.WeixinJSBridge
        && window.WeixinJSBridge.on('menu:share:appmessage', () => {
          that.WeiXinShareToFriend.call(that, opts);
        });
      window.WeixinJSBridge
        && window.WeixinJSBridge.on('menu:share:timeline', () => {
          that.WeiXinShareToTimeline.call(that, opts);
        });
      window.WeixinJSBridge
        && window.WeixinJSBridge.on('menu:share:qq', () => {
          that.WeiXinShareToQQ.call(that, opts);
        });
    });
  },
  //     //新增分享类型时，可以在下面添加初始化方法，标号按顺序用位标号，下一位是4
  //     4: function(opts) {     //隐藏微信分享入口
  // //        new Image().src = '/weixinnoshare';
  //         OP.initHelperForWeiXin.call(this, function(){
  //             window.WeixinJSBridge && WeixinJSBridge.invoke('hideOptionMenu');
  //         });
  //     }
};

var share = {
  FLAG_MQQ: 1,
  FLAG_WEIXIN: 2,
  FLAG_WEIXIN_NOSHARE: 4,
  // 新增分享类型时，可以在下面标号，标号按顺序用位标号，下一位是4
  initDefaultOpt() {
    const itemprops = document.querySelectorAll('meta[itemprop]');
    let item;
    let key;
    let value;

    for (let i = 0, len = itemprops.length; i < len; ++i) {
      item = itemprops[i];
      key = item.getAttribute('itemprop');
      value = item.getAttribute('content');
      MAP[key] && (defaultOpt()[MAP[key]] = value);
    }
  },
  init(opts) {
    // 幂等函数
    if (!this.__init__) { this.initDefaultOpt(); }
    // this.opts = ext({flag:share.FLAG_MQQ+share.FLAG_WEIXIN}, opts);

    this.opts = opts;
    !this.opts.flag && (this.opts.flag = share.FLAG_MQQ + share.FLAG_WEIXIN);
    let i = this.FLAG_MQQ;
    while (OP[i]) {
      if (this.opts.flag & i) {
        OP[i](this.opts);
      }
      i <<= 1;
    }
    this.__init__ = true;
    return this;
  },
  MQQShareMessage(o, type, cb) {
    if (!this.__init__) { return; }
    if (T.isValidMQQ(window.mqq)) {
      if (mqq.compare('4.7.2') !== -1) {
        let shareParams = this.OP.getMQQParams(o);
        o.beforeMQQShare && (shareParams = o.beforeMQQShare(shareParams));
        // fix 微信朋友圈
        const shareParams2 = ext({}, shareParams);
        shareParams2.title = shareParams2.desc;
        mqq.ui.shareMessage(
          ext(type == 3 ? shareParams2 : shareParams, { share_type: type }),
          (result) => {
            // result.retCode: 0: 完成 1: 取消
            o.onMQQShare && o.onMQQShare(result, type);
          }
        );
      } else {
        cb && cb();
      }
    }
  },
  MQQShowShareMenu(o, cb) {
    if (T.isValidMQQ(window.mqq)) {
      if (mqq.compare('5.2') !== -1) {
        mqq.ui.showShareMenu();
        o && o.onMQQShowShareMenu && o.onMQQShowShareMenu();
      } else {
        cb && cb();
      }
    }
  },
  // WeiXinShowOptionMenu: function() {
  //     if (typeof window.WeixinJSBridge == "object" && typeof window.WeixinJSBridge.invoke == "function") {
  //         WeixinJSBridge.invoke("showOptionMenu");
  //     }
  // },
  WeiXinShareToFriend(opts) {
    this.OP.WeiXinShareToFriend(opts);
  },
  WeiXinShareToTimeline(opts) {
    this.OP.WeiXinShareToTimeline(opts);
  },
};
// 应该把OP附到share中，让用户可修改任何东西
share.OP = OP;

export default share;
