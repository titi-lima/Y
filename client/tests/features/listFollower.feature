# Feature: List Follower

#     Scenario: listar seguindo
#         Given eu estou logado no perfil de PedroNC
#         Given dado que "PedroNC" segue o usuário "BrenoM"
#         Given dado que "PedroNC" segue o usuário "JhonDoe"
#         Given eu estou "Meu perfil"
#         When eu clico no botão de "Seguindo/Seguidores/publicaçoes"
#         When eu clico na opção "seguindo"
#         Then eu visualizo apenas os usuários ["BrenoM","JohnDoe"]

#     Scenario: listar seguidores
#         Given eu estou logado no perfil de PedroNC
#         Given dado que "BrenoM" segue o usuário "PredroNC"
#         Given dado que "JohnDoe" segue o usuário "PredroNC"
#         Given eu estou "Meu perfil"
#         When eu clico no botão de "Seguindo/Seguidores/publicaçoes"
#         When eu clico na opção "seguidores"
#         Then eu visualizo apenas os usuários ["BrenoM","JohnDoe"]