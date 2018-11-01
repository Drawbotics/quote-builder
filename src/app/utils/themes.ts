export const themes: any = {
  dark: {
    '--primary': 'red',
    '--secondary': 'black',
  },
  light: {
    '--primary': 'blue',
    '--secondary': 'white',
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
