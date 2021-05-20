const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: {
    content: [
      './components/**/*.tsx',
      './contentTypes/**/*.tsx',
      './lib/**/*.tsx',
      './modules/**/*.tsx',
      './pages/**/*.tsx',
      './pageBuilder/**/*.tsx',
    ],
    options: {
      safelist: [
        'decoration-frida-black',
        'decoration-frida-pink',
        'decoration-frida-white',
        'bg-frida-pink',
        'bg-frida-red',
        'bg-frida-green',
        'bg-frida-white',
        'bg-frida-black',
      ],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      white: '#FFFFFF',
      pageBG: 'var(--pageBG)',
      pageText: 'var(--pageText)',
    },
    screens: {
      xs: '480px',
      sm: '768px',
      md: '940px',
      lg: '1200px',
      xl: '1600px',
    },
    borderWidth: {
      DEFAULT: '1px',
      0: '0',
      2: '2px',
      3: '3px',
      4: '4px',
      6: '6px',
      8: '8px',
    },
    extend: {
      transitionProperty: {
        'max-height': 'max-height',
        zIndex: 'zIndex',
        left: 'left',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translate3d(100%, 0, 0)' },
          '100%': { transform: 'translate3d(0, 0, 0)' },
        },
        slideOut: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-100%, 0, 0)' },
        },
      },
      animation: {
        slideIn: '0.5s ease-in-out 0s normal forwards slideIn',
        slideOut: '0.5s ease-in-out 0s normal forwards slideOut',
      },
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
        inherit: 'inherit',
      },
      fontSize: {
        xxs: '.625rem',
      },
      zIndex: {
        '-1': '-10',
        50: 50,
        60: 60,
        70: 70,
        80: 80,
        90: 90,
      },
      transitionDuration: {
        5000: '5000ms',
      },
      colors: {
        'frida-pink': '#f5c5d9',
        'frida-red': '#fa464c',
        'frida-green': '#6dd163',
        'frida-white': '#ffffff',
        'frida-black': '#000000',
        'frida-grey': '#e5e7eb',
      },
      height: {
        vh: '100vh',
        'vh/2': '50vh',
        'vh/3': 'calc(100vh / 3)',
        'vh/4': 'calc(100vh / 4)',
        'vh/5': 'calc(100vh / 5)',
        vw: '100vw',
        'vw/2': '50vw',
        'vw/3': 'calc(100vw / 3)',
        'vw/4': 'calc(100vw / 4)',
        'vw/5': 'calc(100vw / 5)',
      },
      width: {
        'fit-content': 'fit-content',
        vh: '100vh',
        'vh/2': '50vh',
        'vh/3': 'calc(100vh / 3)',
        'vh/4': 'calc(100vh / 4)',
        'vh/5': 'calc(100vh / 5)',
        vw: '100vw',
        'vw/2': '50vw',
        'vw/3': 'calc(100vw / 3)',
        'vw/4': 'calc(100vw / 4)',
        'vw/5': 'calc(100vw / 5)',
      },
    },
  },
  variants: {
    extend: {
      maxHeight: ['group-hover'],
      maxWidth: ['group-hover'],
      position: ['group-hover'],
      display: ['group-hover'],
      zIndex: ['group-hover'],
    },
  },
  plugins: [
    require('tailwind-text-decoration-color'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-fluid')({
      textSizes: {
        xs: {
          min: '12px',
          max: '16px',
          minvw: '320px',
          maxvw: '1400px',
        },
        sm: {
          min: '14px',
          max: '20px',
          minvw: '320px',
          maxvw: '1400px',
        },
        base: {
          min: '16px',
          max: '30px',
          minvw: '320px',
          maxvw: '1400px',
        },
        lg: {
          min: '20px',
          max: '50px',
          minvw: '320px',
          maxvw: '1400px',
        },
        xl: {
          min: '24px',
          max: '60px',
          minvw: '320px',
          maxvw: '1920px',
        },
        '2xl': {
          min: '28px',
          max: '80px',
          minvw: '320px',
          maxvw: '1920px',
        },
        '3xl': {
          min: '30px',
          max: '100px',
          minvw: '320px',
          maxvw: '1920px',
        },
      },
    }),
  ],
}
