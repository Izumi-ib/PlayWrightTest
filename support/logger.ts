import fs from "fs";
import path from "path";

const logPath = path.resolve("test-log.txt");
const logFile = fs.createWriteStream(logPath, { flags: "w" });

const colors = {
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
};

function timestamp() {
  return new Date().toISOString();
}

function write(level: string, color: string, message: string) {
  const time = timestamp();
  const formatted = `[${time}] [${level}] ${message}`;
  console.log(color + formatted + colors.reset);
  logFile.write(formatted + "\n");
}


export const log = {
  section: (title: string) =>
    write("SECTION", colors.cyan, `${title}`),

  info: (msg: string) => write("INFO", colors.green, msg),

  warn: (msg: string) => write("WARN", colors.yellow, msg),

  error: (msg: string) => write("ERROR", colors.red, msg),

  debug: (msg: string) => write("DEBUG", colors.dim, msg),
};