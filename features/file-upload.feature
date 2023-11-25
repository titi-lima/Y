A user should be able to upload videos and pictures with subtitles to the app.


Cenário: Publicar uma foto
Given o usuário Breno Miranda está na página Home
And o usuário Breno Miranda apertou no botão fazer publicação
When o usuário Breno Miranda selecionar o botão referente a arquivos
Then o usuário selecionará uma imagem do seu computador
When o usuário selecionar e confirmar o arquivo
Then uma imagem deve aparecer na postagem
And o usuário deverá ser promptado com um input para a legenda
When o usuário apertar o botão Publicar
Then a imagem deve ser enviada ao seu histórico de postagens
And a legenda deve estar associada a esta publicação.

Cenário: Publicar um vídeo
Given o usuário Breno Miranda está na página Home
And o usuário Breno Miranda apertou no botão fazer publicação
When o usuário Breno Miranda selecionar o botão referente ao vídeo
Then o usuário selecionará um vídeo do seu computador
When o usuário selecionar e confirmar o arquivo
Then uma imagem deve aparecer na postagem
And o usuário deverá ser promptado com um input para a legenda
When o usuário apertar o botão Publicar
Then a imagem deve ser enviada ao seu histórico de postagens
And a legenda deve estar associada a esta publicação.