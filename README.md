<h1 align="center">
  <img alt="shooferta.it" title="shooferta.it" src=".github/logo.png" />
</h1>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-layout">Layout</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-executar">Como executar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-licença">Licença</a>
</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=8257E5&labelColor=000000">

 <img src="https://img.shields.io/static/v1?label=SHOOFERTA&message=04&color=8257E5&labelColor=000000" alt="Shooferta" />
</p>

<br>

<p align="center">
  <img alt="Shooferta" src=".github/shooferta.png" width="100%">
</p>

## ✨ Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [NodeJS](https://nodejs.org/en/download/)
- [TypeScript](https://www.typescriptlang.org/)

## 💻 Projeto

O shooferta é um app que desencolvido para ser um ecommerce.

## 🔖 Layout

Você pode visualizar o layout do projeto através [desse link](https://www.figma.com/file/). É necessário ter conta no [Figma](http://figma.com/) para acessá-lo.

## 🚀 Como executar

- Clone o repositório
- Instale as dependências com `yarn`
- Inicie o servidor com `yarn dev`


### Start

In detached/background mode using `-d` (recommended)

```
sudo chown -R $USER:$USER .
apt install docker-compose
docker-compose up -d
# To see logs
docker-compose logs -f
```

In attached mode, the logs will be streamed in the terminal:

```
docker-compose up
```

### Stop

```
docker-compose down
```

### Delete all

```
docker-compose down -v --rmi all --remove-orphans
```


# Recuperação de senha

**RF**

- O usuário deve poder recuperar sua senha informando seu email;
- O usuário deve poder receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF**

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN**

- O link envaido por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização do perfil

**RF**

- O usuário deve poder atualizar seu nome, email e senha;

**RN**

- O usuário não pode alterar seu email para um email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuario precisa confirmar sua nova senha.

# Painel do prestador

**RF**

- O usuário dever listar seus agendamentos de um dia específico;
- O prestador deve receber uma notficação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**

- A notificação dever ter um status de lida ou não-lida pra que o prestador possa controlar;


# Agendamento de serviços

**RF**

- O usuário deve poder listar  todos prestadores de serviço cadastrados;
- O usuario deve pode lista os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponiveis em um dia específico de um prestador;
- O usuario deve poder ralizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos deve estar disponíveis entre 08h às 18h (Primeiro às 8h, último às 17h);
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviçoes consigo mesmo;
- O usuário não pode agendar um horário já ocupado;
