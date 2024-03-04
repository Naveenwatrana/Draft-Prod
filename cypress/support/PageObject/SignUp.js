class Credentials {
  UserName() {
    return cy.get('#email');
  }

  Password() {
    return cy.get('#password');
  }

  Register() {
    cy.visit('/');
    cy.get('.button_storybookButton__Gc43D').first().click();
  }

  Button() {
    return cy.get('.button_storybookButton__Gc43D');
  }

  Checkbox() {
    return cy.get('[type="checkbox"]');
  }

  ConfirmPassword() {
    return cy.get('#confirmPassword');
  }
}
export default Credentials;
