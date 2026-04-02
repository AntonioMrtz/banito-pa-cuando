describe("Recommendation", () => {
  it("Should display the name of the place after searching", () => {
    const searchTerm = "Los Alcázares";
    cy.visit("/");

    cy.findByTestId("input-type-animation")
      .should("be.visible")
      .type(searchTerm);

    cy.contains(searchTerm).should("be.visible");

    cy.get("a").contains(searchTerm).click();

    cy.contains(`${searchTerm}`).should("be.visible");
  });
});
