describe("Search Autocomplete", () => {
  it("Should display the name of the place as autocomplete suggestion", () => {
    const searchTerm = "Los Alcázares";
    cy.visit("/");

    cy.get("input.flex").click();
    cy.get("input.flex").type(searchTerm);

    cy.contains(searchTerm).should("be.visible");
  });
});
