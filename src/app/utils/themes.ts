import ipc from 'electron-better-ipc';
const settings = require('electron').remote.require('electron-settings');


export const themes: any = {
  common: {
    '--transition-duration': '0.4s',
    '--transition-duration-short': '0.2s',
    '--padding': '20px',
    '--margin': '20px',
    '--border-radius': '9px',
    '--white': '#FFFFFF',
  },
  light: {
    '--primary': '#2258EA',
    '--primary-transparent': 'rgba(34, 88, 234, 0.1)',
    '--primary-semi-transparent': 'rgba(34, 88, 234, 0.4)',
    '--secondary': '#E8F0FD',
    '--tertiary': '#FFFFFF',
    '--background-color': '#F8F9F8',
    '--line-color': '#F4F3F4',
    '--grey': '#6C6C6C',
    '--text-primary': '#000000',
  },
  dark: {
    '--primary': '#2258EA',
    '--primary-transparent': 'rgba(255, 255, 255, 0.05)',
    '--primary-semi-transparent': 'rgba(0, 0, 0, 0.2)',
    '--secondary': '#2B343F',
    '--tertiary': '#222A35',
    '--background-color': '#192028',
    '--line-color': '#2C3440',
    '--grey': '#6C6C6C',
    '--text-primary': '#FFFFFF',
  },
};


export function getTheme() {
  const themeFromSettings = settings.get('theme');
  if (! themeFromSettings) {
    setTheme('light');
  }
  const theme = themeFromSettings || 'light';
  return theme;
}


export function setTheme(theme: string) {
  const htmlRoot = document.getElementsByTagName('html')[0];
  ipc.callMain('request-theme-update', { theme });

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
