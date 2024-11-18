// Firebase-Konfiguration
const firebaseConfig = {
    apiKey: "AIzaSyCZjoz06WcTBrDQtaWMhn7c3qxnc8anlOE",
    authDomain: "docapp-567b4.firebaseapp.com",
    projectId: "docapp-567b4",
    storageBucket: "docapp-567b4.firebasestorage.app",
    messagingSenderId: "550486491098",
    appId: "1:550486491098:web:f81df2b77c4db128084ae3"
};////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////GOOGLE API//////////////////////////////////////////////////////////
const apiKey = 'AIzaSyCZjoz06WcTBrDQtaWMhn7c3qxnc8anlOE';
const SCOPES = 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.email';
const GoogleCloudCosnoleId = '550486491098-8g4rmi94d2mjrqgk4m5l04aocmkh9f1k.apps.googleusercontent.com';
let gisInited = false;
//Laden der lib und init der API

function loadGoogleApi() {
    console.log("Lade Google API...");
    gapi.load('client', () => {
        console.log('Google API geladen');
        initializeGapiClient();
        enableTokenClient();
    });
}

// Initialisierung des Token-Clients
async function initializeGapiClient(){
    await gapi.client.init({
        apiKey: apiKey,
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
    });
    gapiInited = true;
    console.log('initializeGapiClient ist:', gapiInited)
}

//Abrufen des Access Token mit den angegebenen Scopes

function enableTokenClient() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: GoogleCloudCosnoleId,
        scope: SCOPES,
        callback: (response) => {
            if (response.error) {
                console.error('Fehler beim Abrufen des Tokens:', response.error);
                return;
            }
            console.log('Access Token erhalten:', response.access_token);
        },
    });
    gisInited = true;
    requestAccessToken();
}
//Anforderung des Access Token 
function requestAccessToken(){
    if(!gisInited){
        console.error('Token-Client X Init');
        return;
    }
    tokenClient.requestAccessToken({prompt: 'consent'});
    console.log('requestAccessToken passt');
    window.location.href = "content.html";
}


//////////////////////////////FIREBASE//////////////////////////////////////////////////////
// Firebase initialisieren
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Google-Login-Funktion
function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            const userEmail = result.user.email;
            console.log("Benutzer angemeldet:", userEmail);

            // Überprüfen, ob die E-Mail in Firestore autorisiert ist
            // Überprüfen, ob die E-Mail in Firestore autorisiert ist
        db.collection("authorizedUsers").where("email", "==", userEmail)
        .get()
        .then((querySnapshot) => {
            if (!querySnapshot.empty) {
                // Die E-Mail ist autorisiert, weiter zur content.html
                console.log("das ist die regestrierte MAIL:", provider);
               // window.location.href = "content.html";
            } else {
                // Die E-Mail ist nicht autorisiert, Zugang verweigern
                alert("Sie sind nicht autorisiert, auf diese Seite zuzugreifen.");
                auth.signOut(); // Abmelden des nicht autorisierten Benutzers
            }
})
.catch((error) => {
    console.error("Fehler beim Zugriff auf die Datenbank:", error);
    alert("Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.");
    auth.signOut(); // Abmelden bei Fehler
});

        })
        .catch((error) => {
            console.error("Fehler bei der Anmeldung:", error);
        });
}

// Optional: Authentifizierungsstatus-Überprüfung bei Seitenladevorgang
auth.onAuthStateChanged((user) => {
    if (!user) {
        // Benutzer ist nicht angemeldet
        console.log("Benutzer ist nicht angemeldet.");
    }
});
