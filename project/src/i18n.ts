import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';


i18n
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    .use(initReactI18next)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        resources: {
            en: {
                translation: {
                    greeting: {
                        hello: "Hello World!"
                    },
                    questionnaire_space: {
                        q_dimensions: "Select the shape of the room and enter the dimensions",
                        rectangular: "Rectangular",
                        length: "Length",
                        width: "Width",
                        height: "Height",
                        other: "Other",
                        q_aspects: "Add which aspects we should take into account in your living space",
                        aspect: "Aspect",
                        add_aspect: "Add aspect",
                        depth: "depth"
                    },
                    obstructions: {
                        window: "Window",
                        door: "Door",
                        radiator: "Radiator",
                        walloutlet: "Wall outlet",
                        switch: "Switch",
                        sloping_Wall: "Sloping wall",
                        light: "Light",
                        other: "Other",
                        q_all: {
                            dimensions: "Dimensions: ",
                            position: "Position in the room: ",
                            wall: "Select the correct wall",
                            front: "front",
                            back: "back",
                            left: "left",
                            right: "right",
                            up: "from the ground up",
                            side: "from the left side"
                        },
                        q_door: {
                            opening_door: "How does the door open?",
                            inside_left: "Inside the room, to the left",
                            inside_right: "Inside the room, to the right",
                            outside: "Outside the room"
                        },
                        q_window: {
                            opening_window: "Can the window open to the inside?",
                            yes: "yes",
                            no: "no",
                        },

                    },
                    questionnaire_func: {
                        q_space: "Which living space do you want to optimize?",
                        space: {
                            guest_room: "Guest room",
                            living_room: "Living room",
                            bedroom: "Bedroom",
                        },
                        q_function: "Select the functions needed to make the most of your living space",
                        functions: {
                            bed: "Bed",
                            office_space: "Office space",
                            sofa: "Sofa",
                            storage_space: "Storage space",
                        },
                        bed: {
                            q_size: "What is the width you would prefer?",
                            q_bed: "Which mattress do you prefer?",
                            soft: "Extra soft",
                            medium: "Medium",
                            sturdy: "Extra sturdy",
                            apply: "Not applicable"
                        }
                    },
                    questionnaire_specs: {
                        q_preferences: "Do you have specific preferences for the layout of your living space?",
                        preferences: {
                            wall: "Wall",
                            partition_wall: "Partition wall",
                            in_the_middle_of_space: "In the middle of space",
                        },
                        q_materials: "Select which finishes you prefer",
                        materials: {
                            color: "Color",
                            material: "Material",
                            white: "White",
                            black: "Black",
                            birch: "Birch",
                            oak: "Oak",
                            walnut: "Walnut"
                        },
                        q_other: "If there are any other requirements we need to consider, please fill them in below"
                    },
                    questionnaire_module: {
                        question: "Please press the button to discover which modules would fit you",
                        warning: "After changing any of the specifications, please press the button again",
                        button: "Find Modules",
                        error: {
                            softer: "Unable to find a module fitting the exact combination given, looking again with softer restrictions",
                            demands: "Unable to fulfill the demands, please give others",
                            roomSize: "The dimensions of the room are to small with the given demands",
                            points2D: "When choosing 'other', please draw the points on the 2D"
                        },
                        module_type: {
                            //names kept dutch to use name given in csv
                            opklapbed: "Bed",
                            opklapbed_zetel: "Bed Sofa",
                            bureau: "Desk",
                            kast_zij: "Closet Side Shelfs ",
                            kast: "Closet",
                            bureau_bedm: "Desk Bed",
                            kast_bedm: "Closet Bed",
                            kast_kastm: "Double Closet",
                            bureau_kastm: "Desk Closet",
                            bureaum_bedm_kast: "Desk Bed Closet",
                            bureaum_kastm_kast: "Desk Double Closet",
                            bureaum_bedm_kastm_kast: "Desk Bed Double Closet",
                            kastm_bedm_kastm_kast: "Bed Triple Closet"
                        },
                        module_info: {
                            rotate: "Rotate 90°",
                            name: "Name: ",
                            width: "Width: ",
                            height: "Height: ",
                            closed: "Closed: ",
                            open: "Open: ",
                            components: "Components: ",
                            saved: "Saved space: ",
                            intersection: "Check overlap"

                        },
                        components: {
                            opkladbed: "stationary foldable bed",
                            zetel: "stationary sofa",
                            bureau: "stationary desk",
                            kast_met_zijschappen: "stationary closet with side spaces",
                            kast: "stationary closet",
                            bed_bewegend: "movable bed",
                            kast_bewegend: "movable closet",
                            bureau_bewegend: "movable desk",
                            tweede_kast_bewegend: "second movable closet"
                        }

                    },
                    contact: {
                        q_contact: "Leave your contact details so we can reach you",
                        firstname: "First name",
                        lastname: "Last name",
                        phone_number: "Phone number",
                        email: "E-mail",
                        address: "House number and Street name",
                        postcode: "Zip code",
                        city: "City",
                        country: "Country",
                        submit: "Submit"
                    },
                    alert: {
                        no: "No overlap detected",
                        yes: "Overlap detected",
                        adjust: "Please adjust the configuration to avoid overlap.",
                        proceed: "You can proceed with the configuration",
                        again: "Please check again when you make changes to the previous configuration."
                    },
                    privacy: {
                        title:"Privacy policy",
                        intro:"The information you fill in is collected and processed by us through various services. See below for more information.",
                        pol:"The information you fill in the form and the position of the module in the 3D space are stored in a MongoDB database. The rest of Furnify's privacy policy can be found  ",
                        here: "here",
                        mailchimp:"You can unsubscribe from our mailchimp campaign at any time by sending a mail to info@furnifyhome.eu.",
                        disclaimer1: "We use Mailchimp as our marketing platform. By clicking below to subscribe, you acknowledge that your information will be transferred to Mailchimp for processing. ",
                        learn:"Learn more",
                        disclaimer2: " about Mailchimp's privacy practices.",
                        close: "Close",
                        privacy: "Privacy"
                    },
                    floorplan: {
                        slider: "Grid size",
                        height: "Height",
                        backto: "Going back to 2D will remove all 3D objects. Do you want to continue?",
                        titleConverted3D:"The 2D to 3D conversion is still in development.",
                        convertedTo3D: "The 3D model here doesn't yet have the same functionality as the rectangular 3D model. \n(Adding modules and obstacles)",
                        drawingMode: "Toggle Drawing Mode",
                        remove: "Remove All",
                        orthogonalMode: "Toggle Orthogonal Mode",
                        reset: "Reset View",
                        grid: "Toggle Grid and Snapping"
                    },
                    modal:{
                        close: "Close",
                        confirm: "Confirm",
                        cancel: "Cancel"
                    }
                }
            },
            nl: {
                translation: {
                    greeting: {
                        hello: "Hallo Wereld!"
                    },
                    questionnaire_space: {
                        q_dimensions: "Selecteer de vorm van de ruimte en geef de afmetingen in",
                        rectangular: "Rechthoekig",
                        length: "Lengte",
                        width: "Breedte",
                        height: "Hoogte",
                        other: "Anders",
                        q_aspects: "Voeg toe met welke aspecten we rekening moeten houden in uw woonruimte",
                        aspect: "Aspect",
                        add_aspect: "Voeg een aspect toe"
                    },
                    obstructions: {

                        window: "Raam",
                        door: "Deur",
                        radiator: "Radiator",
                        walloutlet: "Stopcontact",
                        switch: "Schakelaar",
                        sloping_Wall: "Schuine wand",
                        light: "Licht",
                        other: "Andere",
                        q_all: {
                            dimensions: "Afmetingen: ",
                            position: "Positie in de kamer: ",
                            wall: "Selecteer de juiste muur",
                            front: "voor",
                            back: "achter",
                            left: "links",
                            right: "rechts",
                            up: "vanaf de grond",
                            side: "vanaf de linkerkant"
                        },
                        q_door: {
                            opening_door: "Hoe opent de deur?",
                            inside_left: "Binnen in de ruimte, naar links",
                            inside_right: "Binnen in de ruimte, naar rechts",
                            outside: "Buiten de ruimte"
                        },
                        q_window: {
                            opening_window: "Kan het raam naar binnen openen?",
                            yes: "ja",
                            no: "nee"
                        }
                    },
                    questionnaire_func: {
                        q_space: "Welke woonruimte wenst u te optimaliseren?",
                        space: {
                            guest_room: "Logeerkamer",
                            living_room: "Woonkamer",
                            bedroom: "Slaapkamer",
                        },
                        q_function: "Selecteer de functies die nodig zijn om uw woonruimte optimaal te benutten",
                        functions: {
                            bed: "Bed",
                            office_space: "Bureauruimte",
                            sofa: "Sofa",
                            storage_space: "Opbergruimte",
                        },
                        bed: {
                            q_size: "Welke breedte verkiest u?",
                            q_bed: "Welke matras verkiest u?",
                            soft: "Extra zacht",
                            medium: "Medium",
                            sturdy: "Extra stevig",
                            apply: "Niet van toepassing"
                        }
                    },
                    questionnaire_specs: {
                        q_preferences: "Heeft u specifieke voorkeuren voor de indeling van uw woonruimte?",
                        preferences: {
                            wall: "Muur",
                            partition_wall: "Scheidingswand",
                            in_the_middle_of_space: "Te midden van ruimte",
                        },
                        q_materials: "Selecteer welke afwerkingen u verkiest",
                        materials: {
                            color: "kleur",
                            material: "materiaal",
                            white: "Wit",
                            black: "Zwart",
                            birch: "Berk",
                            oak: "Eik",
                            walnut: "Notelaar"
                        },
                        q_other: "Indien er nog andere vereisten zijn waarmee we rekening moeten houden, vul deze hieronder in"
                    },
                    questionnaire_module: {
                        question: "Druk op de knop om te ontdekken welke modules bij u passen",
                        warning: "Nadat u een van de specificaties hebt gewijzigd, drukt u nogmaals op de knop",
                        button: "Modules zoeken",
                        error: {
                            softer: "Kan geen module vinden die precies past bij de opgegeven combinatie, zoek opnieuw met zachtere beperkingen",
                            demands: "Niet in staat om aan de eisen te voldoen, geef andere op",
                            roomSize: "De afmetingen van de kamer zijn te klein voor de opgegeven eisen",
                            points2D: "Als u 'andere' kiest, teken dan de punten op de 2D"
                        },
                        module_type: {
                            //names kept dutch to use name given in csv
                            opklapbed: "Bed",
                            opklapbed_zetel: "Bed Zetel",
                            bureau: "Bureau",
                            kast_zij: "Kast Zijplanken",
                            kast: "Kast",
                            bureau_bedm: "Bureau Bed",
                            kast_bedm: "Kast Bed",
                            kast_kastm: "Dubbele kast",
                            bureau_kastm: "Bureau Kast",
                            bureaum_bedm_kast: "Bureau Bed Kast",
                            bureaum_kastm_kast: "Bureau dubbele kast",
                            bureaum_bedm_kastm_kast: "Bureau Bed Dubbele Kast",
                            kastm_bedm_kastm_kast: "Bed Drievoudig Kast"
                        },
                        module_info: {
                            rotate: "Draai 90°",
                            name: "Naam: ",
                            width: "Breedte: ",
                            height: "Hoogte: ",
                            closed: "Gesloten: ",
                            open: "Open: ",
                            components: "Onderdelen: ",
                            saved: "Bespaarde ruimte: ",
                            intersection: "Controleer overlap"

                        },
                        components: {
                            opkladbed: "stationair opklapbed",
                            zetel: "stationaire zetel",
                            bureau: "vaste bureau",
                            kast_met_zijschappen: "vaste kast met zijschappen",
                            kast: "vaste kast",
                            bed_bewegend: "bewegend bed",
                            kast_bewegend: "bewegend kast",
                            bureau_bewegend: "bewegend bureau",
                            tweede_kast_bewegend: "tweede bewegend kast"
                        }

                    },
                    contact: {
                        q_contact: "Laat uw contactgegevens achter zodat we u kunnen bereiken",
                        firstname: "Voornaam",
                        lastname: "Achternaam",
                        phone_number: "Telefoonnummer",
                        email: "E-mail",
                        address: "Straat en huisnummer",
                        postcode: "Postcode",
                        city: "Stad",
                        country: "Land",
                        submit: "Verzend"
                    },
                    alert: {
                        no: "Geen overlap gedetecteerd",
                        yes: "Overlap gedetecteerd",
                        adjust: "Pas de configuratie aan om overlap te voorkomen.",
                        proceed: "U kunt doorgaan met de configuratie",
                        again: "Controleer dit opnieuw wanneer u wijzigingen aanbrengt in de vorige configuratie."
                    },
                    privacy: {
                        intro:"De informatie die u invult, wordt door ons verzameld en verwerkt via verschillende diensten. Zie hieronder voor meer informatie.",
                        pol:"De informatie die u invult op het formulier en de positie van de module in de 3D ruimte worden opgeslagen in een MongoDB database. De rest van Furnify's privacy policy vind u ",
                        here: "hier",
                        mailchimp:"U kunt u op elk gewenst moment afmelden voor onze mailchimp-campagne door een mail te sturen naar info@furnifyhome.eu.",
                        disclaimer1: "We gebruiken Mailchimp als ons marketingplatform. Door u hieronder in te schrijven, gaat u ermee akkoord dat uw gegevens worden overgedragen aan Mailchimp voor verwerking. ",
                        learn:"Meer informatie",
                        disclaimer2: " over de privacypraktijken van Mailchimp.",
                        title:"Privacybeleid",
                        close:"Sluiten",
                        privacy: "Privacy"
                    },
                    floorplan: {
                        slider: "Rastergrootte",
                        height: "Hoogte",
                        backto: "Teruggaan naar 2D verwijdert alle 3D-objecten. Wil je doorgaan?",
                        titleConverted3D:"De conversie van 2D naar 3D is nog in ontwikkeling.",
                        convertedTo3D: "Het 3D-model hier heeft nog niet dezelfde functionaliteit als het rechthoekige 3D-model. \n(Modules en obstakels toevoegen)",
                        drawingMode: "Teken Modus Wisselen",
                        remove: "Alles Verwijderen",
                        orthogonalMode: "Orthogonale Modus Wisselen",
                        reset: "Weergave Resetten",
                        grid: "Raster en Snappen Wisselen"
                    },
                modal:{
                    close: "Sluiten",
                    confirm: "Bevestigen",
                    cancel: "Annuleren"
                }

                }
            },
            fr: {
                translation: {
                    greeting: {
                        hello: "Bonjour le monde!"
                    },
                    questionnaire_space: {
                        q_dimensions: "Sélectionnez la forme de la pièce et entrez les dimensions",
                        rectangular: "Rectangulaire",
                        length: "Longueur",
                        width: "Largeur",
                        height: "Hauteur",
                        other: "Autres",
                        q_aspects: "Ajoutez les aspects que nous devons prendre en compte dans votre espace de vie",
                        aspect: "Aspect",
                        add_aspect: "Ajouter un aspect"
                    },
                    obstructions: {
                        window: "Fenêtre",
                        door: "Porte",
                        radiator: "Radiateur",
                        walloutlet: "Prise murale",
                        switch: "Interrupteur",
                        sloping_Wall: "Mur en pente",
                        light: "Lumière",
                        other: "Autre",
                        q_all: {
                            dimensions: "Dimensions: ",
                            position: "Position dans la pièce: ",
                            wall: "Choisir le mur correct",
                            front: "avant",
                            back: "arrière",
                            left: "gauche",
                            right: "droite",
                            up: "du sol vers le haut",
                            side: "du côté gauche"
                        },
                        q_door: {
                            opening_door: "Comment s'ouvre la porte ?",
                            inside_left: "A l'intérieur de la salle, à gauche",
                            inside_right: "A l'intérieur de la salle, à droite",
                            outside: "Espace extérieur"
                        },
                        q_window: {
                            opening_window: "La fenêtre peut-elle s'ouvrir vers l'intérieur ?",
                            yes: "oui",
                            no: "non"
                        }
                    },
                    questionnaire_func: {
                        q_space: "Quel espace de vie souhaitez-vous optimiser?",
                        space: {
                            guest_room: "Chambre d'amis",
                            living_room: "Le salon",
                            bedroom: "Chambre à coucher",
                        },
                        q_function: "Sélectionnez les fonctions nécessaires pour tirer le meilleur parti de votre espace de vie",
                        functions: {
                            bed: "Lit",
                            office_space: "Bureau",
                            sofa: "Canapé",
                            storage_space: "Espace de stockage",
                        },
                        bed: {
                            q_size: "Quelle est la largeur que vous préférez ?",
                            q_bed: "Quel matelas préférez-vous?",
                            soft: "Extra doux",
                            medium: "Moyen",
                            sturdy: "Extra solide",
                            apply: "Non applicable"
                        }
                    },
                    questionnaire_specs: {
                        q_preferences: "Vous avez des préférences particulières pour l'aménagement de votre espace de vie?",
                        preferences: {
                            wall: "Mur",
                            partition_wall: "Cloison",
                            in_the_middle_of_space: "Au milieu de l'espace",
                        },
                        q_materials: "Sélectionnez les finitions que vous préférez",
                        materials: {
                            white: "Blanc",
                            black: "Noir",
                            birch: "Bouleau",
                            oak: "Chêne",
                            walnut: "Noyer",
                            color: "Couleur",
                            material: "Matériau"
                        },
                        q_other: "Si vous avez d'autres exigences à prendre en compte, veuillez les indiquer ci-dessous"
                    },
                    questionnaire_module: {
                        question: "Cliquez sur le bouton pour découvrir les modules qui vous conviennent.",
                        warning: "Après avoir modifié l'une des spécifications, veuillez appuyer à nouveau sur le bouton.",
                        button: "Trouver des modules",
                        error: {
                            softer: "Impossible de trouver un module correspondant à la combinaison exacte donnée, cherchez à nouveau avec des restrictions plus souples",
                            demands: "Impossible de répondre aux demandes, veuillez en donner d'autres",
                            roomSize: "Les dimensions de la pièce sont trop petites pour les exigences données.",
                            points2D: "Lorsque vous choisissez 'autre', veuillez dessiner les points sur le 2D"
                        },
                        module_type: {
                            //names kept dutch to use name given in csv
                            opklapbed: "Lit",
                            opklapbed_zetel: "Lit Canapé",
                            bureau: "Bureau",
                            kast_zij: "Placard Étagères latérales",
                            kast: "Placard",
                            bureau_bedm: "Bureau Lit",
                            kast_bedm: "Placard Lit",
                            kast_kastm: "Double Placard",
                            bureau_kastm: "Bureau Placard",
                            bureaum_bedm_kast: "Bureau Lit Placard",
                            bureaum_kastm_kast: "Bureau Double Placard",
                            bureaum_bedm_kastm_kast: "Bureau Lit Double Placard",
                            kastm_bedm_kastm_kast: "Lit Triple Placard"
                        },
                        module_info: {
                            rotate: "Rotation de 90°",
                            name: "Nom: ",
                            width: "Largeur: ",
                            height: "Hauteur: ",
                            closed: "Fermé: ",
                            open: "Ouvert: ",
                            components: "Composants: ",
                            saved: "Espace économisé : ",
                            intersection: "Vérifier le chevauchement"

                        },
                        components: {
                            opkladbed: "lit fixe pliable",
                            zetel: "canapé fixe",
                            bureau: "bureau fixe",
                            kast_met_zijschappen: "armoire fixe avec espaces latéraux",
                            kast: "armoire fixe",
                            bed_bewegend: "lit mobile",
                            kast_bewegend: "armoire mobile",
                            bureau_bewegend: "bureau mobile",
                            tweede_kast_bewegend: "deuxième placard mobile"
                        }

                    },
                    contact: {
                        q_contact: "Laissez vos coordonnées afin que nous puissions vous joindre",
                        firstname: "Prénom",
                        lastname: "Nom de famille",
                        phone_number: "Numéro de téléphone",
                        email: "E-mail",
                        address: "Numéro de maison et rue",
                        postcode: "Code postal",
                        city: "Ville",
                        country: "Pays",
                        submit: "Soumettre"
                    },
                    alert: {
                        no: "Aucun chevauchement détecté",
                        yes: "Chevauchement détecté",
                        adjust: "Veuillez ajuster la configuration pour éviter les chevauchements.",
                        proceed: "Vous pouvez procéder à la configuration",
                        again: "Veuillez vérifier à nouveau si vous apportez des modifications à la configuration précédente."
                    },
                    privacy: {
                        title:"Politique de confidentialité",
                        intro:"Les informations que vous remplissez sont collectées et traitées par nos soins par le biais de différents services. Voir ci-dessous pour plus d'informations.",
                        pol:"Les informations que vous remplissez dans le formulaire et la position du module dans l'espace 3D sont stockées dans une base de données MongoDB. Le reste de la politique de confidentialité de Furnify est disponible ",
                        here: "ici",
                        mailchimp:"YVous pouvez vous désinscrire de notre campagne mailchimp à tout moment en envoyant un courrier à info@furnifyhome.eu.",
                        disclaimer1: "Nous utilisons Mailchimp comme plateforme de marketing. En cliquant ci-dessous pour vous inscrire, vous reconnaissez que vos informations seront transférées à Mailchimp pour traitement. ",
                        learn:"En savoir plus",
                        disclaimer2: " sur les pratiques de Mailchimp en matière de protection de la vie privée.",
                        close: "Fermer",
                        privacy: "Confidentialité"
                    },
                    floorplan: {
                        slider: "Taille de la grille",
                        height: "Hauteur",
                        backto: "Revenir en 2D supprimera tous les objets 3D. Voulez-vous continuer ?",
                        titleConverted3D:"La conversion de 2D à 3D est encore en développement.",
                        convertedTo3D: "Le modèle 3D ici n'a pas encore les mêmes fonctionnalités que le modèle 3D rectangulaire. \n(Ajout de modules et d'obstacles)",
                        drawingMode: "Basculer en mode dessin",
                        remove: "Tout supprimer",
                        orthogonalMode: "Basculer en mode orthogonal",
                        reset: "Réinitialiser la vue",
                        grid: "Basculer la grille et l'accrochage"
                    },
                    modal:{
                        close: "Fermer",
                        confirm: "Confirmer",
                        cancel: "Annuler"
                    }
                }
            },
            de: {
                translation: {
                    greeting: {
                        hello: "Hallo Welt!"
                    },
                    questionnaire_space: {
                        q_dimensions: "Wählen Sie die Form des Raumes und geben Sie die Maße ein",
                        rectangular: "Rechteckig",
                        length: "Länge",
                        width: "Breite",
                        height: "Höhe",
                        other: "Andere",
                        q_aspects: "Fügen Sie hinzu, welche Aspekte wir in Ihrem Wohnraum berücksichtigen sollten",
                        aspect: "Aspekt",
                        add_aspect: "Aspekt hinzufügen"
                    },
                    obstructions: {
                        window: "Fenster",
                        door: "Tür",
                        radiator: "Heizkörper",
                        walloutlet: "Steckdose",
                        switch: "Schalter",
                        sloping_Wall: "Schräge Wand",
                        light: "Licht",
                        other: "Andere",
                        q_all: {
                            dimensions: "Abmessungen: ",
                            position: "Position im Raum: ",
                            wall: "Wählen Sie die richtige Wand",
                            front: "Vorderseite",
                            back: "hinten",
                            left: "links",
                            right: "rechts",
                            up: "von unten nach oben",
                            side: "von der linken Seite"
                        },
                        q_door: {
                            opening_door: "Wie wird die Tür geöffnet?",
                            inside_left: "Im Inneren des Raums, links",
                            inside_right: "Im Inneren des Raums, rechts",
                            outside: "außerhalb des Raumes"
                        },
                        q_window: {
                            opening_window: "Kann man das Fenster nach innen öffnen?",
                            yes: "ja",
                            no: "nein"
                        }
                    },
                    questionnaire_func: {
                        q_space: "Welchen Wohnraum möchten Sie optimieren?",
                        space: {
                            guest_room: "Gästezimmer",
                            living_room: "Wohnzimmer",
                            bedroom: "Schlafzimmer",
                        },
                        q_function: "Wählen Sie die Funktionen, die Sie benötigen, um Ihren Lebensraum optimal zu nutzen",
                        functions: {
                            bed: "Bett",
                            office_space: "Bürofläche",
                            sofa: "Sofa",
                            storage_space: "Stauraum",
                        },
                        bed: {
                            q_size: "Welche Breite würden Sie bevorzugen? ",
                            q_bed: "Welche Matratze bevorzugen Sie?",
                            soft: "Extra weich",
                            medium: "Mittel",
                            sturdy: "Extra fest",
                            apply: "Nicht anwendbar"
                        }
                    },
                    questionnaire_specs: {
                        q_preferences: "Haben Sie spezielle Vorlieben für die Gestaltung Ihres Wohnraums?",
                        preferences: {
                            wall: "Wand",
                            partition_wall: "Trennwand",
                            in_the_middle_of_space: "In der Mitte des Raums",
                        },
                        q_materials: "Wählen Sie aus, welche Oberflächen Sie bevorzugen",
                        materials: {
                            white: "Weiß",
                            black: "Schwarz",
                            birch: "Birke",
                            oak: "Eiche",
                            walnut: "Walnuss",
                            color: "Farbe",
                            material: "Material"
                        },
                        q_other: "Wenn es weitere Anforderungen gibt, die wir berücksichtigen müssen, tragen Sie diese bitte unten ein"
                    },
                    questionnaire_module: {
                        question: "Bitte drücken Sie den Knopf, um herauszufinden, welche Module für Sie geeignet sind.",
                        warning: "Wenn Sie eine der Spezifikationen geändert haben, drücken Sie bitte erneut auf die Schaltfläche",
                        button: "Module finden",
                        error: {
                            softer: "Sie können kein Modul finden, das genau auf die angegebene Kombination passt, suchen Sie noch einmal mit geringeren Einschränkungen",
                            demands: "Sie können die Anforderungen nicht erfüllen, bitte geben Sie andere an",
                            roomSize: "Die Abmessungen des Raumes sind zu klein für die angegebenen Anforderungen",
                            points2D: "Wenn Sie 'andere' wählen, zeichnen Sie bitte die Punkte auf dem 2D"
                        },
                        module_type: {
                            //names kept dutch to use name given in csv
                            opklapbed: "Bett",
                            opklapbed_zetel: "Bett Sofa",
                            bureau: "Schreibtisch",
                            kast_zij: "Kleiderschrank Seitenregale",
                            kast: "Schrank",
                            bureau_bedm: "Schreibtisch Bett",
                            kast_bedm: "Schrank Bett",
                            kast_kastm: "Doppelter Kleiderschrank",
                            bureau_kastm: "Schreibtisch-Schrank",
                            bureaum_bedm_kast: "Schreibtisch-Bett-Schrank",
                            bureaum_kastm_kast: "Schreibtisch Double Closet",
                            bureaum_bedm_kastm_kast: "Schreibtisch Bett Double Closet",
                            kastm_bedm_kastm_kast: "Bett Triple Closet"
                        },
                        module_info: {
                            rotate: "90° drehen",
                            name: "Name: ",
                            width: "Breite: ",
                            height: "Höhe: ",
                            closed: "Geschlossen: ",
                            open: "Offen: ",
                            components: "Bestandteile: ",
                            saved: "Platzsparend: ",
                            intersection: "Überlappung prüfen"

                        },
                        components: {
                            opkladbed: "stationäres klappbares Bett",
                            zetel: "stationäres Sofa",
                            bureau: "stationärer Schreibtisch",
                            kast_met_zijschappen: "stationärer Kleiderschrank mit Seitenräumen",
                            kast: "stationärer Schrank",
                            bed_bewegend: "bewegliches Bett",
                            kast_bewegend: "beweglicher Schrank",
                            bureau_bewegend: "beweglicher Schreibtisch",
                            tweede_kast_bewegend: "zweiter beweglicher Schrank"
                        }

                    },
                    contact: {
                        q_contact: "Hinterlassen Sie Ihre Kontaktdaten, damit wir Sie erreichen können",
                        firstname: "Vorname",
                        lastname: "Nachname",
                        phone_number: "Telefonnummer",
                        email: "E-Mail",
                        address: "Straße und Hausnummer",
                        postcode: "Postleitzahl",
                        city: "Stadt",
                        country: "Land",
                        submit: "Einreichen"
                    },
                    alert: {
                        no: "Keine Überschneidung festgestellt",
                        yes: "Überschneidung erkannt",
                        adjust: "Bitte passen Sie die Konfiguration an, um Überschneidungen zu vermeiden.",
                        proceed: "Sie können mit der Konfiguration fortfahren",
                        again: "Bitte überprüfen Sie dies erneut, wenn Sie Änderungen an der vorherigen Konfiguration vornehmen."
                    },
                    privacy: {
                        title:"Datenschutzrichtlinie",
                        intro:"Die von Ihnen eingegebenen Informationen werden von uns über verschiedene Dienste gesammelt und verarbeitet. Siehe unten für weitere Informationen.",
                        pol:"Die Informationen, die Sie in das Formular eingeben, und die Position des Moduls im 3D-Raum werden in einer MongoDB-Datenbank gespeichert. Den Rest der Furnify-Datenschutzrichtlinie finden Sie ",
                        here: "hier",
                        mailchimp:"Sie können sich jederzeit von unserer Mailchimp-Kampagne abmelden, indem Sie eine E-Mail an info@furnifyhome.eu senden.",
                        disclaimer1: "Wir verwenden Mailchimp als unsere Marketingplattform. Wenn Sie unten klicken, um sich anzumelden, erklären Sie sich damit einverstanden, dass Ihre Daten zur Verarbeitung an Mailchimp übermittelt werden. ",
                        learn:"Erfahren Sie mehr",
                        disclaimer2: " über die Datenschutzpraktiken von Mailchimp.",
                        privacy:"Datenschutz",
                        close:"Schließen"
                    },
                    floorplan: {
                        slider: "Rastergröße",
                        height: "Höhe",
                        backto: "Das Zurückkehren zu 2D entfernt alle 3D-Objekte. Möchten Sie fortfahren?",
                        titleConverted3D:"Die Umwandlung von 2D zu 3D befindet sich noch in der Entwicklung.",
                        convertedTo3D: "Das 3D-Modell hier hat noch nicht die gleichen Funktionen wie das rechteckige 3D-Modell. \n(Hinzufügen von Modulen und Hindernissen)",
                        drawingMode: "Zeichenmodus umschalten",
                        remove: "Alles entfernen",
                        orthogonalMode: "Orthogonalen Modus umschalten",
                        reset: "Ansicht zurücksetzen",
                        grid: "Raster und Einrasten umschalten"
                    },
                    modal:{
                        close: "Schließen",
                        confirm: "Bestätigen",
                        cancel: "Abbrechen"
                    }
                }
            },
            es: {
                translation: {
                    greeting: {
                        hello: "¡Hola Mundo!"
                    },
                    questionnaire_space: {
                        q_dimensions: "Seleccione la forma de la habitación e introduzca las dimensiones",
                        rectangular: "Rectangular",
                        length: "Longitud",
                        width: "Ancho",
                        height: "Altura",
                        other: "Otro",
                        q_aspects: "Agrega qué aspectos debemos tener en cuenta en tu espacio habitable",
                        aspect: "Aspecto",
                        add_aspect: "Agregar aspecto"
                    },
                    obstructions: {
                        window: "Ventana",
                        door: "Puerta",
                        radiator: "Radiador",
                        walloutlet: "Enchufe de pared",
                        switch: "Interruptor",
                        sloping_Wall: "Pared inclinada",
                        light: "Luz",
                        other: "Otro",
                        q_all: {
                            dimensions: "Dimensiones: ",
                            position: "Posición en la habitación: ",
                            wall: "Seleccione la pared correcta",
                            front: "delante",
                            back: "trasera",
                            left: "izquierda",
                            right: "derecha",
                            up: "desde el suelo hacia arriba",
                            side: "desde el lado izquierdo"
                        },
                        q_door: {
                            opening_door: "cómo abrir la puerta",
                            inside_left: "dentro de la habitación, a la izquierda",
                            inside_right: "dentro de la habitación, a la derecha",
                            outside: "espacio exterior"
                        },
                        q_window: {
                            opening_window: "¿Puede abrirse la ventana hacia el interior?",
                            yes: "si",
                            no: "no"
                        }
                    },
                    questionnaire_func: {
                        q_space: "¿Qué espacio habitable deseas optimizar?",
                        space: {
                            guest_room: "Habitación de invitados",
                            living_room: "Sala de estar",
                            bedroom: "Dormitorio",
                        },
                        q_function: "Seleccione las funciones necesarias para aprovechar al máximo su espacio vital",
                        functions: {
                            bed: "Cama",
                            office_space: "Espacio de oficina",
                            sofa: "Sofá",
                            storage_space: "Espacio de almacenamiento",
                        },
                        bed: {
                            q_size: "¿Cuál es la anchura que prefiere?",
                            q_bed: "¿Qué colchón prefieres?",
                            soft: "Extra suave",
                            medium: "Medio",
                            sturdy: "Extra firme",
                            apply: "No aplicable"
                        }
                    },
                    questionnaire_specs: {
                        q_preferences: "¿Tienes preferencias específicas para la distribución de tu espacio habitable?",
                        preferences: {
                            wall: "Pared",
                            partition_wall: "Pared divisoria",
                            in_the_middle_of_space: "En el medio del espacio",
                        },
                        q_materials: "Seleccione los acabados que prefiera",
                        materials: {
                            white: "Blanco",
                            black: "Negro",
                            birch: "Birch",
                            oak: "Roble",
                            walnut: "Nogal",
                            color: "Color",
                            material: "Material"
                        },
                        q_other: "Si hay algún otro requisito que debamos tener en cuenta, indíquelo a continuación"
                    },
                    questionnaire_module: {
                        question: "Pulse el botón para descubrir qué módulos le convienen.",
                        warning: "Si desea cambiar alguna de las especificaciones, vuelva a pulsar el botón",
                        button: "Encontrar módulos",
                        error: {
                            softer: "Al no poder encontrar un módulo que se ajuste a la combinación exacta dada, busque de nuevo con restricciones más suaves",
                            demands: "No se puede cumplir con las demandas, por favor, dar otros",
                            roomSize: "Las dimensiones de la habitación son demasiado pequeñas para los requisitos indicados.",
                            points2D: "Cuando elija 'otros', por favor dibuje los puntos en el 2D"
                        },
                        module_type: {
                            //names kept dutch to use name given in csv
                            opklapbed: "Cama",
                            opklapbed_zetel: "Cama Sofá",
                            bureau: "Escritorio",
                            kast_zij: "Armario Estantes laterales",
                            kast: "Armario",
                            bureau_bedm: "Escritorio Cama",
                            kast_bedm: "Armario Cama",
                            kast_kastm: "Armario Doble",
                            bureau_kastm: "Armario Escritorio",
                            bureaum_bedm_kast: "Escritorio Cama Armario",
                            bureaum_kastm_kast: "Escritorio Armario Doble",
                            bureaum_bedm_kastm_kast: "Escritorio Cama Doble Armario",
                            kastm_bedm_kastm_kast: "Cama Triple Armario"
                        },
                        module_info: {
                            rotate: "Girar 90",
                            name: "Nombre: ",
                            width: "Anchura: ",
                            height: "Alto: ",
                            closed: "Cerrado: ",
                            open: "Abierto: ",
                            components: "Componentes: ",
                            saved: "Espacio libre: ",
                            intersection: "Comprobar solapamiento"

                        },
                        components: {
                            opkladbed: "cama plegable estacionaria",
                            zetel: "sofá fijo",
                            bureau: "escritorio fijo",
                            kast_met_zijschappen: "armario fijo con espacios laterales",
                            kast: "armario fijo",
                            bed_bewegend: "cama móvil",
                            kast_bewegend: "armario móvil",
                            bureau_bewegend: "escritorio móvil",
                            tweede_kast_bewegend: "segundo armario móvil"
                        }

                    },
                    contact: {
                        q_contact: "Deja tus datos de contacto para que podamos comunicarnos contigo",
                        firstname: "Nombre",
                        lastname: "Apellido",
                        phone_number: "Número de teléfono",
                        email: "Correo electrónico",
                        address: "Calle y número de casa",
                        postcode: "Código postal",
                        city: "Ciudad",
                        country: "País",
                        submit: "Enviar"
                    },
                    alert: {
                        no: "No se detectan solapamientos",
                        yes: "Solapamiento detectado",
                        adjust: "Por favor, ajuste la configuración para evitar solapamientos.",
                        proceed: "Puede proceder a la configuración",
                        again: "Vuelva a comprobarlo cuando realice cambios en la configuración anterior."
                    },
                    privacy: {
                        title:" Política de privacidad",
                        intro:"La información que usted rellena es recogida y procesada por nosotros a través de varios servicios. Consulte a continuación para obtener más información.",
                        pol:"La información que rellenas en el formulario y la posición del módulo en el espacio 3D se almacenan en una base de datos MongoDB. El resto de la política de privacidad de Furnify se puede encontrar ",
                        here: "aquí",
                        mailchimp:"Puede darse de baja de nuestra campaña de mailchimp en cualquier momento enviando un correo a info@furnifyhome.eu.",
                        disclaimer1: "Utilizamos Mailchimp como plataforma de marketing. Al hacer clic a continuación para suscribirse, usted reconoce que su información será transferida a Mailchimp para su procesamiento. ",
                        learn:"Más información",
                        disclaimer2: " sobre las prácticas de privacidad de Mailchimp.",
                        privacy: "Privacidad",
                        close: "Cerrar"
                    },
                    floorplan: {
                        slider: "Tamaño de la cuadrícula",
                        height: "Altura",
                        backto: "Volver a 2D eliminará todos los objetos 3D. ¿Quieres continuar?",
                        titleConverted3D:"La conversión de 2D a 3D aún está en desarrollo.",
                        convertedTo3D: "El modelo 3D aquí no tiene todavía las mismas funcionalidades que el modelo 3D rectangular. \n(Añadir módulos y obstáculos)",
                        drawingMode: "Alternar modo de dibujo",
                        remove: "Eliminar todo",
                        orthogonalMode: "Alternar modo ortogonal",
                        reset: "Restablecer vista",
                        grid: "Alternar cuadrícula y ajuste"
                    },
                    modal:{
                        close: "Cerrar",
                        confirm: "Confirmar",
                        cancel: "Cancelar"
                    }
                }
            },
            it: {
                translation: {
                    greeting: {
                        hello: "Ciao Mondo!"
                    },
                    questionnaire_space: {
                        q_dimensions: "Selezionate la forma della stanza e inserite le dimensioni",
                        rectangular: "Rettangolare",
                        length: "Lunghezza",
                        width: "Larghezza",
                        height: "Altezza",
                        other: "Altro",
                        q_aspects: "Aggiungi quali aspetti dovremmo considerare nel tuo spazio abitativo",
                        aspect: "Aspetto",
                        add_aspect: "Aggiungi aspetto"
                    },
                    obstructions: {
                        window: "Finestra",
                        door: "Porta",
                        radiator: "Termosifone",
                        walloutlet: "Presa di corrente a parete",
                        switch: "Interruttore",
                        sloping_Wall: "Muro inclinato",
                        light: "Luce",
                        other: "Altro",
                        q_all: {
                            dimensions: "Dimensioni: ",
                            position: "Posizione nella stanza: ",
                            wall: "Selezionare la parete corretta",
                            front: "anteriore",
                            back: "posteriore",
                            left: "sinistra",
                            right: "destra",
                            up: "dal basso verso l'alto",
                            side: "dal lato sinistro"
                        },
                        q_door: {
                            opening_door: "Come funziona l'impianto?",
                            inside_left: "All'interno della stanza, a sinistra",
                            inside_right: "All'interno della stanza, a destra",
                            outside: "fuori dalla stanza"
                        },
                        q_window: {
                            opening_window: "La finestra può aprirsi all'interno?",
                            yes: "si",
                            no: "no"
                        }
                    },
                    questionnaire_func: {
                        q_space: "Quale spazio abitativo desideri ottimizzare?",
                        space: {
                            guest_room: "Stanza degli ospiti",
                            living_room: "Soggiorno",
                            bedroom: "Camera da letto",
                        },
                        q_function: "Selezionate le funzioni necessarie per sfruttare al meglio il vostro spazio abitativo",
                        functions: {
                            bed: "Letto",
                            office_space: "Spazio ufficio",
                            sofa: "Divano",
                            storage_space: "Spazio di archiviazione",
                        },
                        bed: {
                            q_size: "Qual è la larghezza che preferite?",
                            q_bed: "Quale materasso preferisci?",
                            soft: "Extra morbido",
                            medium: "Medio",
                            sturdy: "Extra robusto",
                            apply: "Non applicabile"
                        }
                    },
                    questionnaire_specs: {
                        q_preferences: "Hai preferenze specifiche per la disposizione del tuo spazio abitativo?",
                        preferences: {
                            wall: "Muro",
                            partition_wall: "Muro divisorio",
                            in_the_middle_of_space: "In mezzo allo spazio",
                        },
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
                    },
                    questionnaire_module: {
                        question: "Premere il pulsante per scoprire quali moduli sono adatti a voi.",
                        warning: "Dopo aver modificato una qualsiasi delle specifiche, premere nuovamente il pulsante",
                        button: "Trova moduli",
                        error: {
                            softer: "Non riuscendo a trovare un modulo che corrisponda esattamente alla combinazione indicata, cercare di nuovo con restrizioni più morbide",
                            demands: "Impossibile soddisfare le richieste, indicarne altre",
                            roomSize: "Le dimensioni della stanza sono troppo ridotte per le richieste fornite.",
                            points2D: "Quando si sceglie “altro”, si prega di disegnare i punti sul 2D"
                        },
                        module_type: {
                            //names kept dutch to use name given in csv
                            opklapbed: "Letto",
                            opklapbed_zetel: "Letto Divano",
                            bureau: "Scrivania",
                            kast_zij: "Armadio Ripiani laterali",
                            kast: "Armadio",
                            bureau_bedm: "Scrivania Letto",
                            kast_bedm: "Armadio Letto",
                            kast_kastm: "Armadio doppio",
                            bureau_kastm: "Armadio scrivania",
                            bureaum_bedm_kast: "Scrivania Armadio Letto",
                            bureaum_kastm_kast: "Scrivania Armadio doppio",
                            bureaum_bedm_kastm_kast: "Scrivania Letto Armadio Doppio",
                            kastm_bedm_kastm_kast: "Letto Armadio triplo"
                        },
                        module_info: {
                            rotate: "Ruota di 90°",
                            name: "Nome: ",
                            width: "Larghezza: ",
                            height: "Altezza: ",
                            closed: "Chiuso: ",
                            open: "Aperto: ",
                            components: "Componenti: ",
                            saved: "Spazio risparmiato: ",
                            intersection: "Controllare la sovrapposizione"

                        },
                        components: {
                            opkladbed: "letto fisso pieghevole",
                            zetel: "divano fisso",
                            bureau: "scrivania fissa",
                            kast_met_zijschappen: "armadio fisso con spazi laterali",
                            kast: "armadio fisso",
                            bed_bewegend: "letto mobile",
                            kast_bewegend: "armadio mobile",
                            bureau_bewegend: "scrivania mobile",
                            tweede_kast_bewegend: "secondo armadio mobile"
                        }

                    },
                    contact: {
                        q_contact: "Lascia i tuoi dati di contatto in modo che possiamo raggiungerti",
                        firstname: "Nome",
                        lastname: "Cognome",
                        phone_number: "Numero di telefono",
                        email: "E-mail",
                        address: "Via e numero civico",
                        postcode: "Codice postale",
                        city: "Città",
                        country: "Paese",
                        submit: "Invia"
                    },
                    alert: {
                        no: "Nessuna sovrapposizione rilevata",
                        yes: "Sovrapposizione rilevata",
                        adjust: "Regolare la configurazione per evitare sovrapposizioni.",
                        proceed: "È possibile procedere con la configurazione",
                        again: "Ricontrollare quando si apportano modifiche alla configurazione precedente."
                    },
                    privacy: {
                        title:"Politica sulla privacy",
                        intro:"Le informazioni inserite vengono raccolte ed elaborate da noi attraverso vari servizi. Per ulteriori informazioni, vedere di seguito.",
                        pol:"Le informazioni inserite nel modulo e la posizione del modulo nello spazio 3D sono memorizzate in un database MongoDB. Il resto dell'informativa sulla privacy di Furnify è disponibile ",
                        here: "qui",
                        mailchimp:"È possibile annullare l'iscrizione alla nostra campagna mailchimp in qualsiasi momento inviando una mail a info@furnifyhome.eu.",
                        disclaimer1: "Utilizziamo Mailchimp come piattaforma di marketing. Facendo clic qui sotto per iscriversi, l'utente riconosce che le sue informazioni saranno trasferite a Mailchimp per l'elaborazione. ",
                        learn:"Per saperne di più",
                        disclaimer2: " sulle pratiche di privacy di Mailchimp.",
                        privacy: "Privacy",
                        close:"Chiudere"
                    },
                    floorplan: {
                        slider: "Dimensione griglia",
                        height: "Altezza",
                        backto: "Tornare alla visualizzazione 2D rimuoverà tutti gli oggetti 3D. Vuoi continuare?",
                        titleConverted3D:"La conversione da 2D a 3D è ancora in sviluppo.",
                        convertedTo3D: "Il modello 3D qui non ha ancora le stesse funzionalità del modello 3D rettangolare. \n(Aggiunta di moduli e ostacoli)",
                        drawingMode: "Attiva/Disattiva modalità disegno",
                        remove: "Rimuovi tutto",
                        orthogonalMode: "Attiva/Disattiva modalità ortogonale",
                        reset: "Reimposta vista",
                        grid: "Attiva/Disattiva griglia e snapping"
                    },
                    modal:{
                        close: "Chiudi",
                        confirm: "Conferma",
                        cancel: "Annulla"
                    }
                }
            }
        }
    });

export default i18n;