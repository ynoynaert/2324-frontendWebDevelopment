describe('Add Collection', () => {
  beforeEach(() => {
    cy.login('youna.noynaert@telenet.be', '12345678');
  });

  it("should add a new collection", () => {
    cy.visit("http://localhost:5173/collection/add");

    cy.get("[data-cy=collection_name_input]").type("All Vinyls");
    cy.get("[data-cy=submit_save_collection]").click();

    cy.get("[data-cy=collection_heading_name]").contains("All Vinyls");
  });

  it("should remove the collection", () => {
    cy.visit("http://localhost:5173/collection");
    cy.get("[data-cy=collection_delete_btn]").eq(0).click();
    cy.get("[data-cy=collection]").should("have.length", 5);
  });
});