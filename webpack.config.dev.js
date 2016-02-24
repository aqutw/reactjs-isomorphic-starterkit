var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
//path permet de résoudre les chemins relatifs en absolus via __dirname et path.resolve notamment:
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'src');
var webpackDevConfig = {
	//Fichier d'entrée où toutes les dépendances et ressources à inclure 
	//seront cherchées récursivement:
	entry: [
		'webpack-dev-server/client?http://localhost:8080',//WebpackDevServer host et port
		'webpack/hot/only-dev-server',//"only" permet d'empêcher le rechargement lors d'erreurs de syntaxes
		APP_DIR + '/index.jsx' //fichier d'entrée principale de notre code source
	],
	output: {
		filename: 'all.bundle.js',
		//path spécifie le dossier de destination des fichiers loadés et/ou bundlés (en chemin absolu):
		path: BUILD_DIR,
		//publicPath spécifie l'url publique des ressources bundlées/loadées: lorsqu'un require est rencontré, son URL de sortie sera composé
		//de publicPath+URL du require (cf. img/toto.jpg dans un component devient: /public/img/toto.jpg):
		//Il est utile si les ressources sont situés dans un autre domaine (par exemple, publicPath: 'http://www.toto.fr/assets')
		//La plupart du temps publicPath = chemin relatif de path:
		publicPath: '/public/'
	},
	module: {
		//Pour plus de détails sur comment fonctionne la
		//configuration webpack: https://webpack.github.io/docs/configuration.html
		loaders: [
			{
				//exclude est inutile si include est spécifié (sauf si on veut
				//exclure un dossier contenu dans un dossier inclu)
				//Le loader react-hot permet d'activer hot refresh sur le code:
				//il doit être placé avant tous les autres loaders
				//(cf. https://gaearon.github.io/react-hot-loader/getstarted/):
				//(si plusieurs loaders, mettre loaders: [] au lieu de loader:)
				test: /\.js[x]?$/,
				//exclude: /node_modules/,
				include: APP_DIR,
				loaders: [
					'react-hot',
					'babel-loader'
				]
			},
			{
				//CSS Loader:
				// On extrait tous les contenus des css via ExtractTextPlugin.extract:
				// On aurait très bien pu spécifier la contrainte include sur APP_DIR
				//mais inutile dans le cas où on a du CSS situé en dehors de APP_DIR et que l'on veut inclure:
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader")
			},
			{
				//Image loader:
				//Le plugin file permet de chercher toutes les images et de les inclure dans output.path?name
				//Pour plus de détails: https://github.com/webpack/file-loader/blob/master/README.md
				test: /\.(jp[e]?g|png|gif|svg)$/i,
				loader: 'file-loader?name=img/[name].[ext]'
				//loader:'file-loader?name=[path]/[name].[ext]'
			},
		]
	},
	// Le plugin ExtractTextPlugin permet d'assembler tous les css précédemment extrait dans un seul fichier css:
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin('all.bundle.css')
	]
};

module.exports = webpackDevConfig;
