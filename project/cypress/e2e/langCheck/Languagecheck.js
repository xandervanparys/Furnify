export function checkSpace(space){
    //Here we check that all elements that should contain text, are correct(ly translated)
    cy.get('[data-testid="question-space-dimensions"]').should('include.text', space.q_dimensions);
    cy.get('[data-testid="btn-space-room-rectangular"]').should('include.text', space.rectangular).click();
    cy.get('[data-testid="btn-space-room-other"]').should('include.text', space.other);
    cy.get('[data-testid="label-space-room-rectangular-length"]').should('include.text', space.dimLength);
    cy.get('[data-testid="label-space-room-rectangular-width"]').should('include.text', space.dimWidth);
    cy.get('[data-testid="label-space-room-rectangular-height"]').should('include.text', space.dimHeight);
    cy.get('[data-testid="question-func-space"]').should('include.text', space.q_space);
    cy.get('[data-testid="btn-func-room-guestroom"]').should('include.text', space.space.guest_room);
    cy.get('[data-testid="btn-func-room-living_room"]').should('include.text', space.space.living_room);
    cy.get('[data-testid="btn-func-room-bedroom"]').should('include.text', space.space.bedroom);
    cy.get('[data-testid="question-specs-preferences"]').should('include.text', space.q_preferences);
    cy.get('[data-testid="btn-specs-preferences-wall"]').should('include.text', space.preferences.wall);
    cy.get('[data-testid="btn-specs-preferences-partition_wall"]').should('include.text', space.preferences.partition_wall);
    cy.get('[data-testid="btn-specs-preferences-middle_wall"]').should('include.text', space.preferences.in_the_middle_of_space);
}

export function checkObstacles(obst){
    cy.get('[data-testid="btn-nav-sidebar-next"]').click();
    cy.get('[data-testid="question-space-aspects"]').should('include.text', obst.q_aspects);
    cy.get('[data-testid="btn-space-aspect-window"]').should('include.text', obst.obstructions.window).click();
    cy.get('[data-testid="btn-space-aspect-door"]').should('include.text', obst.obstructions.door).click();
    cy.get('[data-testid="btn-space-aspect-other"]').should('include.text', obst.obstructions.other);
    cy.get('[data-testid="btn-obstacle-name-window"]').should('include.text', obst.obstructions.window)
    cy.get('[data-testid="btn-obstacle-expand-window"]').click();
    cy.get('[data-testid="question-obstacle-window-opening"]').should('include.text', obst.obstructions.q_window.opening_window);
    cy.get('[data-testid="btn-obstacle-delete-window"]').click();
    cy.get('[data-testid="btn-obstacle-expand-window"]').should('not.exist');
    cy.get('[data-testid="btn-obstacle-expand-door"]').click();
    cy.get('[data-testid="btn-obstacle-name-door"]').should('include.text', obst.obstructions.door).click();
    cy.get('[data-testid="question-obstacle-door-opening"]').should('include.text', obst.obstructions.q_door.opening_door);

}

export function checkFunc(func){
    cy.get('[data-testid="btn-nav-sidebar-next"]').click();
    cy.get('[data-testid="btn-nav-sidebar-next"]').click();
    cy.get('[data-testid="question-func-function"]').should('include.text', func.q_function);
    cy.get('[data-testid="btn-func-bed"]').should('include.text', func.functions.bed).click();
    cy.get('[data-testid="btn-func-office_space"]').should('include.text', func.functions.office_space);
    cy.get('[data-testid="btn-func-sofa"]').should('include.text', func.functions.sofa);
    cy.get('[data-testid="btn-func-storage_space"]').should('include.text', func.functions.storage_space);
    //cy.get('[data-testid="question-func-bed"]').should('include.text', func.bed.q_bed);
    cy.get('[data-testid="btn-func-bed-soft"]').should('include.text', func.bed.soft);
    cy.get('[data-testid="btn-func-bed-medium"]').should('include.text', func.bed.medium);
    cy.get('[data-testid="btn-func-bed-sturdy"]').should('include.text', func.bed.sturdy);
    cy.get('[data-testid="btn-func-bed-apply"]').should('include.text', func.bed.apply);

}

export function checkSpecs(specs){
    cy.get('[data-testid="btn-nav-sidebar-next"]').click();
    cy.get('[data-testid="btn-nav-sidebar-next"]').click();
    cy.get('[data-testid="btn-nav-sidebar-next"]').click();
    cy.get('[data-testid="btn-nav-sidebar-next"]').click();
    cy.get('[data-testid="question-specs-materials"]').should('include.text', specs.q_materials);
    cy.get('[data-testid="btn-specs-material-birch"]').should('include.text', specs.materials.birch);
    cy.get('[data-testid="btn-specs-material-oak"]').should('include.text', specs.materials.oak);
    cy.get('[data-testid="btn-specs-material-walnut"]').should('include.text', specs.materials.walnut);
    cy.get('[data-testid="btn-specs-color-white"]').should('include.text', specs.materials.white);
    cy.get('[data-testid="btn-specs-color-black"]').should('include.text', specs.materials.black);
    cy.get('[data-testid="question-specs-other"]').should('include.text', specs.q_other);
}

export function checkContact(contact){
    cy.get('[data-testid="btn-nav-sidebar-next"]').click();
    cy.get('[data-testid="btn-nav-sidebar-next"]').click();
    cy.get('[data-testid="btn-nav-sidebar-next"]').click();
    cy.get('[data-testid="btn-nav-sidebar-next"]').click();
    cy.get('[data-testid="btn-nav-sidebar-next"]').click();
    cy.get('[data-testid="question-contact"]').should('include.text', contact.q_contact);
    cy.get('[data-testid="label-contact-firstname"]').should('include.text', contact.firstname);
    cy.get('[data-testid="label-contact-lastname"]').should('include.text', contact.lastname);
    cy.get('[data-testid="label-contact-email"]').should('include.text', contact.email);
}