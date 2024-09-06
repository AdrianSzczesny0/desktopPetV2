const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const ipc = electron.ipcMain;

let win;
function createWindow(){
    win  = new BrowserWindow(
        {
            fullscreen:true,
            webPreferences:{
                nodeIntegration: true,
                contextIsolation: false
            },
            transparent:true,
            frames:false,
            focusable: false
        },
    );
    win.loadURL(url.format({
        pathname: path.join(__dirname,"index.html"),
        protocol:"file",
        slashes:true
    }));
    win.setIgnoreMouseEvents(true , {forward:true});
    win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
    win.setAlwaysOnTop(true, 'screen-saver', 1);  

    win.on('close', ()=>{
        win = null;
    })
}


app.on('ready',createWindow);
app.on('window-all-closed', () =>{
    app.quit();
})
ipc.on('hover-on' ,() =>{
    console.log('HOVER ON');
    win.setIgnoreMouseEvents(false , {forward:false});
})
ipc.on('hover-off' ,() =>{
    console.log('HOVER OFF');
    win.setIgnoreMouseEvents(true , {forward:true});

})

app.on('activate', () =>{
    if(win === null){
        createWindow();
    }
})