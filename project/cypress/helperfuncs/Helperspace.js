export function passRoomDimensions(params){

    cy.get('[data-testid="input-space-room-rectangular-length"]').clear().type(params[0]); //passing unallowed value
    cy.get('[data-testid="input-space-room-rectangular-width"]').clear().type(params[1]); //clearing full input and passing a value
    cy.get('[data-testid="input-space-room-rectangular-height"]').clear().type(params[2]);

}

export function passObstacleDimensions(params){
    cy.get('[data-testid="input-obst-'+params.type+'-length"]').clear().type(params.Length);
    cy.get('[data-testid="input-obst-'+params.type+'-height"]').clear().type(params.Height);
    cy.get('[data-testid="input-obst-'+params.type+'-width"]').clear().type(params.Width);
}

export function passWindoorDimensions(params){
    cy.get('[data-testid="input-obst-'+params.type+'-height"]').scrollIntoView();
    cy.get('[data-testid="input-obst-'+params.type+'-height"]').clear().type(params.Height);
    cy.get('[data-testid="input-obst-'+params.type+'-width"]').scrollIntoView();
    cy.get('[data-testid="input-obst-'+params.type+'-width"]').clear().type(params.Width);
}

