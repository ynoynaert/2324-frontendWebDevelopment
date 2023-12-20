describe('Add Vinyl', () => {
  beforeEach(() => {
    cy.login('youna.noynaert@telenet.be', '12345678');
  });

  it("should add a new vinyl", () => {
    cy.visit("http://localhost:5173/vinyl/add");

    cy.get("[data-cy=vinyl_artist_input]").type("Taylor Swift");
    cy.get("[data-cy=vinyl_album_input]").type("Red");
    cy.get("[data-cy=vinyl_color_input]").type("Black");
    cy.get("[data-cy=vinyl_collection_select]").select("Taylor Swift");
    cy.get("[data-cy=vinyl_image_url_input").type("https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/Taylor_Swift_-_Red.png/220px-Taylor_Swift_-_Red.png");
    cy.get("[data-cy=submit_save_vinyl]").click();

    cy.get("[data-cy=vinyl_heading_album_artiest]").contains("Red - Taylor Swift");
    cy.get("[data-cy=vinyl_color]").contains("Black");
  });

  it("should remove the vinyl", () => {
    cy.visit("http://localhost:5173/vinyl/all");
    cy.get("[data-cy=vinyl_delete_btn]").eq(7).click();
    cy.get("[data-cy=vinyl]").should("have.length", 7);
  });
});