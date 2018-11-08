import { saveSetting, loadSetting } from './storage';


export const themes: any = {
  common: {
    '--transition-duration': '0.4s',
    '--transition-duration-short': '0.2s',
    '--padding': '20px',
    '--margin': '20px',
    '--border-radius': '9px',
    '--white': '#FFFFFF',
    '--black': '#000000',
    '--orange': '#F3820A',
    '--primary': '#2258EA',
  },
  light: {
    '--primary-transparent': 'rgba(34, 88, 234, 0.1)',
    '--primary-semi-transparent': 'rgba(34, 88, 234, 0.4)',
    '--secondary': '#E8F0FD',
    '--tertiary': '#FFFFFF',
    '--background-color': '#F8F9F8',
    '--line-color': '#F4F3F4',
    '--grey': '#6C6C6C',
    '--text-primary': '#000000',
    '--box-shadow': '0px 5px 25px rgba(0, 0, 0, 0.1)',
    '--box-shadow-hover': '0px 8px 30px rgba(0, 0, 0, 0.12)',
    '--box-shadow-active': '0px 5px 15px rgba(0, 0, 0, 0.1)',
  },
  dark: {
    '--primary-transparent': 'rgba(255, 255, 255, 0.05)',
    '--primary-semi-transparent': 'rgba(0, 0, 0, 0.2)',
    '--secondary': '#2B343F',
    '--tertiary': '#222A35',
    '--background-color': '#192028',
    '--line-color': '#2C3440',
    '--grey': '#6C6C6C',
    '--text-primary': '#FFFFFF',
    '--box-shadow': '0px 5px 25px rgba(0, 0, 0, 0.3)',
    '--box-shadow-hover': '0px 7px 30px rgba(0, 0, 0, 0.25)',
    '--box-shadow-active': '0px 5px 25px rgba(0, 0, 0, 0.4)',
  },
};


export async function getTheme() {
  const themeFromSettings = await loadSetting('theme');
  if (! themeFromSettings) {
    setTheme('light');
  }
  const theme = themeFromSettings || 'light';
  return theme;
}


export function setTheme(theme: string) {
  const htmlRoot = document.getElementsByTagName('html')[0];
  saveSetting('theme', theme);

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
