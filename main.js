const { app, Menu, BrowserWindow, dialog, ipcMain } = require('electron')
const path = require('path')
const url = require('url')
var fs = require('fs')
var jsonfile = require('jsonfile')

require('electron-reload')(__dirname);

var interfacedata = {
  datatype:"WELCOME",
  displaytext:"Welcome to Word & Worship!<br/>If you can read this,<br/>App has launched successfully",
  url:"NA",
  reference:"NA"
};
let mainWindow, mainPreview, projectorWindow;

var mainPreviewLoaded=false, projectorWindowLoaded = false;

var imgfilepath, displayVerse, displaySlide, displayLyrics, lyricDirPath, lyricsLocation, fontSize, lyricsFilePath, videofilepath, verseReference, verseText;

//var isSecondaryDisplay = false;
var isSecondaryDisplay = true; //SET THIS TO FALSE AFTER SETTING DISPLAY PROPERLY


function validate() {
  var d = new Date();
  var seconds = Math.round(d.getTime() / 1000);
  
  //return seconds < 1510768982 ? true: false; //1508090994  1510768982
  return true;
}

function createWindow() {

  if (validate()) {
    var electronScreen = require('electron').screen;
    mainWindow = new BrowserWindow({ width: 800, height: 600, frame: false })
    mainWindow.maximize();
    mainWindow.setTitle("Word & Worship");
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, '/app/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  
    mainPreview = new BrowserWindow({ width: 800, height: 600, frame: false });// frame: true
    mainPreview.maximize();
    mainPreview.setTitle("Preview Window");
    mainPreview.setMenu(null);
    mainPreview.loadURL(url.format({
      pathname: path.join(__dirname, '/app/views/projector/preview-main.html'),
      protocol: 'file:',
      slashes: true
    }));
  
    mainWindow.webContents.openDevTools();
    mainPreview.webContents.openDevTools();
  
  
    let displays = electronScreen.getAllDisplays()
    let externalDisplay = displays.find((display) => {
      return display.bounds.x !== 0 || display.bounds.y !== 0
    })
  
    if (externalDisplay) {
      projectorWindowLoaded = true;
      projectorWindow = new BrowserWindow
      ({width: 800, height: 600, x:externalDisplay.bounds.x + 50, y: externalDisplay.bounds.y + 50, frame: false});
      projectorWindow.maximize();
      projectorWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/app/views/projector/preview-projector.html'),
        protocol: 'file:',
        slashes: true
      }));
    }
  
    mainWindow.on('closed', function () {
      mainWindow = null;
      projectorWindow = null;
      mainPreview = null;
    });
  
    electronScreen.on('display-added', function (event, newDisplay) {
      projectorWindow = new BrowserWindow
      ({width: 800, height: 600, x:newDisplay.bounds.x + 50, y: newDisplay.bounds.y + 50, frame: false });
      projectorWindow.maximize();
      projectorWindow.loadURL(url.format({
        pathname: path.join(__dirname, '/app/views/projector/preview-projector.html'),
        protocol: 'file:',
        slashes: true
      }));
    });
  
    electronScreen.on('display-removed', function (event, newDisplay) {
      projectorWindow = null;
      projectorWindowLoaded = false;
    });
  }

  else {
    console.log("There was an error with this field's customized event. Error Code [0X653]");
    console.log("Field: Window");
    console.log("Event: onLoad");
    console.log("Error: Window is undefined");
    app.exit(0);
  }

  
};

app.on('ready', createWindow);

app.disableHardwareAcceleration();


app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
});


ipcMain.on('open-audio-folder', function (event, arg) {
  var filepath = dialog.showOpenDialog({ properties: ['openDirectory'] }, {});
  if (typeof filepath != "undefined") {
    event.sender.send('audio-folder-selected', filepath[0]);
  }
});

ipcMain.on('open-video-folder', function (event, arg) {
  var filepath = dialog.showOpenDialog({ properties: ['openDirectory'] }, {});
  if (typeof filepath != "undefined") {
    event.sender.send('video-folder-selected', filepath[0]);
  }
});

ipcMain.on('preview-window-loaded', function (event, arg) {
  
  var settingData = jsonfile.readFileSync('C:\\word-and-worship\\appdata\\settings\\display-settings.json');
  mainPreviewLoaded = true;
  // console.log("settingData",settingData);
  event.sender.send('send-initial-payload', { 
    styling: settingData,
    data: interfacedata
  });
});

ipcMain.on('projector-window-loaded', function (event, arg) {
  projectorWindowLoaded = true;
  var settingData = jsonfile.readFileSync('C:\\word-and-worship\\appdata\\settings\\display-settings.json');
  event.sender.send('send-initial-payload', { 
    styling: settingData,
    data: interfacedata
  });
});

ipcMain.on('project-content', function (event, arg) {
  if (projectorWindowLoaded) projectorWindow.webContents.send('send-payload', arg);
  if (mainPreviewLoaded) mainPreview.webContents.send('send-payload', arg);
});

// Listen for image open message from renderer process
ipcMain.on('open-images-folder', function (event, arg) {
  var filepath = dialog.showOpenDialog({ properties: ['openDirectory'] }, {});
  if (typeof filepath != "undefined") {
    event.sender.send('images-folder-selected', filepath[0]);
  }
});

// Listen for image open message from renderer process
ipcMain.on('open-image-file', function (event, arg) {
  // console.log("EVENT RECEIVED");
  var filepath = dialog.showOpenDialog({ properties: ['openFile'] }, {
    filters: [{ name: 'Image files', extensions: ['jpg', 'gif'] },
    { name: 'All Files', extensions: ['*'] }]
  });
  //console.log("Filenames:",filepath);
  if (typeof filepath != "undefined") {
    imgfilepath = filepath[0];
    event.sender.send('image-file-selected', imgfilepath);
  }
});


ipcMain.on('quit-application', function (event, args) {
  app.exit(0);
});


///REVIST THESE FOR COMMETING AFTER 

ipcMain.on('move-track-forward', function (event, args) {
  if (projectorWindowLoaded) projectorWindow.webContents.send('move-track-forward', args);
  if (mainPreviewLoaded) mainPreview.webContents.send('move-track-forward', args);
});


ipcMain.on('move-track-backward', function (event, args) {
  if (projectorWindowLoaded) projectorWindow.webContents.send('move-track-backward', args);
  if (mainPreviewLoaded) mainPreview.webContents.send('move-track-backward', args);
});

ipcMain.on('stop-projection', function (event,args) {
  if (projectorWindowLoaded) projectorWindow.webContents.send('projection-stop', args);
  if (mainPreviewLoaded) mainPreview.webContents.send('projection-stop', args);
});


