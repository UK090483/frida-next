import nodelogger from 'node-color-log'

// "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white";
const logger = (type: 'info' | 'warn' | 'error', message: string) => {
  const setting = {
    bold: true,
  }
  nodelogger.colorLog(
    {
      font: type === 'info' ? 'green' : type === 'warn' ? 'cyan' : 'red',
      bg: 'black',
    },
    message,
    setting
  )
}

export default logger

export type Logger = typeof logger
