var fs = require("fs");

module.exports = function(pathToConfigFile) {
	var configContents = fs.readFileSync(pathToConfigFile);

	return JSON.parse(configContents);
}