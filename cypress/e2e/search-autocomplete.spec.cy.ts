describe("Search Autocomplete", () => {
  it("Should display the name of the place as autocomplete suggestion", () => {
    const searchTerm = "Los Alcázares";
    cy.visit("/");

    cy.findByTestId("input-type-animation")
      .should("be.visible")
      .type(searchTerm);

    cy.contains(searchTerm).should("be.visible");
  });
});
