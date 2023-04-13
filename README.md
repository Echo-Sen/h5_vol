# volproject

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

```
开发日志
```

# 引入 vant

# 引入 vue-router@3

# 引入适配 npm install postcss-px-to-viewport --save-dev

# 引入 axios

# 引入 mockjs

## 总结

```
这里是对于下拉刷新回调函数的处理，主要解决的问题是新获取的数据会含有原有的数据，导致渲染有重复id，这里使用map来合并新旧数据
getCommunityData(this.getTime(), 10)
        .then((res) => {
          for (const item of res.data.data) {
            map.set(item.id, item)
          }
          for (const item of this.data) {
            if (!map.has(item.id)) {
              map.set(item.id, item)
            }
          }
          const mergeArray = [...map.values()]
          this.data = mergeArray
          localStorage.setItem('communityData', JSON.stringify(mergeArray))
        })
        .then(() => {
          this.isLoading = false
        })
```

```
//元素居中 给父盒子
display:flex;
justify-content:center;
align-items: center;
```

```
//解决icon和文字放一起的时候文字下掉，在大盒子定义style图标分别用i和span标签包裹即可
<button style="display: flex; align-items: center;" class="like">
          <van-icon name="like-o" size="25px" />
          <span>{{ `点赞(${item.likes})` }}</span>

        </button>
```

```
//为渲染的数据动态绑定当前点赞
 :class="{ 'current': item.id === isCurrent }">
```

```
//在Main.js中设置如下可切换页面置顶
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});
```

## 拿到渲染的元素

```
//首先，在模板中渲染元素时，给需要访问的元素绑定一个唯一的id值
<template>
  <div>
    <div v-for="item in items" :key="item.id" :ref="'myDiv'+item.id">{{ item.content }}</div>
  </div>
</template>
//然后，在 Vue 实例中可以通过 this.$refs 访问到该元素
export default {
  mounted() {
    const myDiv = this.$refs['myDiv'+id]; // id 表示需要获取的元素的唯一标识符
    myDiv.style.color = 'red';
  }
}
```

```
// 进入页面为已点赞的加上class，this.$nextTick()确保dom加载完成
 this.$nextTick(() => {
      // 个人对帖子的点赞情况
      this.data.find((item) => {
        const likeIcon = this.$refs['likeDiv' + item.id][0].children[0]
        postIsLike(item.id).then((res) => {
          if (res.data.islike) {
            likeIcon.classList.add('liked')
          }
        })
      })
    })
// 点赞
    async clickLikes(id) {
      // 获取icon
      const likeIcon = this.$refs['likeDiv' + id][0].children[0]
      if (likeIcon.classList.contains('liked')) {
        likeIcon.classList.remove('liked')
        this.data.find((item) => {
          if (item.id === id) {
            item.likes -= 1
            postLiked(id)
          }
        })
      } else {
        likeIcon.classList.add('liked')
        //更改id对应的likes
        this.data.find((item) => {
          if (item.id === id) {
            item.likes += 1
            postLiked(id).then((likeRes) => {
              // 点赞回调
              console.log(likeRes)
            })
          }
        })
      }
    },
```

## 将请求头加入到 axios 的封装中

## 为下拉刷新 增加节流阀
