// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBRsSmFzluo4fnNN1Wn7H9mQaTKQ9Sua9k",
  authDomain: "actividad-d57ac.firebaseapp.com",
  projectId: "actividad-d57ac",
  storageBucket: "actividad-d57ac.appspot.com",
  messagingSenderId: "451861851935",
  appId: "1:451861851935:web:6c628737e3e44caac70a2a"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Referencia a la base de datos
const database = firebase.database();

// Solicitar nombre del usuario
let username = prompt("Ingresa tu nombre para el chat:") || "Anónimo";

// Espera a que se cargue el DOM
document.addEventListener('DOMContentLoaded', function() {
  // Obtiene referencias a los elementos de la interfaz
  const chatBox = document.getElementById('chat-box');
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  const resetButton = document.getElementById('reset-button'); // Referencia al botón de reinicio

  // Escucha de mensajes
  database.ref('messages').on('child_added', function(snapshot) {
    const data = snapshot.val();
    displayMessage(data.username, data.text, data.timestamp);
  });

  // Función para enviar mensaje
  sendButton.addEventListener('click', function() {
    const message = messageInput.value.trim();
    if (message) {
      database.ref('messages').push().set({
        username: username,
        text: message,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      });
      messageInput.value = '';
    }
  });

  // Función para reiniciar el chat (limpiar la pantalla)
  resetButton.addEventListener('click', function() {
    chatBox.innerHTML = ''; // Esto eliminará el contenido de chatBox, pero no los datos de Firebase
  });

  // Función para mostrar mensaje en la interfaz
  function displayMessage(username, message, timestamp) {
    const messageElement = document.createElement('div');
    const date = new Date(timestamp);
    messageElement.innerText = `${username}: ${message} (enviado el ${date.toLocaleString()})`;
    chatBox.appendChild(messageElement);
  }
});
