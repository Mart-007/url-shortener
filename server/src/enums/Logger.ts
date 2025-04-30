import moment from "moment-timezone";
import chalk from "chalk";

export const logger = {
  info: (message: string, data?: any) => {
    console.log(
      moment().toISOString(),
      chalk.blue("[INFO]"),
      message,
      data ?? ""
    );
  },
  warn: (message: string, data?: any) => {
    console.warn(
      moment().toISOString(),
      chalk.yellow("[WARN]"),
      message,
      data ?? ""
    );
  },
  error: (message: string, data?: any) => {
    console.error(
      moment().toISOString(),
      chalk.red("[ERROR]"),
      message,
      data ?? ""
    );
  },
};
