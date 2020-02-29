# travel-vue(旅游网页单页 Vue 项目)
> 以下主要是我对项目开发中整体流程与细节的记录

# 效果
- Home页
   ![](https://ftp.bmp.ovh/imgs/2020/02/f5d083f03b9ca3fd.gif)
- City页
   ![](https://ftp.bmp.ovh/imgs/2020/02/67d9ab39043918aa.gif)
- Detail页
   ![](https://ftp.bmp.ovh/imgs/2020/02/bcca2c62c542e246.gif)
# 开发
1. 克隆项目到本地
   ```sh
   git clone https://github.com/heavenly-zy/travel-vue
   ```
2. 安装依赖
   ```sh
   yarn install
   ```
3. 开启本地服务器
   ```
   yarn serve
   ```
4. 编译打包
   ```
   yarn build
   ```

# 项目涉及到技术栈
- [x]  Vue：Vue、axios、Vue-router、Vuex、Vue-cli@4、
- [x] 插件：vue-awesome-swiper、better-scroll、axios
- [x] CSS的预处理框架：stylus
- [x] api：模拟mock数据

# 项目相关 npm 依赖包
- fastClick: 用来处理移动端 click 事件 300毫秒延迟
- stylus: CSS 预处理框架
- stylus-loader
- vue-awesome-swiper: vue的轮播插件
- axios: 实现 ajax 请求数据
- better-scroll: 页面滚动插件

# 项目具体结构
## 首页部分
- iconfont 的引入和使用
- 图片轮播组件的使用
- 图标区域轮播组件的使用
- axios获取接口数据
- 组件间数据传递

## 城市选择页部分
- 字母表布局
- better-scroll 的使用
- 函数节流实现列表性能优化
- 搜索逻辑实现
- Vuex 实现数据共享
- LocalStorage 实现页面数据存储
- keep-alive 优化路由性能

## 详情页部分
- banner 布局
- 动态路由配置
- 公用画廊组件拆分
- 实现 fixed header 渐隐渐显效果
- 递归组件实现详情列表
- transition slot 插槽实现 animation 简单动画效果

# 一、环境搭建

1. 安装vue-cli
   ```sh
   yarn global add @vue/cli
   ```
2. 创建项目
   ```
   vue create travel-vue
   ```
   接下来是一系列配置项的选择
   ```
   ? Check the features needed for your project: (Press <space> to select, <a> to toggle all, <i> to invert selection)
   >(*) Babel //转码器，可以将ES6代码转为ES5代码，从而在现有环境执行。 
    ( ) TypeScript// TypeScript是一个JavaScript（后缀.js）的超集（后缀.ts）包含并扩展了 JavaScript 的语法，需要被编译输出为 JavaScript在浏览器运行，目前较少人再用
    ( ) Progressive Web App (PWA) Support// 渐进式Web应用程序
    (*) Router // vue-router（vue路由）
    (*) Vuex // vuex（vue的状态管理模式）
    ( ) CSS Pre-processors // CSS 预处理器（如：less、sass）
    (*) Linter / Formatter // 代码风格检查和格式化（如：ESlint）
    ( ) Unit Testing // 单元测试（unit tests）
    ( ) E2E Testing // e2e（end to end） 测试
   ```
   最终项目搭建成功，初始结构如下
   ![项目结构](https://ftp.bmp.ovh/imgs/2020/02/59a2eb1fabc74c0c.png)
   [浅谈vue中index.html、main.js、App.vue、index.js之前的关系以及加载过程](https://blog.csdn.net/qq_34182808/article/details/86690193)

# 二、项目初始化

1. 因为是移动端的项目，所以首先需要在`index.html`中添加一个meta:vp

2. `main.js`文件中导入准备好的`reset.css`和`border.css`
   ```js
   import './assets/styles/reset.css'; // 重置默认样式
   import './assets/styles/border.css'; // 解决移动端的“1px边框问题”
   ```
   > border.css的使用方法：加上对应的类名即可，如我想添加一个下边框，就在对应的元素上加上 class="border-bottom"

3. 由于部分移动端设备存在“click事件300ms延迟执行”的问题，需要安装 [fastclick](https://github.com/ftlabs/fastclick)
   ```
   yarn add fastclick --save
   // --save 表示将保存配置信息到 pacjage.json 的 dependencies 节点中
   ```
   使用方法：
   ```js
   // main.js
   import fastClick from 'fastclick'
   ...
   fastClick.attach(document.body)
   ```
4. 安装`Stylus`和`stylus-loader`
   ```sh
   yarn add stylus --save
   yarn add stylus-loader --save
   ```

# 三、项目开发
## 首页导航栏
问题记录：
1. Vue开发中ESLint(代码格式规范检查工具)和外部引用的`iconfont.js`文件冲突
   解决方法：
   新建`.eslintignore`文件，在其中添加要忽略第三方加载的文件的路径
   ```
   // .eslintignore
   src/assets
   public
   dist
   ```
   然后重启服务即可

2. 设置URL路径转换规则时，发现没有`build`文件夹（里面是一些webpack的配置文件）

   搜索后得知，以前旧版本的脚手架工具搭建的项目才有`build`文件夹，现在vue-cli@3版本以上都移除了`build`文件夹，如果要配置 webpack，只需要在项目根目录下创建一个`vue.config.js`文件，然后在里面进行需要的配置即可。

   首先需安装 path 模块
   ```sh
   yarn add path --save
   ```
   然后在`vue.config.js`中进行配置
   ```js
   // vue.config.js
   const path = require('path')
   function resolve (dir) {
     return path.join(__dirname, dir)
   }

   module.exports = {
     chainWebpack: config => {
       config.resolve.alias
         .set('@', resolve('src'))
         .set('styles', resolve('src/assets/styles'))
         .set('imgs', resolve('src/assets/imgs'))
     }
   }
   ```
   重启服务后即可使用简化后的路径
   ```js
   import Home from '@/pages/home/Home.vue'; // `@`符号代表src目录
   @import '~@/assets/styles/varibles.styl'; // CSS中使用@import记得要在'@'前面加一个'~'
   ```
   参考文章 [vue.config.js配置别名alias、配置生产环境清除console](https://www.cnblogs.com/skylineStar/p/10282347.html)

   > URL转换规则：
   >  - URL是绝对路径，如`/images/foo.png`，会被保留不变。
   >  - URL以`.`开始，会被认为是相对模块请求，根据文档结构(folder structure)转换。
   >  - URL以`~`开始，会被认为是模块请求，意味着可以在`node modules`里引用资源
   > - URL以`@`开始，会被认为是模块请求

3. eslint 配置问题
   在写代码过程中，按下格式化代码总是出现红线，然后各种报错。研究之后发现这是由于我创建项目时安装了 eslint，eslint 的代码风格检测和 vuter 格式化代码冲突（比如单引号和双引号的问题）。

   解决办法是要么关闭 eslint ，要么修改 eslint 的语法检测规则。

   这里我试着改一改语法检测规则

   > "off"或者0    // 关闭规则
   "warn"或者1    // 在打开的规则作为警告（不影响退出代码）
   "error"或者2    // 把规则作为一个错误（退出代码触发时为1）

   ```
   // package.json
   "rules": {
      "quotes": [0, "double"], // 双引号
      "semi": [0, "always"], // 语句强制分号结尾
      "space-before-function-paren": [0, "always"], //函数定义时括号前面要不要有空格
   }
   ```
   详细配置见文章 [vue-cli3的eslint配置问题](https://www.jianshu.com/p/bfc7e7329cff)

## 首页轮播图
1. 首先创建一个`index-swiper`分支，运行以下命令
   ```sh
   git branch index-swiper // 新建 index-swiper 分支
   git checkout index-swiper // 切换到这个分支
   git push origin index-swiper:index-swiper // 将本地分支推送到远程分支
   git status // 查看当前所在分支
   ```
2. 引入 [vue-awesome-swiper](https://github.com/surmon-china/vue-awesome-swiper) 插件
安装
   ```sh
   yarn add vue-awesome-swiper --save
   ```
   使用方法（在 main.js 中全局挂载）
   ```js
   // main.js
   import Vue from 'vue'
   import VueAwesomeSwiper from 'vue-awesome-swiper'
   import 'swiper/dist/css/swiper.css'

   Vue.use(VueAwesomeSwiper, /* { default global options } */)
   ```
3. vue 轮播插件的使用细节点
   - 轮播分页、自动播放、循环播放
      ```js
      data() {
        return {
          swiperOption: {
            loop: true, // 开启循环
            autoplay: { // 自动播放
              delay: 3000,
              disableOnInteraction: false // 不禁用自动播放，每次互动后重新启动
            },
            pagination: { // 分页配置
              el: ".swiper-pagination"
            }
        }
      }
      ```

   - 给轮播最外层加一个`wrapper`占位，以防图片资源未加载完成时影响布局样式
     ```styl
     .wrapper
       overflow hidden
       background #ddd
       width 100%
       height 0
       padding-bottom 30.47%
       .swiper-img
         width 100%
     /*这里也可以换一种方式，比如使用单位vw/vh*/ 
     ```
   - 样式穿透
     当引用了第三方组件，需要在组件中局部修改第三方组件的样式，而又 
     不想去除 scoped 属性造成组件之间的样式污染。此时只能通过特殊的 
     方式，穿透 scoped。
     ```styl
     <style lang="stylus" scoped>
     .wrapper >>> .swiper-pagination-bullet-active // 样式穿透
       background #fff !important
     </style> 
     ```
     参考文章 [Vue中的scoped及穿透方法](https://www.cnblogs.com/karthuslorin/p/9038854.html)
4. 发布分支
```
git push origin index-swiper:index-swiper
git checkout master
git merge origin/index-swiper // 将index-swiper合并到主分支
git push // 最后再把合并好的主分支推到线上
```

问题记录：

> vue 中通过定义的数组循环将 img 的 src 引入图片却不显示图片的问题

```vue
<template>
      <swiper-slide v-for="item of swiperList" :key="item.id">
        <img class="swiper-img" :src="item.imgAddr" />
      </swiper-slide>
</template>

<script>
export default {
  name: "HomeSwiper",
  data() {
    return {
      swiperList: [
        {
          id: "01",
          imgAddr: "imgs/1.jpg"
        },
        {
          id: "02",
          imgAddr: "imgs/2.jpg"
        },
        {
          id: "03",
          imgAddr: require("imgs/3.jpg")
        },
        {
          id: "04",
          imgAddr: "imgs/4.jpg"
        }
      ]
    };
  }
};
</script>
```
>分析：webpack 把 img 当做一种资源，所以使用时要先引进。引进方式有两种，一种是 import ，一种是 require。require 是一个 commonJS 规范的关键字，当我们在写 node 代码的时候，都是由 require 去读取资源的。因为 webpack 同时支持 ES6 module 和 commonJS 规范。import 是个语句，只能在 JS 代码顶部使用，而 require 则不一样，它是一个表达式，可以进行赋值操作。

使用相对路径引入的静态资源文件，会被 webpack 处理解析为模块依赖。
例如`url(./image.png)`会被被编译成`require('./image.png')`，
`<img src="../image.png">`
会被编译成`createElement('img', { attrs: { src: require('../image.png') }})`

因此这里我们使用`require`直接把URL变为编译后的结果即可
```js
swiperList: [
    {
        id: "01",
        imgAddr: require("imgs/1.jpg")
    },
    {
        id: "02",
        imgAddr: require("imgs/2.jpg")
    },
    {
        id: "03",
        imgAddr: require("imgs/3.jpg")
    },
    {
        id: "04",
        imgAddr: require("imgs/4.jpg")
    }
]
```
参考文章 [vue的 v-for 循环中图片加载路径问题](https://www.cnblogs.com/SamWeb/p/8519735.html)

## 图标区域
1. 创建`index-icon`分支
2. 对图标区域进行布局
3. 图标区域逻辑
   - 如何让图标区域能够滑动（在图标外层加轮播即可）
   - 根据数据项的不同，自动化构建页码，实现多页切换
```vue
<template>
  <div class="icons">
    <swiper>
      <swiper-slide v-for="(page,index) of pages" :key="index">
        <div class="icon" v-for="item of page" :key="item.id">
          <div class="img-wrapper">
            <img :src="item.imgAddr" />
          </div>
          <p>{{item.name}}</p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "HomeIcons"
  computed: {
    pages() {
      const pages = [];
      this.iconList.forEach((item, index) => {
        const page = Math.floor(index / 8); // 0,1
        if (!pages[page]) {
          pages[page] = [];
        }
        pages[page].push(item);
      });
      return pages;
    }
  }
};
</script>
```
解决一个 bug：
flex布局下文本溢出省略号不起作用
解决方法：父元素设置`overflow:hidden`或者`min-width:0`

## 通过AJAX动态获取数据
在前后端分离的开发模式中，后端给前端提供一个接口，由前端向后端发请求，得到数据后前端进行渲染。由于前后端开发进度的不统一，前端往往使用本地的测试数据进行数据渲染的测试。

1. 安装 axios
   ```sh
   yarn add axios --save
   ```

2. 模拟请求后端接口数据
    - 首先在`public`目录下创建`mock`文件夹，用来存放模拟数据的json文件

   > 注意：放在`public`目录下的静态资源可直接通过(http://localhost:8080/ + 文件名称)来访问，不需要在前面加一个`/public`路径（别问，问就是有被坑到）

   ![示例](https://ftp.bmp.ovh/imgs/2020/02/3d68b310a2d6f88c.png)

   - 然后在`vue.config.js`中设置 devServer.proxy 请求转发
      ```
      module.exports = {
       devServer: {
         proxy: {
           '/api': {
             target: 'http://localhost:8080',
             ws: true,
             changeOrigin: true,
             pathRewrite: {
               '^/api': '/mock'
             }
           }
         }
       }
      }
      ```
    - 在 Home.vue 中利用 axios 来请求模拟的数据
     为什么要在Home.vue中进行数据的请求呢？
     因为在所有子组件最外层的父组件 Home.vue 中请求数据便于我们一 
     次性拿到所有的数据，而不用进行多次请求。
      ```vue
      <script>
      import axios from "axios";
      export default {
        name: "Home",
        methods: {
          getHomeInfo() {
            axios.get("/api/index.json").then(this.getHomeInfoSuccss);
          },
          getHomeInfoSuccss(res) {
            console.log(res);
          }
        },
        mounted() {
          this.getHomeInfo();
        }
      };
      </script>
      ```
      参考文章：[Vue-Cli 3 devServer.proxy 请求代理配置](http://blog.starpoetry.cn/2018/12/04/Vue-proxy/)
      其他解决方案：[使用vue-cli3时怎么使用mock数据](https://www.jianshu.com/p/f6b36f3fa06a)

## 首页父子组件之间传值
首先在 Home.vue 中通过 axios 来获取数据，然后通过 v-bind 将数据动态地传递给各个子组件，子组件用 props 接收数据。
```vue
<template>
  <div>
    <home-header :city="city"></home-header>
    <home-swiper :list="swiperList"></home-swiper>
    <home-icons :list="iconList"></home-icons>
    <home-recommend :list="recommendList"></home-recommend>
    <home-weekend :list="weekendList"></home-weekend>
  </div>
</template>

<script>
export default {
  name: "Home"
  data() {
    return {
      city: "",
      swiperList: [],
      iconList: [],
      recommendList: [],
      weekendList: []
    };
  },
  methods: {
    getHomeInfo() {
      axios.get("/api/index.json").then(this.getHomeInfoSuccss);
    },
    getHomeInfoSuccss(response) {
      const res = response.data;
      const data = res.data;
      if (res.ret && res.data) {
        this.city = data.city;
        this.swiperList = data.swiperList;
        this.iconList = data.iconList;
        this.recommendList = data.recommendList;
        this.weekendList = data.weekendList;
      }
    }
  },
  mounted() {
    this.getHomeInfo();
  }
};
</script>
```
> 解决轮播组件的一个小bug：轮播不是从第一张图片开始循环播放
>
> 分析：由于我事先将`swiperList`定义为一个空数组，那么在 AJAX 还未获取到 json 里的 swiperList 数据时，轮播组件实际上遍历的是空数组。获取到数据之后，这时已经将之前的空数组循环播放了几次。
>
> 解决：加一个条件渲染(v-if)，保证轮播组件获取到数据之后再渲染 swiper 即可
```vue
<template>
  <div class="wrapper">
    <swiper :options="swiperOption" v-if="showSwiper">
     ...
    </swiper>
  </div>
</template>

<script>
export default {
  name: "HomeSwiper",
  props: {
    list: Array
  },
  computed: {
    showSwiper() {
      return this.list.length;
    }
  }
};
</script>
```
## BetterScroll 的使用和字母表布局
城市列表布局
```styl
.list
  overflow hidden
  position absolute
  top 1.75rem /* 向上隔出一个header的高度 */ 
  left 0
  right 0
  bottom 0
```
1. 安装 better-scroll
```
yarn add better-scroll --save
```
2. 使用
```vue
<template>
  <div class="list" ref="wrapper"> <!-- 用 ref 获取到这个 DOM 节点 -->
    <div> <!-- wrapper与内容之间需加一层div -->
    ...
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "CityList",
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper);
  }
};
</script>
```
## 兄弟组件数据传递

> 需求：我们希望通过点击或滑动 City 组件中右侧的字母表，让左侧城市列表自动跳转到对应字母的区域

![](https://ftp.bmp.ovh/imgs/2020/02/4574fedf73ad28f2.png)

这里我使用 bus 来让 Alphabet 组件和 List 组件进行通信（当然也可以让 Alphabet 组件把数据传递给 City 组件，再由 City 组件传递给 List 组件）

实现思路：

点击跳转很好实现，只需获取到当前点击元素(`e.target`)的字母，然后将其通过 bus 上的`$emit`发送给兄弟组件，兄弟组件通过`$on`接收数据，接收数据后通过插件 better-scroll 即可实现对应跳转
```js
// Alphabet.vue
this.bus.$emit("change", e.target.innerText);

// List.vue
this.bus.$on("change", letter => {
  const element = this.$refs[letter][0];
  this.scroll.scrollToElement(element);
});
```

滑动跳转稍微复杂一点

![](https://ftp.bmp.ovh/imgs/2020/02/50e5dc95740b95d0.png)

用上图中的`touchY`减去`startY`，再除以单个字母的高度(`offsetHeight`)，就得到当前手指滑的字母下标`index`，然后将下标转换为对应的字母，同样也用`$emit`发送给兄弟组件。

具体实现代码如下：
1. main.js
```js
Vue.prototype.bus = new Vue();
```
2. Alphabet.vue
```vue
<template>
  <ul class="list">
    <li
      class="item"
      v-for="item of letters"
      :key="item"
      :ref="item"
      @click="letterClick"
      @touchstart="touchStart"
      @touchmove="touchMove"
      @touchend="touchEnd"
    >{{item}}</li>
  </ul>
</template>

<script>
export default {
  name: "CityAlphabet",
  props: {
    cities: Object
  },
  data() {
    return {
      touchStatus: false
    };
  },
  computed: {
    letters() {
      const letters = Object.keys(this.cities);
      return letters; // ['A','B','C',...]
    }
  },
  methods: {
    letterClick(e) {
      this.bus.$emit("change", e.target.innerText);
    },
    touchStart() {
      this.touchStatus = true;
    },
    touchMove(e) {
      if (this.touchStatus) {
        const startY = this.$refs.A[0].getBoundingClientRect().top; // 'A' 距离屏幕顶部的距离
        const touchY = e.touches[0].clientY; // 滑动元素距离屏幕顶部的距离
        const index = Math.floor(
          (touchY - startY) / this.$refs.A[0].offsetHeight
        ); 
        if (index >= 0 && index < this.letters.length) { // 控制 index === 0~21
          this.bus.$emit("change", this.letters[index]);
        }
      }
    },
    touchEnd() {
      this.touchStatus = false;
    }
  }
};
</script>

```
3. List.vue
```vue
<template>
  <div class="list" ref="wrapper">
    <div>
       ...
      <section v-for="(item,key) of cities" :key="key" :ref="key">
       ...
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "CityList",
  props: {
    cities: Object,
    hotCities: Array
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper);
    this.bus.$on("change", letter => {
      const element = this.$refs[letter][0];
      this.scroll.scrollToElement(element);
    });
  }
};
</script>
```
## 列表切换性能优化
1. 上面代码中`startY`的值始终为固定值，放在`methods`里每次页面刷新 
    都要执行一次`touchMove()`方法，每次都会对`startY`的值进行一次运 
    算，因此这样就导致性能比较低。针对这一点需要进行优化，优化方法 
    就是将`startY`放在`updated`钩子中。
   ```js
   updated() {
     this.startY = this.$refs.A[0].getBoundingClientRect().top; 
   }
   ```
   分析：data变化（ajax请求到数据，cities从空对象变为非空）时，会请 
   求`updated`这个钩子，此时组件 DOM 已经更新，现在可以执行依赖于 
   DOM 的操作。当然这里使用计算属性来优化也是可以的。

2. 用函数节流优化`touchMove()`执行频率过高
   > 函数节流原理：如果某一个函数在一定时间内连续执行了很多次，把 
      前面的都忽略掉，我们以最后一次为准，也就是当你停下来的时候在 
      一段时间后才会去执行，当你连续操作的时候就去不断的清除原来的 
      计时器，新建新的计时器，然后去重新计时到指定时间才执行。

    函数节流即限制一个函数在一定时间内只能执行一次。在这里就是限制 
    `touchMove()`函数的执行频率，让它每16ms执行一次，不至于太过频 
    繁地执行。
    ```
    data() {
      return {
        timer: null
      };
    }
    ...
    touchMove(e) {
      if (this.touchStatus) {
        if (this.timer) clearTimeout(this.timer); // 函数节流
          this.timer = setTimeout(() => {
            const touchY = e.touches[0].clientY; 
            const index = Math.floor(
                (touchY - this.startY) / this.$refs.A[0].offsetHeight
            );
            if (index >= 0 && index < this.letters.length) {
                this.bus.$emit("change", this.letters[index]);
            }
          }, 16);
      }
   }
   ```
   相关文章：[函数节流](https://segmentfault.com/a/1190000019577510)

## 搜索框逻辑实现

主要逻辑如下
```vue
<template>
  <div>
    <div class="search">
      <input type="text" placeholder="输入城市或拼音" v-model="keyword" />
    </div>
    <ul class="search-content">
      <li v-for="item of list" :key="item.id">{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CitySearch",
  data() {
    return {
      keyword: "",
      list: []
    };
  },
  watch: {
    keyword() { // 监听搜索框内的文字变化
      const result = []; // !!这个声明非常重要，每次keyword发生变化都会重置result为空
      for (const i in this.cities) {
        this.cities[i].forEach(value => {
          if (
            value.spell.indexOf(this.keyword) === 0 ||
            value.name.indexOf(this.keyword) === 0
          ) {
            result.push(value);
          }
        });
      }
      this.list = result;
    }
  }
};
</script>
```
## 项目中Vuex的使用
如何让 Home 组件和 City 组件通信（记住选择的城市名）？
可以使用事件总线 bus，但这里我们使用另外一种方式 vuex（数据共享）
### 安装方法
- 安装vuex
   ```sh
   yarn add vuex
   ```
- 创建 src/store/index.js
   ```
   import Vue from 'vue'
   import Vuex from 'vuex'

   Vue.use(Vuex) // 使用插件都要有这一步

   export default new Vuex.Store({
     state: {},
     mutations: {},
     actions: {},
     modules: {}
  })
  ```
- main.js中引入并注册store
   ```
   import store from './store'
   ...
   new Vue({
     router,
     store,
     render: h => h(App)
   }).$mount('#app')
   ```
   > 注意：如果使用vue-cli时勾选了vuex可以跳过以上步骤。

### 使用 vuex

vuex状态管理的流程

![vue实例(组件)==>actions==>mutations==>state==­>vue实例(组件)](https://ftp.bmp.ovh/imgs/2020/02/8c265e56d4c45f27.png)

具体代码如下：
store/index.js
```
export default new Vuex.Store({
  state: {
    city: '重庆'
  },
  actions: {
    changeCity(context, city) {
      context.commit('_changeCity', city)
    }
  },
  mutations: {
    _changeCity(state, city) {
      state.city = city
    }
  }
})
```
List.vue
```
<template>
  <section>
    <div class="button-list clearfix">
      <div @click="cityClick(item.name)"> <!-- 触发事件 -->
        <button>{{item.name}}</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "CityList"
  methods: {
    cityClick(city) {
      this.$store.dispatch("changeCity", city); // 向外“派发”一个"changeCity"，相当于$emit
    }
  }
};
</script>
```
当然这里也可以跳过`vue实例==>actions`这一步，直接`vue实例==>mutations`
```
// index.js
export default new Vuex.Store({
  state: {
    city: '重庆'
  },
  mutations: {
    changeCity(state, city) {
      state.city = city
    }
  }
})

// List.vue
export default {
  name: "CityList"
  methods: {
    cityClick(city) {
      this.$store.commit("changeCity", city);  // 使用commit直接到mutations
    }
  }
};
```
vuex使用的注意点：
- actions 提交的是 mutation，而不是直接变更状态
- actions **可以**包含异步操作，但是 mutation 只能包含同步操作

## [使用vue-router的编程式导航进行跳转](https://router.vuejs.org/zh/guide/essentials/navigation.html)

通常进行页面跳转的方法：
   - HTML的a标签和vue的<router-link>标签
   - JS的`window.location(href)`和vue的`router.push(location, onComplete?, onAbort?)`

|          声明式           |       编程式       |
| :-----------------------: | :----------------: |
| `<router-link :to="...">` | `router.push(...)` |

注意：在 Vue 实例内部，你可以通过`$router`访问路由实例。因此你可以调用`this.$router.push`

## 用 localstorage 解决 vuex 刷新数据消失问题

> 问题：vuex 的数据是存储在浏览器维护的内存中，页面刷新会重新初始化，简单的说，就是一刷新数据就重置了。

可以使用 localstorage 解决此问题
```
export default new Vuex.Store({
  state: {
    city: localStorage.getItem('city') || '重庆'
  },
  mutations: {
    changeCity(state, city) {
      state.city = city
      localStorage.setItem('city', city)
    }
  },
  modules: {
  }
})
```
## Vuex的高级使用（mapState 和 mapMutations）
### mapState 辅助函数
- 当映射的计算属性的名称与 state 的子节点名称不同时，需要给 mapState 传一个对象。
   ```js
   import { mapState } from "vuex";
   export default {
     name: "HomeHeader",
     computed: {
         ...mapState({
           currentCity: "city" // 映射计算属性 this.currentCity 为 store.state.city
         })
     }
   };
   // 模板中直接使用 {{currentCity}} 使用这个映射的计算属性
  ```
- 当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
   ```js
   import { mapState } from "vuex";
   export default {
     name: "HomeHeader",
     computed: {
       ...mapState(["city"]) // 映射计算属性 this.city 为 store.state.city
     }
   };
   // 模板中直接使用 {{city}} 使用这个映射的计算属性
  ```
  > 注意：`mapState`函数返回的是一个对象。而计算属性`computed`也是一个对象，直接把`mapState`放在`computed`中的话相当于对象嵌套对象（`computed`对象内部必须是函数），因此需要用对象展开运算符`...`将多个对象合并为一个，以使我们可以将最终对象传给`computed`属性。当然也可以直接使用`computed: mapState()`这种形式。

### 在组件中提交 Mutation
- 你可以在组件中使用`this.$store.commit('xxx')`提交`mutation`，或者使用`mapMutations`辅助函数将组件中的`methods`映射为`store.commit`调用（需要在根节点注入`store`）。
   ```
   import { mapMutations } from "vuex";

   export default {
     // ...
     methods: {
       ...mapMutations([
         'increment', // 将this.increment()映射为this.$store.commit('increment')

         // mapMutations也支持载荷：
         'incrementBy' // 将this.incrementBy(amount)映射为this.$store.commit('incrementBy', amount)
       ]),
       ...mapMutations({
         add: 'increment' // 将this.add()映射为this.$store.commit('increment')
       })
     }
   }
   ```
## 使用 keep-alive 优化网页性能
在 City 组件和 Home 组件来回跳转的过程中，每次路由切换到 city 页面或者 home 页面，都会导致其组件内部的`mounted`钩子被触发，从而导致重复的去请求相同的数据。
```
methods: {
  getCityInfo() {
    axios.get("/api/city.json").then(this.getCityInfoSuccess);
  },
  getCityInfoSuccess(response) {
    const res = response.data;
    const data = res.data;
    if (res.ret && res.data) {
      this.cities = data.cities;
      this.hotCities = data.hotCities;
    }
  }
},
mounted() { // 每次跳转页面导致实例重新被挂载，mounted在实例被挂载后调用
  this.getCityInfo();
}
```
![重复请求相同数据](https://b2.bmp.ovh/imgs/2020/02/9e5c0344e134a134.gif)

这实际上是非常耗费性能的，而我们希望数据只在开始的时候被请求一次，该如何优化呢？

使用vue提供给我们的一个`<keep-alive>`标签
```vue
// App.vue
<keep-alive>
  <router-view />
</keep-alive>
```
这里将App.vue中最顶层的出口`<router-view>`用`<keep-alive>`包裹起来，让整个应用都使用`<keep-alive>`的缓存机制：路由中的内容被加载一次后就被缓存起来，下一次再次进入该路由时不需要重新渲染该组件，直接读取缓存中的内容，也就不会重复请求了。

![只请求一次数据](https://ftp.bmp.ovh/imgs/2020/02/878c9465ea262e48.gif)

但是这样永远只在最开始请求一次也是不正确的，因为如果我们点击city中的城市列表，city 的值不同，理所应当发的请求也应该不同

那么如何做到回到首页时只要发现 city 不同就重新发一次请求呢？

利用`<keep-alive>`的缓存机制

> 分析：要做到这一点，理应满足2个条件，首先是回到首页应该执行一次函数调用，也就是触发一次钩子，这一点我们可以使用`<keep-alive>`的`activated`钩子来实现；另外一点就是如何判断city的不同。

解决：

1. 在请求上加一个查询参数（带上不同的查询参数方便渲染不同的数据）
```js
import { mapState } from "vuex";
...
computed: {
  ...mapState(["city"])
},
methods: {
  getHomeInfo() {
  axios
    .get(`/api/home.json?city=${this.city}`) // 查询参数形式为 ?='xxx'
    .then(this.getHomeInfoSuccss);
  },
}

```
2. 使用`<keep-alive>`的`activated`钩子

>当组件在`<keep-alive>`内被切换，它的`activated`和`deactivated`这两个生命周期钩子函数将会被对应执行。
`activated`：被 keep-alive 缓存的组件激活时调用。
`deactivated`：被 keep-alive 缓存的组件停用时调用。
```
data() {
  return {
    lastCity: ""
  };
},
mounted() {
  this.getHomeInfo();
  this.lastCity = this.city; // lastCity临时缓冲变量
},
activated() { // Home组件激活(回到home主页)时调用
  if (this.city !== this.lastCity) {
    this.getHomeInfo();
    this.lastCity = this.city;
  }
}
```
![city值不同才会发起请求](https://ftp.bmp.ovh/imgs/2020/02/b372119b9e5f2d1c.gif)

小结：通常情况下每次刷新（或重新进入）页面都会触发`mounted`钩子，`<keep-alive>`的作用实际上就是让`mounted`钩子只在最开始触发一次，后续都不再触发，将数据**缓存**起来了。而每次组件激活/停用都会触发它自己的`activated`和`deactivated`钩子。

## 动态路由的使用
```vue
// Recommend.vue
<router-link
  tag="li"
  v-for="item of list"
  :key="item.id"
  :to="`/detail/${item.id}`" // 跳转路径后带上参数
>
```
```
// router/index.js
const routes = [
  {
    path: '/detail/:id', // 动态路径参数以冒号开头
    name: 'Detail',
    component: Detail
  }
]
```
```js
// Detail.vue
methods: {
  getDetailInfo() {
    axios
      // 每个组件都可以通过this.$route.params.id拿到路由参数
      .get(`/api/detail.json?id=${this.$route.params.id}`)
      .then(this.getDetailInfoSuccss);
    }
}

// 或者以一个对象的形式拿到参数
.get("/api/detail.json", {
  params: {
    id: this.$route.params.id
  }
})
```

![进入detail页只发一次请求](https://ftp.bmp.ovh/imgs/2020/02/ab6dfedeffe2cdfa.gif)

我们希望点击不同的 recommendList 会发送不同的请求

方法一：用上面说过的`activated`钩子，将请求放在这个钩子内部
```
mounted() { // 只在最开始调用一次
  this.getDetailInfo();
  this.lastId = this.$route.params.id; // lastId临时缓冲变量
},
activated() { // 每次组件被激活就调用
  if (this.$route.params.id !== this.lastId) {
    this.getDetailInfo();
    this.lastId = this.$route.params.id
  }
}
// 本来只写一个activated钩子就足够了，但为了不重复发请求还是要多写一些代码
```

方法二：使用`<keep-alive>`的`exclude`属性，它表示任何名称匹配的组件都不会被缓存
```
<!-- 整个Detail组件(含子组件)不被缓存 -->
<keep-alive exclude="Detail">
  <router-view />
</keep-alive>
```
![点击不同的recommendList项会发不同的请求](https://ftp.bmp.ovh/imgs/2020/02/86cc6d85749c99e5.gif)

> 解决页面切换滚动的bug（home页滚动导致detail页滚动，detail页滚动导致home页滚动）

解决：使用 vue-router 提供一个`scrollBehavior`方法：

```
const router = new VueRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 } // 让页面切换时始终回到最顶部
  }
})
```
## 对全局事件解绑
```
methods: {
  handleScroll() {
    console.log('scroll'); // 退出页面后也会触发 scroll 事件并执行 handleScroll 函数
    ...
  }
},
activated() {
  window.addEventListener("scroll", this.handleScroll); // 绑定的全局事件
},
```
解决办法：利用被`<keep-alive>`包裹的组件停用时会触发`deactivated`钩子
```
deactivated() {
  window.removeEventListener("scroll", this.handleScroll);
}
```
## 使用递归组件实现详情页列表
递归组件：即组件内部使用组件本身
```vue
<template>
  <div class="list">
    <ul class="list-item" v-for="(item,index) of list" :key="index">
      <li class="border-bottom">
        <span class="icon"></span>
        <span>{{item.title}}</span>
      </li>
      <!-- 递归组件 -->
      <li class="children" v-if="item.children">
        <detail-list :list="item.children"></detail-list>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DetailList",
  props: {
    list: {
      type: Array
    }
  }
};
</script>
```
# 四、调试与发布
## 前后端联调
所谓接口就是可以通过服务端部署的机器提供出来的URL地址进行动态的数据交互。通常的工作流是后端跟前端协商定义数据接口格式（一般就是JSON格式）形成文档，后端实现接口，前端做静态的mock（可以是直接在页面的JS拼假数据或者通过JSON server按照真实调用服务的方式集成），后端实现服务接口，两边都完成后集成联调。

## 真机测试

在命令行终端使用命令查看IPv4 Address
```sh
$ ipconfig
```
例如我这里的地址是`192.168.43.158`，然后就可以在手机上访问`192.168.43.158:8080`来打开项目页面进行调试了。

经测试后发现有如下bug

1. 滑动字母表会导致整个列表页上下拖动

   > 分析：由于移动设备能够同时识别 touchstart 和 click 事件，因此当用户点击目标元素时，绑定在目标元素上的 touchstart 事件与 click 事件（约300ms后）会依次被触发，也就是说，我们所绑定的回调函数会被执行两次！

   在移动端，手指点击一个元素，会经过：touchstart --> touchmove -> touchend -->click

   解决办法：在`touchstart`事件上加一个`prevent`修饰符
   ```
   <li @touchstart.prevent="touchStart">{{item}}</li>
   ```
2. 移动端点击城市列表页时，`click`事件失效的问题
   用`v-for`遍历出的`li`中的`@click`事件在移动端无效。
   > 原因是：我们的项目中使用的 better-scroll 默认会阻止 touch 事件。所以在配置中需要加上 click: true
   ```
   mounted() {
     this.scroll = new BScroll(this.$refs.search, {
       mouseWheel: true,
         click: true,
         tap: true
     });
   }
   ```
## 打包上线
最简单的项目上线流程：
1. 在`vue.config.js`中设置正确的`publicPath`
   ```
   module.exports = {
     publicPath: process.env.NODE_ENV === 'production'
       ? '/travel-vue/' // 这里应该设置为和你的仓库名相同
       : '/'
   }
   ```
   文章 [vue cli 3.x 项目部署到 github pages](https://www.cnblogs.com/stevexu/p/10720106.html)


2. 执行打包命令
   ```
   $ yarn build
   ```
3. 最后将打包生成的`dist`目录放到后端项目的根目录中即可

# 五、补充
## 异步组件实现按需加载
文章：
[https://www.jianshu.com/p/83a3d18316a3](https://www.jianshu.com/p/83a3d18316a3)
[https://blog.csdn.net/purple_lumpy/article/details/85061624](https://blog.csdn.net/purple_lumpy/article/details/85061624)

## 为什么能够通过`this.$route.params.id`和`this.$store.state.xxx`分别拿到路由 id 和全局状态数据？

因为在`main.js`中我们将`router`和`store`作为选项参数传递给了Vue这个构造函数，因此每一个vue实例上都有`$route`和`$store`这两个方法，而每个组件也是vue实例，因此组件中也可以通过`this`拿到这两个属性
```
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
```
## 组件中 name 属性的三个用途
1. 递归组件会使用到它
2. `<keep-alive exclude="Detail">`
3. vue-devtools 中显示组件名

