const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const database = require('./database'); // Importa o módulo database.js (certifique-se de que o arquivo está na mesma pasta)

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ 
    width: 800, 
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile('./index.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });

}



ipcMain.on('login', (event, userData) => {
  const { username, password } = userData;

  // Simulação de busca no banco de dados por usuário
  database.findUser(username, password, (err, user) => {
    if (err) {
      event.reply('login-response', { success: false, message: 'Erro ao buscar usuário.' });
    } else if (user) {
      event.reply('login-response', { success: true, message: 'Login bem-sucedido.', username: user.name });
    } else {
      event.reply('login-response', { success: false, message: 'Usuário ou senha inválidos.' });
    }
  });
});

ipcMain.on('saveUser', (event, userData) => {
  const { newUsername, newPassword } = userData;

  if (!newUsername || !newPassword) {
    event.reply('register-response', { success: false, message: 'Preencha todos os campos.' });
    return;
  }

  database.saveUser(newUsername, newPassword, (err) => {
    if (err) {
      event.reply('register-response', { success: false, message: 'Erro ao cadastrar usuário.' });
    } else {
      event.reply('register-response', { success: true, message: 'Usuário cadastrado com sucesso.' });
    }
  });
});

  

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
  
  app.on('activate', function () {
    if (mainWindow === null) {
      createWindow();
    }
  });
  

  app.on('ready', createWindow);


