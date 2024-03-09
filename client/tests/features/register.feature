Feature: Users Feature
  As a user
  I want to be able to create my account
  So that I can use the platform

  Scenario: cadastrar usuário
    Given eu estou na página "register"
    When eu preencho o formulário com o username "johndoe", nome "John Doe", descrição "I'm a developer" e senha "123456" e aperto no botão de cadastrar
    Then sou redirecionado para a tela de login

# Scenario: cadastrar usuário com nickname já existente
#   Given eu tenho um usuario com nickname "johndoe" cadastrado
#   When eu tento cadastrar um usuario com nickname "johndoe", nome "John Doe", descrição "I'm a developer" e senha "123456"
#   Then eu me mantenho na página "register"
