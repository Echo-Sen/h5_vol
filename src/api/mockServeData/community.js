export default {
  getCommunityData: () => {
    // 社区数据：头像 昵称 图片 文字 点赞数 评论数
    return {
      success: true,
      status: 1,
      message: "成功",
      data:
        [
          {
            id: 1,
            // 评论
            comNum: 500,
            // 点赞
            upNum:1000,
            avatar: "https://olrando.oss-cn-chengdu.aliyuncs.com/img/-3b46af98175bfce3.jpg",
            name: "倚楼听风雨",
            msg: "人工智能学院“小红帽”常青藤青年志愿者服务队云平台正在加急开发中",
            img: "https://picsum.photos/500/300"
          },
          {
            id: 2,
            // 评论
            comNum: 500,
            // 点赞
            upNum:1000,
            avatar: "https://olrando.oss-cn-chengdu.aliyuncs.com/img/-3b46af98175bfce3.jpg",
            name: "倚楼听风雨",
            msg: "人工智能学院“小红帽”常青藤青年志愿者服务队云平台正在加急开发中！！！",
            img: "https://picsum.photos/500/300"
          }
        ]
    }
  }
}