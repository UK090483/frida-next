import logger from 'node-color-log'

// "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white";
export const log = (type: 'info' | 'warn' | 'error', message: string) => {
  const setting = {
    bold: true,
  }
  logger.colorLog(
    {
      font: type === 'info' ? 'green' : type === 'warn' ? 'cyan' : 'red',
      bg: 'black',
    },
    message,
    setting
  )
}
