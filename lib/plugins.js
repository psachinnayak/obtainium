var fs = require("fs"),
	async = require("async"),
	path = require("path");


module.exports = function(config) {
	var plugins = fs.readdirSync(path.join(__dirname, "..", "node_modules")).filter(function(moduleName) {
		return moduleName.indexOf("obtainium-") == 0;
	}).map(function(plugin) {
		return require(plugin)(config);
	});

	return {
		download: function(url) {
			async.map(plugins, function(plugin, done) {
				plugin.canYouHandle(url, done);
			}, function(err, results) {
				var maxWeightage = Math.max.apply(Math, results),
					indexOfMax = results.indexOf(maxWeightage),
					selectedPlugin = plugins[indexOfMax];

				selectedPlugin.start(url, function(err, watcher) {
					console.log(watcher.status());
				});
			});
		}
	}
}
