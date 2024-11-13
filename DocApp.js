// DocApp.js

const DocApp = {
    data() {
        return {
            page: "Home",
            calendar: "Lade Kalenderdaten...",
            htmlContent: "" // Variable für den HTML-Inhalt
        };
    },
};

// Erstelle und mounte die App
const app1 = Vue.createApp(DocApp);
app1.mount('#app1');
