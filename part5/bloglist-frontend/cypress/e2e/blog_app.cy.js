describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Maxwell',
      username: 'Max',
      password: 'qwerty',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)

    const secondUser = {
      name: 'Anthony',
      username: 'Tony',
      password: 'qwerty',
    }
    cy.request('POST', 'http://localhost:3001/api/users/', secondUser)

    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('login', function() {
    it('fails with wrond credentials', function() {
      cy.contains('login').click()

      cy
        .get('.message')
        .contains('Wrong username or password')
        .and('have.css', 'color', 'rgb(179, 41, 41)')

      cy.get('html').should('not.contain', 'Max logged in')
    })

    it('fails with wrong password', function() {
      cy.get('#username').type('Max')
      cy.get('#password').type('wrong')

      cy.get('#login-button').click()

      cy
        .get('.message')
        .contains('Wrong username or password')
        .and('have.css', 'color', 'rgb(179, 41, 41)')

      cy.get('html').should('not.contain', 'Max logged in')
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('Max')
      cy.get('#password').type('qwerty')

      cy.get('#login-button').click()

      cy.contains('Max is logged in')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'Max', password: 'qwerty' })
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()

      cy.get('#title').type('Title')
      cy.get('#author').type('John')
      cy.get('#url').type('www')

      cy.contains('create').click()
      cy.get('.message').contains('a new blog Title by John added')

      cy.contains('Title John')
    })

    describe('created blog exists', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'Title', author: 'John', url: 'www' })
      })

      it('and can be liked', function() {
        cy.contains('view').click()

        cy.get('.blog__likes').contains('0')
        cy.get('.blog__likes').should('not.contain', '1')

        cy.get('.button--like').click()
        cy.get('.blog__likes').contains('1')
        cy.get('.blog__likes').should('not.contain', '0')
      })

      it('and can be deleted', function() {
        cy.contains('view').click()
        cy.contains('delete').click()
        cy.get('html').should('not.contain', 'Title John')
      })

      it('and can\'t be deleted by other user', function() {
        cy.contains('log out').click()

        cy.get('#username').type('Tony')
        cy.get('#password').type('qwerty')
        cy.get('#login-button').click()

        cy.contains('Title John')
        cy.contains('view').click()

        cy.get('html').should('not.contain', 'delete')
      })

      it('and ordered according to likes', function() {
        cy.createBlog({ title: 'Title 2', author: 'Tim', url: 'www', likes: 2 })
        cy.createBlog({ title: 'Title 3', author: 'Mag', url: 'www', likes: 5 })

        cy.get('.blog__item').eq(0).contains('Title 3 Mag')
        cy.get('.blog__item').eq(1).contains('Title 2 Tim')
        cy.get('.blog__item').eq(2).contains('Title John')
      })
    })
  })
})