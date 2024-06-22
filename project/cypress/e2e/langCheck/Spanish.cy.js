import {checkContact, checkFunc, checkSpace, checkSpecs, checkObstacles} from "./Languagecheck.js";

describe("Checking text in Spanish is correctly rendered", ()=>{
    beforeEach('visit application in Dutch', ()=>{
        cy.visit('', {
            onBeforeLoad(win) {
                Object.defineProperty(win.navigator, 'language', { value: 'es-ES' });
                Object.defineProperty(win.navigator, 'languages', { value: ['es'] });
                Object.defineProperty(win.navigator, 'accept_languages', { value: ['es'] });
            },
            headers: {
                'Accept-Language': 'es',
            },
        });  });

    it("Sidebar space", ()=>{
        let space={ q_dimensions: "Seleccione la forma de la habitación e introduzca las dimensiones",
                rectangular: "Rectangular",
                dimLength: "Longitud",
                dimWidth: "Ancho",
                dimHeight: "Altura",
                other: "Otro",
            q_space: "¿Qué espacio habitable deseas optimizar?",
            space: {
                guest_room: "Habitación de invitados",
                living_room: "Sala de estar",
                bedroom: "Dormitorio",
            },
            q_preferences: "¿Tienes preferencias específicas para la distribución de tu espacio habitable?",
            preferences: {
                wall: "Pared",
                partition_wall: "Pared divisoria",
                in_the_middle_of_space: "En el medio del espacio",
            }    };

        checkSpace(space);
    });

    it("Sidebar Q1 (obstacles)",()=>{
        let obst={
            q_aspects: "Agrega qué aspectos debemos tener en cuenta en tu espacio habitable",
            obstructions: {
                window: "Ventana",
                door: "Puerta",
                radiator: "Radiador",
                walloutlet: "Enchufe de pared",
                switch: "Interruptor",
                sloping_Wall: "Pared inclinada",
                other: "Otro",
                q_door:{
                    opening_door:"cómo abrir la puerta",
                    inside_left:"dentro de la habitación, a la izquierda",
                    inside_right:"dentro de la habitación, a la derecha",
                    outside:"espacio exterior"
                },
                q_window:{
                    opening_window:"¿Puede abrirse la ventana hacia el interior?",
                    yes:"si",
                    no:"no"
                }}
        }
        checkObstacles(obst);
    } )

    it("Sidebar functional", ()=>{
        let functional={
            q_function: "Seleccione las funciones necesarias para aprovechar al máximo su espacio vital",
            functions: {
                bed: "Cama",
                office_space: "Espacio de oficina",
                sofa: "Sofá",
                storage_space: "Espacio de almacenamiento",
            },
            bed: {
                q_bed: "¿Qué colchón prefieres?",
                soft: "Extra suave",
                medium: "Medio",
                sturdy: "Extra firme",
                apply: "No aplicable"
            }}
        checkFunc(functional);
    });

    it("Sidebar specs", ()=>{
        let specs={
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
        }
        checkSpecs(specs);
    });

    it("Sidebar contact", ()=>{
        let contact={   q_contact: "Deja tus datos de contacto para que podamos comunicarnos contigo",
            firstname: "Nombre",
            lastname: "Apellido",
            phone_number: "Número de teléfono",
            email: "Correo electrónico",
            address: "Dirección"
        }

        checkContact(contact);
    })
})