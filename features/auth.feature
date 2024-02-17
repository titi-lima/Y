Feature: User Authentication
  As a user
  I want to be able to login and logout
  So that I can access my account

  Scenario: login de um usuário na plataforma
    Given estou na tela de login
    When preencho os campos email com 'gpms@cin.ufpe.br', senha com '123456'
    And tento fazer login
    Then sou redirecionado para a tela do feed

  Scenario: logout de um usuário na plataforma
    Given estou na tela do feed
    When tento fazer logout
    Then sou redirecionado para a tela de login

  Scenario: login de um usuário na plataforma sem senha
    Given estou na tela de login
    When preencho os campos email com 'gpms@cin.ufpe.br', senha com ''
    And tento fazer login
    Then vejo uma mensagem de erro
    And continuo na tela de login

  Scenario: login de um usuário na plataforma sem email
    Given estou na tela de login
    When preencho os campos email com '', senha com '123456'
    And tento fazer login
    Then vejo uma mensagem de erro
    And continuo na tela de login