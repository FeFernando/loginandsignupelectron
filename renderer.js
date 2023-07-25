const { ipcRenderer } = require('electron');

document.addEventListener('DOMContentLoaded', () => {
  const nome = document.getElementById('userNameInput');
  const password = document.getElementById('passwordNameInput');
  const saveButton = document.getElementById('saveButton');

  function sendSaveUserEvent() {
    const userName = nome.value.trim();
    const userPassword = password.value.trim();

    if (userName !== '' && userPassword !== '') {
      ipcRenderer.send('saveUser', { name: userName, password: userPassword });
    }
  }

  // Verifica se o botão "Save" foi encontrado antes de definir o evento de clique
  if (saveButton) {
    saveButton.onclick = sendSaveUserEvent;
  }
});
