import { Logger } from "tslog";
import fs from "fs";

// 💡 Обходим дженерики — всё работает стабильно
export const log = new Logger<any>({
  type: "pretty",
  name: "E2E-LOG",
  hideLogPositionForProduction: true,
});

// Поток в файл
const logFile = fs.createWriteStream("test-log.txt", { flags: "w" });

// 💣 TS не может правильно обработать attachTransport — обходим через any
(log.attachTransport as any)({
  log: (msg: string) => {
    logFile.write(msg + "\n");
  },
  minLevel: 2, // debug
});
