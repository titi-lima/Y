Feature: edit user profile
    As a user
    I want to change my informations in user profile
    So that i can show who i am to others users

Scenario: modificar nome de usuário com sucesso
    Given o usuário com {nickname: "luke",nome: "lucas"} está cadastrado no sistema
    When o usuário com {nickname: "luke"} modifica seu nome para "roberto"
    Then o sistema retorna uma mensagem de sucesso
    And o usuário {nickname: "luke",nome: "roberto"} está cadastrado no sistema

Scenario: modificar bio do usuário com sucesso
    Given o usuário com {nickname: "bruninho",descrição: "bruno de Ess"} está cadastrado no sistema
    When o usuário com {nickname: "bruninho"} modifica sua descrição para "Amo dar aulas"
    Then o sistema retorna uma mensagem de sucesso
    And o usuário com {nickname: "bruninho",descrição: "Amo dar aulas"} está cadastrado no sistema

Scenario: modificar nickname com sucesso
    Given o usuário com {nickname: "bruninho",descrição: "bruno de Ess",nome: "bruno"} está cadastrado no sistema
    And o usuário com {nickname: "brunoEss"} não está cadastrado no sistema
    When o usuário com {nickname: "bruninho"} modifica seu nickname para "brunoEss"
    Then o sistema retorna uma mensagem de sucesso
    And o usuário com {nickname: "brunoEss",,descrição: "bruno de Ess",nome: "bruno"} está cadastrado no sistema

Scenario: modificar nickname sem sucesso 
    Given o usuário com {nickname: "bruninho",descrição: "bruno de Ess",nome: "bruno"} está cadastrado no sistema
    And o usuário com {nickname: "brunoEss",descrição: "prof UFPE",nome: "BRUNO"} está cadastrado no sistema
    When o usuário com {nickname: "bruninho"} modifica seu nickname para "brunoEss"
    Then o sistema retorna uma mensagem de erro
    And o usuário com {nickname: "bruninho",,descrição: "bruno de Ess",nome: "bruno"} está cadastrado no sistema
    And o usuário com {nickname: "brunoEss",descrição: "prof UFPE",nome: "BRUNO"} está cadastrado no sistema

Scenario: modificar foto de perfil com sucesso 
    Given o usuário com {nickname: "bruninho",foto: "unknow.png"} está cadastrado no sistema
    When o usuário com {nickname: "bruninho"} modifica sua foto para "bruno.png"
    Then o sistema retorna uma mensagem de sucesso
    And o usuário com {nickname: "bruninho",foto: "bruno.png"} está cadastrado no sistema

Scenario: modificar foto de perfil sem sucesso (foto no formato errado)
    Given o usuário com {nickname: "bruninho",foto: "bruno.png"} está cadastrado no sistema
    When o usuário com {nickname: "bruninho"} modifica sua foto para "b.pdf"
    Then o sistema retorna uma mensagem de erro
    And o usuário com {nickname: "bruninho",foto: "bruno.png"} está cadastrado no sistema