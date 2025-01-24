// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

// Firebase Config Object
const firebaseConfig = {
    apiKey: "AIzaSyCKM_LeEJGtW7Qy9ptxAI548GQZg9ZTOZI",
    authDomain: "rppsss.firebaseapp.com",
    projectId: "rppsss",
    storageBucket: "rppsss.firebasestorage.app",
    messagingSenderId: "879317256494",
    appId: "1:879317256494:web:8eab04243a662d7942d2bf",
    measurementId: "G-3CVNF2DY0H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM Elements
const form = document.getElementById("account-form");
const accountsList = document.getElementById("accounts-list");

// Load accounts from Firestore
async function loadAccounts() {
    const querySnapshot = await getDocs(collection(db, "accounts"));
    querySnapshot.forEach((doc) => {
        const account = doc.data();
        account.id = doc.id; // Store the document ID
        addAccountToUI(account);
    });
}

// Add account to Firestore
async function saveAccountToFirestore(account) {
    await addDoc(collection(db, "accounts"), account);
}

// Delete account from Firestore
async function deleteAccountFromFirestore(id) {
    await deleteDoc(doc(db, "accounts", id));
}

// Add account to the UI
function addAccountToUI(account) {
    const accountDiv = document.createElement("div");
    accountDiv.classList.add("account");
    accountDiv.innerHTML = `
        <span><strong>Username:</strong> ${account.username}</span>
        <span><strong>Power:</strong> ${account.power}</span>
        <button class="delete-btn">Delete</button>
    `;

    // Delete button functionality
    accountDiv.querySelector(".delete-btn").addEventListener("click", async () => {
        await deleteAccountFromFirestore(account.id);
        accountDiv.remove();
    });

    accountsList.appendChild(accountDiv);
}

// Form submission
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form values
    const username = document.getElementById("username").value;
    const power = document.getElementById("power").value;

    // Create account object
    const account = { username, power };

    // Save to Firestore
    await saveAccountToFirestore(account);

    // Add to UI
    addAccountToUI(account);

    // Clear form
    form.reset();
});

// Load accounts on page load
loadAccounts();
