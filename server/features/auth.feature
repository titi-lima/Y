Feature: User Authentication
  As a user
  I want to be able to login and logout
  So that I can access my account

  Scenario: Autenticar um usuário
    Given eu tenho um usuário com o nickname "johndoe"
    When eu tento fazer login com o nickname "johndoe" e a senha "123456"
    Then eu devo receber um token de autenticação e um código de sucesso "200"

  Scenario: Autenticar um usuário com nickname inválido
    Given eu tenho um usuário com o nickname "johndoe"
    When eu tento fazer login com o nickname "john" e a senha "123456"
    Then eu devo receber um código de erro "400"

  Scenario: Autenticar um usuário com senha inválida
    Given eu tenho um usuário com o nickname "johndoe"
    When eu tento fazer login com o nickname "johndoe" e a senha "123"
    Then eu devo receber um código de erro "400"

  Scenario: Fazer logout de um usuário
    Given eu tenho um usuário com o nickname "johndoe"
    And eu estou autenticado com o nickname "johndoe" e a senha "123456"
    When eu tento fazer logout
    Then eu devo receber um código de sucesso "200"