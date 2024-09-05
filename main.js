console.log("main process running");

const electron = require("electron");
const { read } = require("fs");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");

let win;

function createWindow(){
    win  = new BrowserWindow(
        {
            transparent:true,
            frames:false
        }
    );
    win.loadURL(url.format({
        pathname: path.join(__dirname,"index.html"),
        protocol:"file",
        slashes:true
    }));

    win.webContents.openDevTools();
    win.on('close', ()=>{
        win = null;
    })
}


app.on('ready',createWindow);
app.on('window-all-closed', () =>{
    app.quit();
})

app.on('activate', () =>{
    if(win === null){
        createWindow()
    }
})