Feature: Follower System

    Scenario: Deixar de seguir usuario
        Given eu estou logado com username "PedroNC" e senha "40028922"
        Given dado que "PedroNC" segue o usuário "BrenoM"
        Given "PedroNC" está no perfil de "BrenoM"
        When eu clico no botão de "Deixar de seguir"
        Then o botão é alterado para "Seguir usuario"

    Scenario: Seguir usuario
        Given eu estou logado com username "PedroNC" e senha "40028922"
        Given "PedroNC" está no perfil de "BrenoM"
        Given dado que "PedroNC" não segue o usuário "BrenoM"
        When eu clico no botão de "Seguir usuário"
        Then o botão é alterado para "Deixar de seguir"