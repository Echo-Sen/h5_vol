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
# 引入适配npm install postcss-px-to-viewport --save-dev
# 引入axios
# 引入mockjs
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