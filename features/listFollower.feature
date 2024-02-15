Feature: List Follower 
    As a user
    I want to be able to list my follower
    
    Scenario: Lista de seguidores
        Given o usuário "Breno" está na página "Minha Lista"
        And o usuário “Breno“ segue o usuário “Ruy“ 
        And o usuário “Breno“ segue o usuário “Odilon“ 
        When "Breno" seleciona o campo “Seguindo“
        Then "Breno" está na página "Minha Lista“
        And “Breno“ vê “Ruy“ com a foto “Ruy.png“ na lista
        And “Breno“ vê  “Odilon“ com a foto “Odilon.png“ na lista

    Scenario: Lista de seguidores
        Given o usuário "Breno" está na página "Minha Lista""
        And o usuário  “Ruy“ segue o usuário  “Breno“ 
        And o usuário “Odilon“ segue o usuário “Breno“ 
        And o usuário “Dudu_de_Infra“ segue o usuário “Breno“
        When "Breno" seleciona o campo “Seguidores“
        Then "Breno" está na página "Minha Lista“
        And “Breno“ vê “Ruy“ com a foto “Ruy.png“ na lista
        And “Breno“ vê  “Odilon“ com a foto “Odilon.png“na  lista
        And “Breno“ vê “Dudu_de_Infra“ com a foto “LordFarQuar.png“ na lista


    Scenario: Buscar na lista de seguidores
        Given o usuário "Breno" está na página "Minha Lista""
        And o usuário  “Ruy“ segue o usuário  “Breno“ 
        And o usuário “Odilon“ segue o usuário “Breno“ 
        And o usuário “Dudu_de_Infra“ segue o usuário “Breno“
        When "Breno" seleciona o campo “Seguidores“
        And “Breno” seleciona o campo “buscar usuário”
        And “Breno“ digita “Ruy”
        Then "Breno" está na página "Minha Lista“
        And “Breno“ vê apenas o usuário “Ruy“ com a foto “Ruy.png“ na lista

    Scenario: Buscar na lista de seguindo
        Given o usuário "Breno" está na página "Minha Lista"
        And o usuário  “Breno“ segue o usuário  “Ruy“ 
        And o usuário “Breno“ segue o usuário “Odilon“ 
        And o usuário “Breno“ segue o usuário “Dudu_de_Infra“
        When "Breno" seleciona o campo “Seguindo“
        And “Breno” seleciona o campo “buscar usuário”
        And “Breno“ digita “Odilon”
        Then "Breno" está na página "Minha Lista“
        And “Breno“ vê apenas o usuário “Odilon“ com a foto “Odilon.png“ na lista
