describe('Vinyl Info', () => {
  beforeEach(() => {
    cy.login('youna.noynaert@telenet.be', '12345678');
  });

  it("should show the vinyl info", () => {
    cy.visit("http://localhost:5173/vinyl/all");

    cy.get("[data-cy=vinyl_detail_btn]").eq(0).click();
    cy.get("[data-cy=vinyl_detail_heading_album_artiest]").contains("Arrival - ABBA");
    cy.get("[data-cy=vinyl_detail_color]").contains("Black");
    cy.get("[data-cy=vinyl_detail_collection]").contains("Old Vinyls");
  });
});