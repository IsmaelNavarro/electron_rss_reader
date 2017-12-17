const { app, BrowserWindow } = require('electron'),
    path = require('path'),
    url = require('url');
    
//const { default: installExtension, REACT_DEVELOPER_TOOLS } = require("electron-devtools-installer");

let mainWindow;

const createWindow = () => {
    //installExtension(REACT_DEVELOPER_TOOLS)
    //    .then((name) => console.log(`Added Extension: ${name}`))
    //    .catch((err) => console.log("An error occurred: ", err));

    mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        frame: true,
        icon: path.join(__dirname, 'icon-64x64.png')
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

if (process.env.NODE_ENV === 'development')
    require('electron-debug')(); 