import { formatDay } from "./utils";

// Take an argument, pad it if necessary, then try to run the file
require("./day" + formatDay(Number.parseInt(process.argv[2])));
