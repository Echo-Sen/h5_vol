import { getjsJDK } from "@/api/umbrella";
let data = {}  //data为后台返回值


wx.config({
  beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
  debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  appId: data.corpId, // 必填，企业微信的corpID
  timestamp: data.timestamp, // 必填，生成签名的时间戳
  nonceStr: data.noncestr, // 必填，生成签名的随机串
  signature: data.signature, // 必填，签名，见 附录-JS-SDK使用权限签名算法
  jsApiList: ["chooseImage", "invoke"] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
});
