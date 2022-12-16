const CracoLessPlugin = require("craco-less");

module.exports = {
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: {
							"@primary-color": "#FF9138",
							"@btn-default-color": "@primary-color",
							"@btn-default-bg": "@primary-1",
							"@btn-default-border": "@primary-color",
							"@menu-item-active-bg": "@primary-color",
							"@table-border-color": "#FFE3CD",
							"@table-border-radius-base": "10px",
						},
						javascriptEnabled: true,
					},
				},
			},
		},
	],
};
