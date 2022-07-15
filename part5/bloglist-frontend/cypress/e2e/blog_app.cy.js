describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  it('can\'t login without name and password', function() {
    cy.contains('login').click()
    cy.contains('Wrong username or password')
  })

  it('user can login', function() {
    cy.get('#username').type('Max')
    cy.get('#password').type('qwerty')

    cy.get('#login-button').click()

    cy.contains('Max is logged in')
  })
})