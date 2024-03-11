Feature: File Upload
    As a user
    I want to be able to upload a file
    So that I can share it with other users

    Scenario: Post com imagem
        Given eu estou logado no sistema com o username "damattag" e a senha "\"guilherme\""
        And estou na página "/home"
        When eu clico no botão de adicionar post, com id "button"
        Then um modal deve ser aberto
        When eu seleciono o arquivo "image.png"
        And eu escrevo "Imagem de teste" no campo com id "description"
        And eu clico no botão com id "submit"
        Then eu devo ver um toast com a mensagem "Post publicado com sucesso!"