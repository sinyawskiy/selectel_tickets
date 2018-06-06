var path = require('path');
var webpack = require('webpack');
// console.log(path.join(__dirname, 'asd'));

module.exports = {
	module: {
		rules: [
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					}
				]
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['react', 'es2015'],
							plugins: ['react-hot-loader/babel']
						}
					}
				]
			},
			{
			  	test: /\.(ttf|eot|woff|woff2)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "file-loader",
						options: {
							 name: "fonts/[name].[ext]",
						}
					}
				]
			},
			{
			  	test: /\.svg$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "file-loader",
						options: {
							 name: "img/[name].[ext]",
						}
					}
				]
			}
		]
	},

	entry: path.join(__dirname, '/src/index.jsx'),
	output: {
		path: path.join(__dirname, 'public', 'build'),
		publicPath: '/public/build/',
		filename: 'bundle.js',
    	chunkFilename: '[name].js'
	},
	devServer: {
        contentBase: "public",
        hot: true,
        inline: true,
        quiet: false,
        noInfo: true,
        stats: { colors: true }
    },
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('development')
			},
		  	VERSION: JSON.stringify(require("./package.json").version),
			DESCRIPTION: JSON.stringify(require("./package.json").description),
		})
	],
	mode: 'production',
	watch:true
};
