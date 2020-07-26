### react+react-router-dom4+antd 后台管理系统

#### 第一天 初始化项目安装需要的插件

使用到的插件有 customize-cra react-app-rewired babel-plugin-import less less-loader@5 env-cmd -D

prettier.config.js 是配置vscode 中 插件 prettier 的文件

.env-cmdrc 是插件 env-cmd插件文件，可以配置一些参数 比如开发环境的 端口，注意 package.json 文件中的'script' 中的 配置

状态管理  yarn add redux react-redux redux-saga react-router-dom redux-saga-routines

react-redux 不支持ts,要下载另外一个包 yarn add -D @types/react-redux @types/redux-saga-routines

在redux-saga 有一个扩展saga的文件，暂时没有搞清楚

#### 第二天
配置saga的action--太复杂了

### 第三天
配置redux-thunk 
yarn add redux-thunk redux-logger

redux-logger 配合typescript 还需要安装一个插件
yarn add  @types/redux-logger