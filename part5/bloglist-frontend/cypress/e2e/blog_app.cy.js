describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  describe('login', function() {
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

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('Max')
      cy.get('#password').type('qwerty')

      cy.get('#login-button').click()
    })

    it('new blog can be created', function() {
      cy.contains('new blog').click()

      cy.get('#title').type('Title')
      cy.get('#author').type('John')
      cy.get('#url').type('www')

      cy.contains('create').click()
      cy.contains('a new blog Title by John added')
    })
  })
})