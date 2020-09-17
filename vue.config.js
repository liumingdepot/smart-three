module.exports = {
	publicPath: "./",
	outputDir: "dist",
	assetsDir: "static",
	devServer: {
		open: process.platform === 'darwin',
		host: '0.0.0.0',
		port: 8080,
		https: false,
		hotOnly: false,
		proxy: {
			'/api1': {
				target: "http://113.140.66.229:11016",
				// target: "http://192.168.2.123:8001",
				changeOrigin: true,
				secure: false,
				pathRewrite: {
					"^/api1": ""
				}
			},
			'/api2': {
				target: "https://open.ys7.com",
				changeOrigin: true,
				secure: false,
				pathRewrite: {
					"^/api2": ""
				}
			}
		},
	}
}
