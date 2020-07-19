/**
 * 此文件是 create-react-app 官方推荐的一个库 customize-cra 的扩张文件
 * 实际上是扩展 webpack 的功能
 * 所以是基于 common 模块化的规范
 * 此项目是基于es模块化的规范
 *
 * yarn add customize-cra react-app-rewired
 *
 */

const { override, fixBabelImports, addLessLoader } = require('customize-cra')

module.exports = override(
	fixBabelImports('import', {
		libraryName: 'antd',
		libraryDirectory: 'es',
		// style 的选项 ‘css’ 表示引入 css ， ‘true' 表示引入 less
		style: true,
	}),
	// 这里是设置less
	// 同时是antd-design 的主题
	addLessLoader({
		javascriptEnabled: true,
		modifyVars: {
			'@primary-color': '#d214a2',
			'@font-size-base': '12px'
		},
	})
)
