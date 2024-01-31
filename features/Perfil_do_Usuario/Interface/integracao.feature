Feature: integracao 
    As um usuário eu gostaria de acessar as outras páginas da rede social
    através da página de usuário
    So that eu possa me sentir mais livre para navegar

Scenario: Integracao com Historico de Postagens
    Given o usuário está logado como "Breno_Miranda"
    And o usuário está na página "Perfil do Usuário"
    And o usuário "Breno_Miranda" possui a postagem "x" 
    And o usuário "Breno_Miranda" possui a postagem "y" 
    When o usuário seleciona "Histórico de Postagens"
    Then o usuário está na página "Perfil do Usuário"
    And o usuário vê a postagem "x" 
    And o usuário vê a postagem "y" 

Scenario: Integracao com Sobre
    Given o usuário está logado como "Breno_Miranda"
    And o usuário está na página "Perfil do Usuário"
    And o sistema armazena {usuário : "Breno_Miranda" ,bio: "amo dar aulas"}
    When o usuário seleciona "Sobre"
    Then o usuário está na página "Perfil do Usuário"
    And o usuário vê o texto "amo dar aulas"

Scenario: Integracao com Seguidores e Seguidos
    Given o usuário está logado como "Breno_Miranda"
    And o usuário está na página "Perfil do Usuário"
    When o usuário seleciona "Seguidos/Seguidores"
    Then o usuário está na página "Lista de Seguidores/Seguidos"
    
