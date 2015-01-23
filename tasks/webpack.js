var gulp = require('gulp'),
	plugins = require('gulp-load-plugins')(),
	glob = require('glob'),
	webpack = require('webpack'),
	path = require('path');

gulp.task('webpack', function() {
	webpack({
		entry: './application/main.js',
		output: {
			path: __dirname,
			filename: '../temp/application.js'
		},
		resolve: {
			modulesDirectories: ['libs', 'application', 'node_modules', 'temp'],
			alias: {
				config: path.resolve('./config.js')
			}
		},
		resolveLoader: {
			modulesDirectories: ['node_modules', 'tasks']
		},
		module: {
			loaders: [
				{ test: /\.tpl$/, loader: 'ractive' },
				{ test: /\.ract$/, loader: 'ract' }
			]
		},
		devtool: '#eval-source-map',
		watch: true
	}, function(err, stats) {
		if(err) {
			throw new plugins.util.PluginError('[webpack]', err);
		} else {
			var time = (stats.endTime - stats.startTime);
			plugins.util.log(plugins.util.colors.green('[webpack]', 'bundle success!') + ' - after ' + time + ' ms' );
		}
	});
});

gulp.task('webpack-build', function() {
	webpack({
		entry: './application/main.js',
		output: {
			path: __dirname,
			filename: '../temp/application.js'
		},
		resolve: {
			modulesDirectories: ['libs', 'application', 'node_modules', 'temp'],
			alias: {
				config: path.resolve('./config.js')
			}
		},
		module: {
			loaders: [
				{ test: /\.tpl$/, loader: 'ractive' },
				{ test: /\.json$/, loader: 'json' }
			]
		}
	}, function(err, stats) {
		if(err) {
			throw new plugins.util.PluginError('[webpack]', err);
		}
	});
});