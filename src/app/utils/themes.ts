export const themes: any = {
  common: {
    '--transition-duration': '0.4s',
    '--padding': '20px',
    '--margin': '20px',
  },
  light: {
    '--primary': '#2258EA',
    '--secondary': '#E8F0FD',
    '--tertiary': '#FFFFFF',
    '--background-color': '#F8F9F8',
    '--line-color': '#F4F3F4',
    '--grey': '#6C6C6C',
    '--text-primary': '#000000',
  },
  dark: {
    '--primary': '#2258EA',
    '--secondary': '#2B343F',
    '--tertiary': '#222A35',
    '--background-color': '#192028',
    '--line-color': '#2C3440',
    '--grey': '#6C6C6C',
    '--text-primary': '#FFFFFF',
  },
};


export function getTheme() {
  // read from settings
  return 'light';
}


export function setTheme(theme: string) {
  const htmlRoot = document.getElementsByTagName('html')[0];
  if (theme === 'dark') {
    Object.keys(themes.dark).map((property) => {
      htmlRoot.style.setProperty(property, themes.dark[property]);
    });
  }
  else {
    Object.keys(themes.light).map((property) => {
      htmlRoot.style.setProperty(property, themes.light[property]);
    });
  }
}
