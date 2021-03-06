const { Menu, shell } = require('electron');

const { sendIpcAction } = require('./ipc-actions');


const menuTemplate = (app, mainWindow, shell) => [
  {
    label: 'Quote de Porc',
    submenu: [
      {
        label: 'About Quote de Porc',
        selector: 'orderFrontStandardAboutPanel:',
      },
      { type: 'separator' },
      {
        label: 'Hide Quote de Porc',
        accelerator: 'CmdOrCtrl+H',
        selector: 'hide:'
      },
      {
        label: 'Hide Others',
        accelerator: 'CmdOrCtrl+Shift+H',
        selector: 'hideOtherApplications:'
      },
      {
        label: 'Show All',
        selector: 'unhideAllApplications:'
      },
      { type: 'separator' },
      {
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click: () => app.quit(),
      },
    ],
  },
  {
    label: 'File',
    submenu: [
      {
        label: 'New Quote',
        accelerator: 'CmdOrCtrl+N',
        click: () => sendIpcAction('newQuote'),
      },
      {
        label: 'Import Quote',
        accelerator: 'CmdOrCtrl+I',
        click: () => sendIpcAction('importQuote'),
      },
      { type: 'separator' },
      {
        label: 'Save',
        accelerator: 'CmdOrCtrl+S',
        id: 'saveQuote',
        enabled: false,
        click: () => sendIpcAction('saveQuote'),
      },
      {
        label: 'Save As',
        accelerator: 'Shift+CmdOrCtrl+S',
        id: 'saveQuoteAs',
        enabled: false,
        click: () => sendIpcAction('saveQuoteAs'),
      },
      {
        label: 'Export to PDF',
        accelerator: 'CmdOrCtrl+E',
        id: 'exportToPDF',
        enabled: false,
        click: () => sendIpcAction('exportToPDF'),
      },
      { type: 'separator' },
      {
        label: 'Close File',
        accelerator: 'CmdOrCtrl+W',
        id: 'closeFile',
        enabled: false,
        click: () => sendIpcAction('closeFile'),
      },
    ],
  },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        selector: 'undo:',
      },
      {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        selector: 'redo:',
      },
      { type: 'separator' },
      {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        selector: 'cut:',
      },
      {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        selector: 'copy:',
      },
      {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        selector: 'paste:',
      },
      {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        selector: 'selectAll:',
      },
    ],
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click: () => mainWindow.setFullScreen( ! mainWindow.isFullScreen()),
      },
      // {
      //   label: 'Toggle Theme',
      //   accelerator: 'Shift+CmdOrCtrl+T',
      //   click: () => sendIpcAction('toggleTheme'),
      // },
      { type: 'separator' },
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        visible: process.env.APP_ENV === 'development',
        click: () => {
          if (mainWindow.restart) {
            mainWindow.restart();
          }
          else if (mainWindow.reload) {
            mainWindow.reload();
          }
        },
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: 'Alt+CmdOrCtrl+I',
        click: () => mainWindow.toggleDevTools(),
      },
      { type: 'separator' },
      {
        role: 'zoomin',
      },
      {
        role: 'zoomout',
      },
      {
        role: 'resetzoom',
      },
    ],
  },
  {
    label: 'Window',
    submenu: [
      {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        selector: 'performMiniaturize:'
      },
      {
        type: 'separator'
      },
      {
        label: 'Bring All to Front',
        selector: 'arrangeInFront:',
      },
    ],
  },
];


module.exports = function createMenu(app, mainWindow) {
  return Menu.buildFromTemplate(menuTemplate(app, mainWindow));
};
