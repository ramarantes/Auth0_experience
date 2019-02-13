const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');


const app = express();

const questions = [];

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://ramarantes.auth0.com/.well-known/jwks.json`
    }),
  
    // Validate the audience and the issuer.
    audience: 'JoroSWgijQi8cTn2mjCMrLTCUCWXrjI8',
    issuer: `https://ramarantes.auth0.com/`,
    algorithms: ['RS256']
  });
  

// retrieve all questions
app.get('/', (req, res) => {
    const qs = questions.map(q => ({
      id: q.id,
      title: q.title,
      description: q.description,
      answers: q.answers.length,
    }));
    res.send(qs);
  });
  
  // get a specific question
  app.get('/:id', (req, res) => {
    const question = questions.filter(q => (q.id === parseInt(req.params.id)));
    if (question.length > 1) return res.status(500).send();
    if (question.length === 0) return res.status(404).send();
    res.send(question[0]);
  });
  
  // insert a new question
  app.post('/', checkJwt, (req, res) => {
      console.log('req',req.body);
    const {title, description} = req.body;
    const newQuestion = {
      id: questions.length + 1,
      title,
      description,
      answers: [],
      author: req.user.name
    };
    questions.push(newQuestion);
    //console.log(questions.map(x => `question: ${x.title}`));
    res.status(200).send();
  });
  
  // insert a new answer to a question
  app.post('/answer/:id',checkJwt, (req, res) => {
    const {answer} = req.body;
  
    const question = questions.filter(q => (q.id === parseInt(req.params.id)));
    if (question.length > 1) return res.status(500).send();
    if (question.length === 0) return res.status(404).send();
  
    question[0].answers.push({
      answer,
      author: req.user.name,
    });
    console.log('req.user (jwt token by express-jwt)', req.user);
  
    res.status(200).send();
  });
  
  // start the server
  app.listen(8081, () => {
    console.log('listening on port 8081');
  });