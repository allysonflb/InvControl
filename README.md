Procedimentos de instalação do projeto:

Backend:
* Banco -> Postgres
* Instalar XAMP(Windows) Ou PHP (Linux, MacOS)
* Instalar composer
* Clonar o projeto
* Na raiz do projeto rodar o comando composer update
* Setup do Banco:
* * Criar banco com o nome invcontrol e senha 1234
* Rodar o comando php artisan migrate

FrontEnd:
* Acessar a raiz do frontend na pasta reactinvcontrol, rodar o comando cp .env.example .env
* Gerar uma key de autenticaçao do artisan com o comando php artisan key:generate
* Deixar no env apenas a estrutura de APP Key e a parte de DB, configurando corretamente para o banco do projeto.
* Rodar o comando npm run install:legacy e aguardar a finalização da instalação
* Realizar o setup da rota de backend em src/global.ts , caso seja windows é diferente do que está no projeto.
* Rodar o projeto com npm run dev


