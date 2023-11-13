const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const connection = require('./database/database');
const checkLogin = require('./middleware/checkLogin');

// Setup do ambiente
// Carregando View engine EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Sessions
app.use(session({
  secret: 'fantasywhisper',
  cookie: {
    maxAge: 1200000,
  },
  resave: false,
  saveUninitialized: false
}));

// Ativar os arquivos estáticos ex:css
app.use(express.static(path.join(__dirname, 'public')));

// Banco de Dados
connection.authenticate()
          .then(() => {
            console.log('Conexão feita com sucesso!');
          })
          .catch(erro => {
            console.log('Problemas na conexão!');
          })

// Parser de formulários
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Models
const Usuario = require('./models/usuario');
const Genero = require('./models/genero');
const Autor = require('./models/autor');
const Historia = require('./models/historia');

// Importar Rotas
const usuarioRoute = require('./routes/usuarioRoute');
const generoRoute = require('./routes/generoRoute');
const autorRoute = require('./routes/autorRoute');
const historiaRoute = require('./routes/historiaRoute');

// Rotas
app.get('/', (req, res, next) => {
  res.render('app');
});

//Rota da página Home
app.get('/home', (req, res, next) => {
  res.render('home');
});

//Rota da página login
app.get('/login', (req, res, next) => {
res.render('login', {msg:''});
});

app.post('/login', (req, res, next) => {
res.render('login', {msg:''});
});

//Rota da página Genero 
app.get('/gender', (req, res, next) =>{
  res.render('gender');
});

//Rota da página Histórias
app.get('/story', (req, res, next) =>{
  res.render('story');
});

app.use('/usuarios', usuarioRoute);
app.use('/generos', generoRoute);
app.use('/autores', autorRoute);
app.use('/historias', historiaRoute);

module.exports = app;