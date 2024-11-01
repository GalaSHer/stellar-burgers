import * as OrderFixture from '../fixtures/order.json';

describe('тесты конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user' }).as('getUser');
    cy.intercept('POST', 'api/orders', { fixture: 'order' });
    cy.visit('/');
    cy.setCookie('accessToken', 'ACCESS_TOKEN');
    localStorage.setItem('refreshToken', 'REFRESH_TOKEN');

    cy.get('[data-cy="bun"]').as('bun');
    cy.get('[data-cy="main"]').as('main');
    cy.get('[data-cy="sauce"]').as('sauce');
    cy.get('[data-cy="burger-constructor"]').as('constructor');
    cy.get('[data-cy="burger-constructor-ingredients"]').as('ingredients');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('отображается список ингредиентов', () => {
    cy.get('@bun').should('have.length.at.least', 1);
    cy.get('[data-cy="main"],[data-cy="sauce"]').should(
      'have.length.at.least',
      1
    );
  });

  it('добавляет булку в конструктор', () => {
    cy.get('@constructor').should('not.contain', 'булка');
    cy.get('[data-cy=bun] button').first().click();
    cy.get('@constructor').contains('булка');
  });

  it('добавляет ингредиент в конструктор', () => {
    cy.get('@ingredients').should('not.contain', 'Биокотлета');
    cy.get('[data-cy=main] button').first().click();
    cy.get('@ingredients').contains('Биокотлета');
  });

  it('добавляет соус в конструктор', () => {
    cy.get('@ingredients').should('not.contain', 'Соус');
    cy.get('[data-cy=sauce] button').first().click();
    cy.get(`@ingredients`).contains('Соус');
  });

  it('открывает описание ингредиента в модальном окне', () => {
    cy.get('@bun').first().click();
    cy.get('[data-cy=modal]')
      .should('be.visible')
      .should('contain', 'Краторная булка');
  });

  it('закрывает описание ингредиента в модальном окне по крестику', () => {
    cy.get('@bun').first().click();
    cy.get('[data-cy=modal]').should('be.visible');
    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('создает и оформляет заказ', () => {
    cy.wait('@getUser');
    cy.get('[data-cy=bun] button').first().click();
    cy.get('[data-cy=main] button').first().click();
    cy.get('[data-cy=sauce] button').first().click();
    cy.get('[data-cy=order-button]').click();
    cy.get('[data-cy=modal]')
      .should('be.visible')
      .should('contain', OrderFixture.order.number);
    cy.wait(500);
    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=modal]').should('not.exist');
    cy.get('@ingredients').should('contain', 'Выберите начинку');
    cy.get('@constructor').should('contain', 'Выберите булки');
  });
});
