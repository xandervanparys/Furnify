import {passRoomDimensions, passWindoorDimensions} from "../helperfuncs/Helperspace.js";

describe('First test',()=>{

  beforeEach('visit application', ()=>{
    cy.visit('');
  })


  it('Looking for logo', ()=>{
    //Visits the baseUrl that is passed in cypress.config.cjs
    cy.get('img#logo').should('be.visible');
  });


  it('Making sure every element on the sidebar is displayed', ()=>{
    cy.get('nav.nav-menu').should('be.visible'); //Sidebar should be shown
    cy.get('img#logo').should('be.visible');  //Furnify logo should be visible

    //use of data-testid
    cy.get('[data-testid="btn-nav-sidebar-next"]');

  });

  it('Clicking sidebar should close it', ()=>{
    cy.get('div.menu-bars > svg').click();
    cy.get('nav.nav-menu').should('not.be.visible');
  });

  it('Passing dimensions to rectangular form', ()=>{
    let badInput="RANDOM_TEXT";
    //selecting rectangular form
    cy.get('[data-testid="btn-space-room-rectangular"]').click();
    passRoomDimensions([badInput, 7, 2]);
    cy.contains(badInput).should("not.exist");  //making sure input doesn't get saved
  })

  it("Changing roomdimensions and making sure it's saved when navigating to next part of questionnaire", ()=>{
    let inputValues=[13, 7.9, 34];
    //  selecting rectangular form
    cy.get('[data-testid="btn-space-room-rectangular"]').click();
    passRoomDimensions(inputValues);
    cy.get('[data-testid="btn-specs-preferences-partition_wall"]').click();
    cy.get('input#partition').should("be.checked");
      //Clicking on button guestroom
    cy.get('input#guestroom').should("not.be.checked");
    cy.get('[data-testid="btn-func-room-guestroom"]').should("be.visible").click();
    cy.get('input#guestroom').should("be.checked");

    // navigating to next part of questionnaire
    cy.get('[data-testid="btn-nav-sidebar-next"]').click();
    // and back
    cy.get('[data-testid="btn-nav-sidebar-previous"]').click();
    //checking if values are still present
    cy.get('[data-testid="input-space-room-rectangular-length"]').should('have.value', inputValues[0]);
    cy.get('[data-testid="input-space-room-rectangular-width"]').should('have.value', inputValues[1]);
    cy.get('[data-testid="input-space-room-rectangular-height"]').should('have.value', inputValues[2]);
    cy.get('input#guestroom').should("be.checked");
    cy.get('input#partition').should("be.checked");

  })

  it("Adding and deleting obstructions", ()=>{
    cy.get('[data-testid="btn-nav-sidebar-next"]').click();
    //Multiple aspect buttons
    cy.get('[data-testid="btn-space-aspect-window"]');
    let amount=5;
    //adding a certain amount of obstructions
    for(let i=0; i<amount; i++){
      cy.get('[data-testid="btn-space-aspect-window"]').click();
    }
    cy.get('[data-testid="btn-space-aspect-door"]').click();
    //amount of window-obstructions should equal amount of obstructions added
    cy.get('[data-testid="btn-obstacle-expand-window"]').should("have.length", amount);
    //should find door-obstruction and scroll it into view
    cy.get('[data-testid="btn-obstacle-expand-door"]').scrollIntoView();

    //deleting obstructions
    for(let i=0; i<Math.floor(amount/2); i++){
      cy.get('[data-testid="btn-obstacle-delete-window"]').eq(i).scrollIntoView();
      //In two lines because unsafe to chain further commands that rely on the subject after .scrollIntoView() see: https://docs.cypress.io/api/commands/scrollIntoView
      cy.get('[data-testid="btn-obstacle-delete-window"]').eq(i).click({force: true});
    }
    //checking amount of not deleted obstructions is correct
    cy.get('[data-testid="btn-obstacle-expand-window"]').should("have.length", amount-Math.floor(amount/2));
    cy.get('[data-testid="btn-obstacle-expand-door"]').scrollIntoView();

  });
   it("Adding obstructions, changing data of those obstruction and making sure that the data didn't disappear", ()=>{
      cy.get('[data-testid="btn-nav-sidebar-next"]').click();
      let windowParams={type: "window", Width: 1.2, Height: 0.5};
      let doorParams={type: "window", Width: 1.2, Height: 0.5};
      //making sure button to add a window and a door is visible
      cy.get('[data-testid="btn-space-aspect-window"]').should("be.visible").click();
      cy.get('[data-testid="btn-space-aspect-door"]').should("be.visible").click();
      //when clicking the button a window-obstacle should be added, now we want to expand it
      cy.get('[data-testid="btn-obstacle-expand-window"]').scrollIntoView();
      cy.get('[data-testid="btn-obstacle-expand-window"]').click();
      cy.get('[data-testid="btn-obstacle-expand-door"]').scrollIntoView();
      cy.get('[data-testid="btn-obstacle-expand-door"]').click();
      //Entering dimensions
      passWindoorDimensions(windowParams);
      passWindoorDimensions(doorParams);
      //Navigating to next part of questionnaire
      cy.get('[data-testid="btn-nav-sidebar-next"]').click();
      //and back
      cy.get('[data-testid="btn-nav-sidebar-previous"]').click();
      //Expanding the button again
      cy.get('[data-testid="btn-obstacle-expand-window"]').click();
      //Checking if all values are still the same
      cy.get('[data-testid="input-obst-'+windowParams.type+'-width"').should('have.value', windowParams.Width);
      cy.get('[data-testid="input-obst-'+windowParams.type+'-height"').should('have.value', windowParams.Height);
      cy.get('[data-testid="input-obst-'+doorParams.type+'-width"').should('have.value', doorParams.Width);
      cy.get('[data-testid="input-obst-'+doorParams.type+'-height"').should('have.value', doorParams.Height);

   });

   it("Questionnaire functional- selecting room and needed functions", ()=>{

       cy.get('[data-testid="btn-nav-sidebar-next"]').should("be.visible").click();
       cy.get('[data-testid="btn-nav-sidebar-next"]').should("be.visible").click();


       //Matress options should not be visible when bed isn't clicked
       cy.get('[data-testid="div-func-options-mattress"]').should("not.be.visible");
       //Selecting option bed
       cy.get('[data-testid="btn-func-bed"]').should("be.visible").click();
       cy.get('input#none').should("be.checked");
       cy.get('[data-testid="btn-func-bed-medium"]').click();
       cy.get('input#medium').should("be.checked");

       //Making sure when going to other part of questionnaire and back, that selected data remains the same
       cy.get('[data-testid="btn-nav-sidebar-next"]').should("be.visible").click();
       cy.get('[data-testid="btn-nav-sidebar-previous"]').should("be.visible").click();
       cy.get('input#medium').should("be.checked");
   });

   it("Questionnaire specifications- selecting options and inserting text into text-area", ()=>{
       let text="This is a test"
       cy.get('[data-testid="btn-nav-sidebar-next"]').should("be.visible").click();
       cy.get('[data-testid="btn-nav-sidebar-next"]').should("be.visible").click();
       cy.get('[data-testid="btn-nav-sidebar-next"]').should("be.visible").click();
       cy.get('[data-testid="btn-nav-sidebar-next"]').should("be.visible").click();

       //Clicking on preferred options and inserting text
       cy.get('[data-testid="btn-specs-material-oak"]').click();
       cy.get('input#matOak').should("be.checked");
       cy.get('input#matBirch').should("not.be.checked");
       cy.get('input#matWalnut').should("not.be.checked");
       cy.get('[data-testid="btn-specs-color-white"]').click();
       cy.get('input#colWhite').should("be.checked");
       cy.get('input#colBlack').should("not.be.checked");
       cy.get('[data-testid="area-specs-requirements"]').clear().type(text);

       //Making sure when going to other part of questionnaire and back, that selected data remains the same
       cy.get('[data-testid="btn-nav-sidebar-next"]').should("be.visible").click();
       cy.get('[data-testid="btn-nav-sidebar-previous"]').should("be.visible").click();
       cy.get('input#matOak').should("be.checked");
       cy.get('input#matBirch').should("not.be.checked");
       cy.get('input#matWalnut').should("not.be.checked");
       cy.get('input#colWhite').should("be.checked");
       cy.get('input#colBlack').should("not.be.checked");
       cy.get('[data-testid="area-specs-requirements"]').should("have.text", text);
   });

   it("Questionnaire contact- ", ()=>{
       let contact={firstname: "Test_Firstname", lastname: "Test_Lastname", email: "firstname.lastname@gmail.com",
           wrongPhoneInput1: "123 45 6ZEVEN7 890123", wrongPhoneInput2: "1234567890123", phoneInput: "123456789"}

       cy.get('[data-testid="btn-nav-sidebar-next"]').should("be.visible").click();
       cy.get('[data-testid="btn-nav-sidebar-next"]').should("be.visible").click();
       cy.get('[data-testid="btn-nav-sidebar-next"]').should("be.visible").click();
       cy.get('[data-testid="btn-nav-sidebar-next"]').should("be.visible").click();
       cy.get('[data-testid="btn-nav-sidebar-next"]').should("be.visible").click();
       //TODO: May be removed if there comes a next part
       cy.get('[data-testid="btn-nav-sidebar-next"]').should("not.be.visible");

       //Inserting text into the inputs
       cy.get('[data-testid="input-contact-firstname"]').clear().type(contact.firstname);
       cy.get('[data-testid="input-contact-lastname"]').clear().type(contact.lastname);
       cy.get('[data-testid="input-contact-email"]').clear().type(contact.email);

       cy.get('input[type="tel"]').type(contact.wrongPhoneInput1);
       //testing for wrong values
       cy.get('input[type="tel"]').assertInputValueWithoutSpaces(contact.wrongPhoneInput1).should("be.false"); //No letters should be accepted
       cy.get('input[type="tel"]').assertInputValueWithoutSpaces(contact.wrongPhoneInput2).should("be.false"); //String was too long
       //Expected output
       cy.get('input[type="tel"]').assertInputValueWithoutSpaces(contact.phoneInput).should("be.true");

       //TODO: TEST FOR ADDRESS (needs to be changed first)

       //Making sure when going to other part of questionnaire and back, that inserted data remains the same
       cy.get('[data-testid="btn-nav-sidebar-previous"]').should("be.visible").click();
       cy.get('[data-testid="btn-nav-sidebar-next"]').should("be.visible").click();

       cy.get('[data-testid="input-contact-firstname"]').should("have.value", contact.firstname);
       cy.get('[data-testid="input-contact-lastname"]').should("have.value", contact.lastname);
       cy.get('[data-testid="input-contact-email"]').should("have.value", contact.email);
       cy.get('input[type="tel"]').assertInputValueWithoutSpaces(contact.phoneInput).should("be.true");
   })

})
