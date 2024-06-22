import {checkContact, checkFunc, checkSpace, checkSpecs, checkObstacles} from "./Languagecheck.js";

describe("Checking text in English is correctly rendered", ()=>{
    beforeEach('visit application in Dutch', ()=>{
        cy.visit('', {
            onBeforeLoad(win) {
                Object.defineProperty(win.navigator, 'language', { value: 'en-EN' });
                Object.defineProperty(win.navigator, 'languages', { value: ['en'] });
                Object.defineProperty(win.navigator, 'accept_languages', { value: ['en'] });
            },
            headers: {
                'Accept-Language': 'en',
            },
        });  });

    it("Sidebar space", ()=>{
        let space={
                q_dimensions: "Select the shape of the room and enter the dimensions",
                rectangular: "Rectangular",
                dimLength: "Length",
                dimWidth: "Width",
                dimHeight: "Height",
                other: "Other",
            q_space:"Which living space do you want to optimize?",
            space:{
                guest_room:"Guest room",
                living_room:"Living room",
                bedroom:"Bedroom",
            },
            q_preferences: "Do you have specific preferences for the layout of your living space?",
            preferences:{
                wall:"Wall",
                partition_wall:"Partition wall",
                in_the_middle_of_space:"In the middle of space",
            }
};

        checkSpace(space);
    });

    it("Sidebar Q1 (obstacles)",()=>{
        let obst={
            q_aspects:"Add which aspects we should take into account in your living space",
            obstructions: {
                window:"Window",
                door:"Door",
                radiator:"Radiator",
                walloutlet:"Wall outlet",
                switch:"Switch",
                sloping_Wall:"Sloping wall",
                other:"Other",
                q_door:{
                    opening_door:"How does the door open?",
                    inside_left:"Inside the room, to the left",
                    inside_right:"Inside the room, to the right",
                    outside:"Outside the room"
                },
                q_window:{
                    opening_window:"Can the window open to the inside?",
                    yes:"yes",
                    no:"no"
                }
            }
        }
        checkObstacles(obst);
    } );

    it("Sidebar functional", ()=>{
        let functional={
            q_function:"Select the functions needed to make the most of your living space",
            functions:{
                bed:"Bed",
                office_space:"Office space",
                sofa:"Sofa",
                storage_space:"Storage space",
            },
            bed: {
                q_bed: "Which mattress do you prefer?",
                soft: "Extra soft",
                medium: "Medium",
                sturdy: "Extra sturdy",
                apply: "Not applicable"
            }
        }
        checkFunc(functional);
    });

    it("Sidebar specs", ()=>{
        let specs={
            q_materials: "Select which finishes you prefer",
            materials:{
                color: "Color",
                material: "Material",
                white:"White",
                black:"Black",
                birch:"Birch",
                oak:"Oak",
                walnut:"Walnut"
            },
            q_other:"If there are any other requirements we need to consider, please fill them in below"
        }
        checkSpecs(specs);
    });

    it("Sidebar contact", ()=>{
        let contact={
            q_contact:"Leave your contact details so we can reach you",
            firstname:"First name",
            lastname:"Last name",
            phone_number:"Phone number",
            email:"E-mail",
            address:"Address"
        }

        checkContact(contact);
    })
})