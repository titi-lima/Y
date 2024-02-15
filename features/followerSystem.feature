Feature: Follower System
    As a user
    I want to be able to follow someone
    
    Scenario: Começar a seguir um usuário
        Given o usuário "Breno" está no perfil do usuário "Odilon"
        And o usuário "Breno" não segue "Odilon" 
        And as publicações do usuário “Odilon“ estão indisponíveis para o usuário “Breno“
        When o usuário “Breno" seleciona o campo "Começar a seguir usuário"
        Then  o usuário “Breno" começou a seguir o usuário "Odilon"
        And as publicações do usuário “Odilon“ passaram a ficar disponíveis para o usuário “Breno“

    Scenario: Deixar de seguir um usuário
        Given o usuário "Breno" está no perfil do usuário "Odilon"
        And o usuário "Breno" já segue "Odilon"
        And as publicações do usuário “Odilon“ estão disponíveis para o usuário “Breno“
        When "Breno" seleciona o campo "Parar de seguir usuário"
        Then  o usuário “Breno" parou de seguir o usuário "Odilon"
        And as publicações do usuário “Odilon“ passaram a ficar indisponíveis para o usuário “Breno“, aparecendo uma mensagem de “Publicações indisponíveis“
