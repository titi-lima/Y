Feature: User Authentication
  As a user
  I want to be able to login and logout
  So that I can access my account

  Scenario: Login com falha
    Given eu estou na página de login
    When eu preencho o formulário com o username "user" e a senha "password", inválidos, e aperto no botão login
    Then eu devo permanecer na página

  Scenario: Login com sucesso
    Given eu estou na página de login
    When eu preencho o formulário com o username "PedroNC" e a senha "40028922", válidos, e aperto no botão login
    Then eu devo ser redirecionado para a página "home"