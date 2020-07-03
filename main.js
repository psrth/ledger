const electron = require('electron');
const url = require('url');
const path = require('path');
const { Menu } = require('electron');

const {app, BrowserWindow} = electron;

let mainWindow;

// listen for the app to be ready
app.on('ready', function() {

    // creating a new window
    mainWindow = new BrowserWindow({});

    // load HTML into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    // build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // insert menu
    Menu.setApplicationMenu(mainMenu);

});


// creating menu template
const mainMenuTemplate = [
    {
        label:'Electron',
    },
    {
        label:'File',
        submenu: [
            {
                label: 'Add Item'
            },
            {
                label: 'Clear Items'
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
];
