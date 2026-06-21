import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDZqQva7lK_0bxOpMV3uIBmfc8y_k9M8yo",
  authDomain: "agenda-contatos-59152.firebaseapp.com",
  projectId: "agenda-contatos-59152",
  storageBucket: "agenda-contatos-59152.firebasestorage.app",
  messagingSenderId: "446620130779",
  appId: "1:446620130779:web:1d0da26c6afa073d311bfe"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);