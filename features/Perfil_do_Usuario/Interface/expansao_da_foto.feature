Feature: expansao da foto
    As a usuário
    I want to ver minha foto de perfil expandida quando selecionada
    So that meus amigos possam distinguir meu rosto

Scenario: Expandir foto de Perfil
    Given o usuário está logado como "Breno_Miranda"
    And o usuário está na página "Perfil do Usuário"
    And a foto de perfil do usuário está em tamanho "normal"
    When é selecionada a foto de perfil
    Then o usuário está na página "Perfil do Usuário"
    And a foto de perfil do usuário está em tamanho "expandido"
    And o background está escurecido