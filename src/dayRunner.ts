// Take an argument, pad it if necessary, then try to run the file
const number = process.argv[2].padStart(2, '0');
require("./day" + number)