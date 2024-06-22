import {checkContact, checkFunc, checkSpace, checkSpecs, checkObstacles} from "./Languagecheck.js";

describe("Checking text in Italian is correctly rendered", ()=>{
    beforeEach('visit application in Dutch', ()=>{
        cy.visit('', {
            onBeforeLoad(win) {
                Object.defineProperty(win.navigator, 'language', { value: 'it-IT' });
                Object.defineProperty(win.navigator, 'languages', { value: ['it'] });
                Object.defineProperty(win.navigator, 'accept_languages', { value: ['it'] });
            },
            headers: {
                'Accept-Language': 'it',
            },
        });  });

    it("Sidebar space", ()=>{
        let space={
            q_dimensions: "Selezionate la forma della stanza e inserite le dimensioni", rectangular: "Rettangolare", dimLength: "Lunghezza",
            dimWidth: "Larghezza", dimHeight: "Altezza", other: "Altro",
            q_space: "Quale spazio abitativo desideri ottimizzare?",
            space: {
                guest_room: "Stanza degli ospiti",
                living_room: "Soggiorno",
                bedroom: "Camera da letto",
            },
            q_preferences: "Hai preferenze specifiche per la disposizione del tuo spazio abitativo?",
            preferences: {
                wall: "Muro",
                partition_wall: "Muro divisorio",
                in_the_middle_of_space: "In mezzo allo spazio",
            }}
        checkSpace(space);
    });

    it("Sidebar Q1 (obstacles)",()=>{
        let obst={
            q_aspects: "Aggiungi quali aspetti dovremmo considerare nel tuo spazio abitativo",
            obstructions: { window: "Finestra", door: "Porta", radiator: "Termosifone", walloutlet: "Presa di corrente a parete", switch: "Interruttore",
                sloping_Wall: "Muro inclinato", other: "Altro",
                q_door:{
                    opening_door:"Come funziona l'impianto?",
                    inside_left:"All'interno della stanza, a sinistra",
                    inside_right:"All'interno della stanza, a destra",
                    outside:"fuori dalla stanza"
                },
                q_window:{
                    opening_window:"La finestra può aprirsi all'interno?",
                    yes:"si",
                    no:"no"
                }
            }
        }
        checkObstacles(obst);
    } )
    it("Sidebar functional", ()=>{
        let functional={
            q_function: "Selezionate le funzioni necessarie per sfruttare al meglio il vostro spazio abitativo",
            functions: {
                bed: "Letto",
                office_space: "Spazio ufficio",
                sofa: "Divano",
                storage_space: "Spazio di archiviazione",
            },
            bed: {
                q_bed: "Quale materasso preferisci?",
                soft: "Extra morbido",
                medium: "Medio",
                sturdy: "Extra robusto",
                apply: "Non applicabile"
            }
        }
        checkFunc(functional);
    });

    it("Sidebar specs", ()=>{
        let specs={
            q_materials: "Scegliete le finiture che preferite",
            materials: {
                white: "Bianco",
                black: "Nero",
                birch: "Betulla",
                oak: "Quercia",
                walnut: "Noce",
                color: "Colore",
                material: "Materiale"
            },
            q_other: "Se ci sono altri requisiti da tenere in considerazione, vi preghiamo di inserirli qui sotto"
        }
        checkSpecs(specs);
    });

    it("Sidebar contact", ()=>{
        let contact={
            q_contact: "Lascia i tuoi dati di contatto in modo che possiamo raggiungerti",
            firstname: "Nome",
            lastname: "Cognome",
            phone_number: "Numero di telefono",
            email: "E-mail",
            address: "Indirizzo"
        }

        checkContact(contact);
    })
})