Feature: File Upload
    As a user
    I want to be able to upload a file
    So that I can share it with other users

    Scenario: Upload de arquivo
        Given eu tenho um arquivo chamado "arquivo.txt"
        When eu tento fazer upload do arquivo "arquivo.txt"
        Then eu devo receber um código de sucesso "200"


