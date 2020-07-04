const electron = require('electron');
const url = require('url');
const path = require('path');
const { Menu } = require('electron');

const {app, BrowserWindow} = electron;


let mainWindow;
let addWindow;


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

    // quit app when closed
    mainWindow.on('closed', function(){
        app.quit();
    });

    // build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // insert menu
    Menu.setApplicationMenu(mainMenu);

});


// create new add window function
function createAddWindow() {

    // creating a new window
    addWindow = new BrowserWindow({
        width: 200,
        height: 300,
        title: 'Add Shopping List Item'
    });

    // load HTML into window
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    // garbage window collection
    addWindow.on('close', function(){
        addWindow = null;
    });
}



// creating menu template
const mainMenuTemplate = [
    {
        label:'File',
        submenu: [
            {
                label: 'Add Item',
                click() {
                    createAddWindow();
                }

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



// mac/windows menu support
// unshift adds empty object to beginning of array
if(process.platform == 'darwin') {
    mainMenuTemplate.unshift({});
}




// add developer tool items if not in production
if (process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu:[
            {
                label: 'Toggle Dev Tools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    })
}