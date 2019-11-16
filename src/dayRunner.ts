let utils = require('./utils');

// Take an argument, pad it if necessary, then try to run the file
require("./day" + utils.formatDay(process.argv[2]))