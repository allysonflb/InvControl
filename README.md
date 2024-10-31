<h1>InvControl - Dashboard de Gerenciamento de Estoque</h1>

<p>Este projeto é um dashboard para gerenciamento de estoque, desenvolvido com Laravel no backend e React no frontend.</p>

<hr/>

<h2>Interface do Frontend</h2>

<p>Login:</p>
<img src="screenshots/login.png" alt="Interface do Frontend - Login" width="600"/>
<p>Criar conta:</p>
<img src="screenshots/criarconta.png" alt="Interface do Frontend - Criar conta" width="600"/>
<p>Esqueci a senha:</p>
<img src="screenshots/esquecisenha.png" alt="Interface do Frontend - Esqueci a senha" width="600"/>
<p>Dashboard:</p>
<img src="screenshots/dashboard.png" alt="Interface do Frontend - Dashboard" width="600"/>

<hr/>

<h2>Testes Unitários</h2>

<p>Testes unitários executados no Laravel:</p>
<img src="screenshots/phptests.png" alt="Testes do backend" width="600"/>

<h2>Tecnologias Utilizadas</h2>
<div>
    <h3>Backend:</h3>
    <p>Laravel 10x</p>
    <img src="https://img.icons8.com/?size=100&id=hUvxmdu7Rloj&format=png&color=000000" height="30" width="32" alt="Laravel logo" />
    <img src="https://img.icons8.com/?size=100&id=38561&format=png&color=000000" height="30" width="32" alt="Laravel logo" />
    <h3>Frontend:</h3>
    <p>React com VITE e template <a href="https://github.com/design-sparx/antd-multipurpose-dashboard">antd-multipurpose-dashboard</a></p>
    <img src="https://img.icons8.com/?size=100&id=NfbyHexzVEDk&format=png&color=000000" height="30" width="32" alt="React logo" />
    <img src="https://img.icons8.com/?size=100&id=dJjTWMogzFzg&format=png&color=000000" height="30" width="32" alt="VITE logo" />
</div>

<hr/>

<h2>Procedimentos de Instalação</h2>

<h3>Backend</h3>
<ol>
    <li><strong>Banco de Dados</strong>: PostgreSQL</li>
    <li><strong>Pré-requisitos:</strong> 
        <ul>
            <li>Instalar <a href="https://www.apachefriends.org/index.html">XAMPP</a> (Windows) ou PHP (Linux, macOS).</li>
            <li>Instalar <a href="https://getcomposer.org/">Composer</a>.</li>
        </ul>
    </li>
    <li><strong>Instalação:</strong>
        <ul>
            <li>Clonar o projeto.</li>
            <li>Na raiz do projeto, executar:
                <pre><code>composer update</code></pre>
            </li>
        </ul>
    </li>
    <li><strong>Configuração do Banco de Dados:</strong>
        <ul>
            <li>Criar um banco de dados chamado <code>invcontrol</code> com senha <code>1234</code>.</li>
            <li>Executar as migrações com:
                <pre><code>php artisan migrate</code></pre>
            </li>
        </ul>
    </li>
</ol>

<h3>Frontend</h3>
<ol>
    <li>Navegar até a pasta do frontend <code>reactinvcontrol</code>.</li>
    <li>Executar o comando:
        <pre><code>cp .env.example .env</code></pre>
    </li>
    <li>Gerar a chave de autenticação do Laravel com:
        <pre><code>php artisan key:generate</code></pre>
    </li>
    <li>Ajustar o arquivo <code>.env</code> para incluir apenas <code>APP_KEY</code> e as configurações do banco de dados.</li>
    <li>Instalar as dependências com:
        <pre><code>npm run install:legacy</code></pre>
    </li>
    <li>Configurar a rota do backend em <code>src/global.ts</code> (ajustes podem ser necessários para ambientes Windows).</li>
    <li>Executar o projeto:
        <pre><code>npm run dev</code></pre>
    </li>
</ol>

