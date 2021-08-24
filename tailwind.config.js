const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: {
    content: [
      './components/**/*.tsx',
      './PageTypes/**/*.tsx',
      './pages/**/*.tsx',
      './pageBuilder/**/*.tsx',
    ],
    options: {
      safelist: [
        'decoration-frida-black',
        'decoration-frida-pink',
        'decoration-frida-white',
        'text-frida-black',
        'text-frida-red',
        'text-frida-pink',
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

      // white: '#000000',
      // black: '#FFFFFF',
    },

    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
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
      outline: {
        green: ['3px dotted #6dd163', '6px'],  
      },
      inset: {
        unset: 'unset',
      },
      spacing: {
        'frida_7%': '7%',
        frida_side: '16px',
        frida_side_big: '1.2rem',
      },
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
        md:'20rem'
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

        // 'frida-pink': '#852e52',
        // 'frida-red': '#a31217',
        // 'frida-green': '#6dd163',
        // 'frida-black': '#ffffff',
        // 'frida-white': '#000000',
        // 'frida-grey': '#3c3c3e',
      },
      height: {
        heroMin: '700px',
        vh: '100vh',
        'vh/2': '50vh',
        'vh-50': '50vh',
        'vh/3': 'calc(100vh / 3)',
        'vh/4': 'calc(100vh / 4)',
        'vh/5': 'calc(100vh / 5)',
        'vh/7': 'calc(100vh / 7)',
        'vh/8': 'calc(100vh / 8)',
        'vh/9': 'calc(100vh / 9)',
        
        'vh-40': '40vh',
        'vh-90': '90vh',
        'vh-100': '100vh',
        vw: '100vw',
        'vw/2': '50vw',
        'vw/3': 'calc(100vw / 3)',
        'vw/4': 'calc(100vw / 4)',
        'vw/5': 'calc(100vw / 5)',
      },
      width: {
        'absolut-s': '200px',
        'absolut-m': '400px',
        'absolut-l': '600px',
        'absolut-xl': '900px',
        'absolut-xxl': '1200px',
        'fit-content': 'fit-content',
        'vw/1-5':  'calc(100vw / 1.5)',
        'vw/3-5': 'calc(100vw / 3.5)',
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
        'vw/6': 'calc(100vw / 6)',
        'vw/8': 'calc(100vw / 8)',
      },
    },
  },
  variants: {
    extend: {
      maxHeight: ['group-hover', 'group-focus'],
      maxWidth: ['group-hover', 'group-focus'],
      position: ['group-hover', 'group-focus'],
      display: ['group-hover', 'group-focus'],
      zIndex: ['group-hover', 'group-focus'],
      opacity: ['group-hover', 'group-focus'],
      translate: ['group-hover', 'group-focus'],
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    require('tailwind-text-decoration-color'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-fluid')({
      textSizes: {
        xxs: {
          min: '10px',
          max: '13px',
          minvw: '320px',
          maxvw: '1400px',
        },
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
        md: {
          min: '18px',
          max: '40px',
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
