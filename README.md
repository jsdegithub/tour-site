## 项目演示：[点击链接查看项目演示](https://tour.aeeternity.com/)（不要使用代理访问网站，否则会被拦截）

### 技术栈： React+Hook+Typescript+Antd+ReactRouter+Redux+React-redux+ReduxToolkit

### 部署方案：Docker+阿里云ECS+阿里云容器镜像服务+阿里云SSL单域名证书+nginx接口代理
编写Dockerfile制作镜像，推送到阿里云镜像仓库，再从ECS服务器拉取镜像；

使用nginx拦截api请求，将api请求转发到真实接口，网站支持https。


### 优化方案：
1、lazy+Suspense路由懒加载，大大减少了白屏时间（路由系统放在App.js中）；

2、TreeShaking去除引用库中没有使用的代码，减少了白屏时间和首屏加载时间；

3、CodeSplitting代码分割，减少了白屏时间和首屏加载时间；

4、全站图片懒加载，大大减少了各组件加载时间（使用了react-lazy-load-image-component）；

5、TinyPNG本地图片压缩，减少了首屏加载时间；

6、最大化压缩了index.js和App.js的体积，大大缩短了白屏时间；

7、React.memo+useMemo+useCallback子组件性能优化；

8、经测试，白屏时间:0.7s，TimeToInteractive:1.8s，DOMContentLoaded:3s，首屏完全加载时间8s；

9、服务器图片资源未经压缩，对首屏加载速度影响较大。

### 项目功能点和难点：
一、redux全局状态管理

1、引入了react-redux更方便地获取store state和dispatch，同时避免了在组件中订阅store；

2、使用工厂模式代替手动创建action，避免了如action.type类型拼写错误的低级失误；

3、引入redux-thunk，创建异步请求的action creator，将异步请求的实现逻辑从组件中剥离，转移到redux中，这样对于需要多次调用的异步请求节省了代码数量，也方便维护；

4、在i18n国际化模块中，为了保持reducer纯函数的特性，自定义了redux中间件，在reducer开始处理action前拦截action，根据action.type判断action类型，如果action.type==='changeLanguage'，
则调用i18n的changeLanguage API实现语言切换，避免了在reducer中引入副作用；

5、引入redux-toolkit，使用createAsyncThunk创建异步请求的action，配合extraReducers做异步请求状态处理，同时省去了action的创建和派发。


二、用户登录、登出、注册、jwt持久化存储以及私有路由的搭建

1、注册：dispatch的注册action返回成功状态后，调用history.push重定向到登陆页面；

2、登录：使用useSelector获取redux store中的jwt，使用useEffect监听jwt，如果jwt不为null，就调用history.push重定向到主页；登录action的派发由登录按钮的onClick事件触发；

3、登出：只需派发一个logout action将redux store中的jwt置为null；

4、jwt持久化存储：借助redux-persist，具体不详述；

5、私有路由的搭建：使用HOC高阶组件进行条件渲染。以购物车页面为例，私有路由需要判断jwt是否为空，如果为空，则重定向到登陆页面；如果不为空，则跳转到购物车页面。

三、其它业务逻辑不再赘述

...

...
