const path = require('path');
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode : "production",
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'index_bundle.js'
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 9000
	},
	module : {
		rules : [
			{
				test: /\.(t)sx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            // `.swcrc` in the root can be used to configure swc
            loader: "ts-loader"
        }
			},
			{
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
				]
			},
			{
        test: /\.scss/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
		]
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	plugins: [
    // DOC: https://webpack.js.org/plugins/html-webpack-plugin/
    new HTMLWebpackPlugin({
      filename: "./index.html",
      template: path.join(__dirname, 'src/template.html')
    })
  ]
}