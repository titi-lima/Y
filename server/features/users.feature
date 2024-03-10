Feature: Users Feature
  As a user
  I want to be able to create my account
  So that I can use the platform

  Scenario: cadastrar usuário
    Given eu não tenho um usuario com nickname "johndoe" cadastrado
    When eu tento cadastrar um usuario com nickname "johndoe", nome "John Doe", descrição "I'm a developer" e senha "123456"
    Then o usuario com nickname "johndoe" é cadastrado e recebo um código de sucesso "201"

  Scenario: cadastrar usuário com nickname já existente
    Given eu tenho um usuario com nickname "johndoe" cadastrado
    When eu tento cadastrar um usuario com nickname "johndoe", nome "John Doe", descrição "I'm a developer" e senha "123456"
    Then eu devo receber um código de erro "409"
