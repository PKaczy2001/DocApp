// DocApp.js

const DocApp = {
    data() {
        return {
            page: "Home",
            calendar: "Lade Kalenderdaten...",
            htmlContent: "", // Variable für den HTML-Inhalt
            eventName: "",
            eventStartTime: "",
            eventEndTime: "",
            eventDate:"", 
            createEventMessage: ""
        };
    },
    methods: {
        async addEvent(evt){
            evt.preventDefault(); // Verhindert das Seiten-Reload

            console.log('gapi verfügbar?', typeof gapi !== 'undefined' ? 'Ja' : 'Nein');
            const event ={
                summary: this.eventName,
                start: {
                    dateTime: `${this.eventDate}T${this.eventStartTime}+01:00` //DAS START Datum Syntax: "2024-11-13T10:00:00"
                },
                end: {
                    dateTime: `${this.eventDate}T${this.eventEndTime}+01:00` //DAS END Datum
                }
            };
            try {
                await gapi.client.calendar.events.insert({
                    calendarId: "primary",
                    resource: event
                });
                this.createEventMessage = "Erfolg!!!!!!!";
            } catch(error){
                console.error('FEHLER!!!!!!!!!!', error);
                this.createEventMessage = "FEHLER!!!!!!!!!" + error.message;A
                console.log('das ist START:', `${this.eventDate}T${this.eventEndTime}` );
            }
        }
    }
};

// Erstelle und mounte die App
const app1 = Vue.createApp(DocApp);
app1.mount('#app1');


