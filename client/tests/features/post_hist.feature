Feature: Histórico de postagens do usuário
    As a usuário logado na rede social
    I want to acessar um histórico de postagens
    So that eu possa acessar postagens antigas

  Scenario: Buscar postagens de usuário em todas as datas
    Given eu estou logado com username "PedroNC" e senha "40028922"
    And   há uma postagem com data "08/03/2024"
    And   há uma postagem com data "09/03/2024"
    When  eu busco postagens no dia "8", mês "3" e ano "2024"
    Then  aparece uma postagem com a data "08/03/2024"
    And   não aparece uma postagem com a data "09/03/2024"
  