import {checkContact, checkFunc, checkSpace, checkSpecs, checkObstacles} from "./Languagecheck.js";

describe("Checking text in Dutch is correctly rendered", ()=>{
    beforeEach('visit application in Dutch', ()=>{
        cy.visit('', {
            onBeforeLoad(win) {
                Object.defineProperty(win.navigator, 'language', { value: 'nl-BE' });
                Object.defineProperty(win.navigator, 'languages', { value: ['nl'] });
                Object.defineProperty(win.navigator, 'accept_languages', { value: ['nl'] });
            },
            headers: {
                'Accept-Language': 'nl',
            },
        });  });

    it("Sidebar space", ()=>{


        let space={ q_dimensions: "Selecteer de vorm van de ruimte en geef de afmetingen in", rectangular: "Rechthoekig", dimLength: "Lengte", dimWidth: "Breedte",
                dimHeight: "Hoogte", other: "Anders",
            q_space:"Welke woonruimte wenst u te optimaliseren?",
            space:{
                guest_room:"Logeerkamer",
                living_room:"Woonkamer",
                bedroom:"Slaapkamer",
            },
            q_preferences: "Heeft u specifieke voorkeuren voor de indeling van uw woonruimte?",
            preferences:{
                wall:"Muur",
                partition_wall:"Scheidingswand",
                in_the_middle_of_space:"Te midden van ruimte",
            }

        }
        checkSpace(space);
    });

    it("Sidebar Q1 (obstacles)",()=>{
        let obst={
            q_aspects:"Voeg toe met welke aspecten we rekening moeten houden in uw woonruimte",
            obstructions: { window:"Raam", door:"Deur", radiator:"Radiator", walloutlet:"Stopcontact",
                switch:"Schakelaar", sloping_Wall:"Schuine wand", other:"Andere",
                q_door:{
                    opening_door:"Hoe opent de deur?",
                    inside_left:"Binnen in de ruimte, naar links",
                    inside_right:"Binnen in de ruimte, naar rechts",
                    outside:"Buiten de ruimte"
                },
                q_window:{
                    opening_window:"Kan het raam naar binnen openen?",
                    yes:"ja",
                    no:"nee"
                }
            }
        }
        checkObstacles(obst);
    } )

    it("Sidebar functional", ()=>{
        let functional={  q_function:"Selecteer de functies die nodig zijn om uw woonruimte optimaal te benutten",
            functions:{
                bed:"Bed",
                office_space:"Bureauruimte",
                sofa:"Sofa",
                storage_space:"Opbergruimte",
            },
            bed:{
                q_bed:"Welke matras verkiest u?",
                soft:"Extra zacht",
                medium:"Medium",
                sturdy:"Extra stevig",
                apply: "Niet van toepassing"
            }
        }
        checkFunc(functional);
    });

    it("Sidebar specs", ()=>{
        let specs={
            q_materials: "Selecteer welke afwerkingen u verkiest",
            materials:{
                color:"kleur",
                material:"materiaal",
                white:"Wit",
                black:"Zwart",
                birch:"Berk",
                oak:"Eik",
                walnut:"Notelaar"
            },
            q_other:"Indien er nog andere vereisten zijn waarmee we rekening moeten houden, vul deze hieronder in"
        }
        checkSpecs(specs);
    });

    it("Sidebar contact", ()=>{
        let contact={
            q_contact:"Laat uw contactgegevens achter zodat we u kunnen bereiken",
            firstname:"Voornaam",
            lastname:"Achternaam",
            email:"E-mail",
            address:"Adres"
        };

        checkContact(contact);
    })
})