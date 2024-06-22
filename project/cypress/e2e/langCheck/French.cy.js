import {checkContact, checkFunc, checkSpace, checkSpecs, checkObstacles} from "./Languagecheck.js";

describe("Checking text in French is correctly rendered", ()=>{
    beforeEach('visit application in Dutch', ()=>{
        cy.visit('', {
            onBeforeLoad(win) {
                Object.defineProperty(win.navigator, 'language', { value: 'fr-BE' });
                Object.defineProperty(win.navigator, 'languages', { value: ['fr'] });
                Object.defineProperty(win.navigator, 'accept_languages', { value: ['fr'] });
            },
            headers: {
                'Accept-Language': 'fr',
            },
        });  });

    it("Sidebar space", ()=>{
        let space={ q_dimensions: "Sélectionnez la forme de la pièce et entrez les dimensions", rectangular: "Rectangulaire", dimLength: "Longueur", dimWidth: "Largeur",
                dimHeight: "Hauteur", other: "Autres",
            q_space:"Quel espace de vie souhaitez-vous optimiser?",
            space:{
                guest_room:"Chambre d'amis",
                living_room:"Le salon",
                bedroom:"Chambre à coucher",
            },
            q_preferences: "Vous avez des préférences particulières pour l'aménagement de votre espace de vie?",
            preferences:{
                wall:"Mur",
                partition_wall:"Cloison",
                in_the_middle_of_space:"Au milieu de l'espace",
            }};

        checkSpace(space);
    });

    it("Sidebar Q1 (obstacles)",()=>{
        let obst={
            q_aspects:"Ajoutez les aspects que nous devons prendre en compte dans votre espace de vie",
            obstructions: { window:"Fenêtre", door:"Porte", radiator:"Radiateur", walloutlet:"Prise murale", switch:"Interrupteur", sloping_Wall:"Mur en pente", other:"Autre",
                q_door:{
                    opening_door:"Comment s'ouvre la porte ?",
                    inside_left:"A l'intérieur de la salle, à gauche",
                    inside_right:"A l'intérieur de la salle, à droite",
                    outside:"Espace extérieur"
                },
                q_window:{
                    opening_window:"La fenêtre peut-elle s'ouvrir vers l'intérieur ?",
                    yes:"oui",
                    no:"non"
                }}
        }
        checkObstacles(obst);
    } )
    it("Sidebar functional", ()=>{
        let functional={
            q_function:"Sélectionnez les fonctions nécessaires pour tirer le meilleur parti de votre espace de vie",
                functions:{
                bed:"Lit",
                    office_space:"Bureau",
                    sofa:"Canapé",
                    storage_space:"Espace de stockage",
            },
            bed: {
                q_bed: "Quel matelas préférez-vous?",
                    soft: "Extra doux",
                    medium: "Moyen",
                    sturdy: "Extra solide",
                    apply: "Non applicable"
            }
        }
        checkFunc(functional);
    });

    it("Sidebar specs", ()=>{
        let specs={
            q_materials: "Sélectionnez les finitions que vous préférez",
                materials:{
                white:"Blanc",
                    black:"Noir",
                    birch:"Bouleau",
                    oak:"Chêne",
                    walnut:"Noyer",
                    color: "Couleur",
                    material: "Matériau"
            },
            q_other:"Si vous avez d'autres exigences à prendre en compte, veuillez les indiquer ci-dessous"
        }
        checkSpecs(specs);
    });

    it("Sidebar contact", ()=>{
        let contact={   q_contact:"Laissez vos coordonnées afin que nous puissions vous joindre",
                        firstname:"Prénom",
                        lastname:"Nom de famille",
                        phone_number:"Numéro de téléphone",
                        email:"E-mail",
                        address:"Adresse"
            }

        checkContact(contact);
    })
})