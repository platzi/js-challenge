describe("PlatziStore Tests", () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/public/');
    cy.wait(2000);
  })

  it('Existe el titulo PlatziStore', () => {
    cy.title().should('contain', 'PlatziStore');
  });

  it("Obtener initialState del LocalStorage", () => {
    expect(localStorage.getItem('pagination')).to.eq('5');
  });

  it("Obtener los primeros 10 Productos", () => {
    cy.get('*[class^="Items"]').find('article').should('have.length', 10)
  });

  it('Desplácese hacia abajo y renderice nuevos productos', () => {
    cy.scrollTo('bottom')
    cy.get('*[class^="Items"]').should('have.length', 2);
  });

  it('Comprobar el nombre del Producto', () => {
    cy.scrollTo('bottom');
    cy.get('*[class^="Items"]').find('article').find('h2').eq(0).should('exist');
  });

});