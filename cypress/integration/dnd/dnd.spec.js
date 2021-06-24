describe('service is available', function () {
  it('should be available on localhost:3000', function () {
    cy.visit('http://localhost:3000');
  });

  it('should drag and drop ingredient', function () {
    cy.get('[data-test-id="draggble"]').first().trigger('dragstart');
    cy.get('[data-test-id="dropTarget"]').trigger('drop');
  });
});
