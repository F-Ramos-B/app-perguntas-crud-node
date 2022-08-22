import { Resposta } from './src/models/Resposta';
import { FormResposta } from './src/models/form-resposta';
import { Pergunta } from './src/models/Pergunta';
import { FormPergunta } from './src/models/form-pergunta';
import { Partials } from './src/enums/partials';
import { Views } from './src/enums/views';
import express, { Express, Request, Response } from 'express';
import { Sequelize } from 'sequelize/types';
import { BodyParser } from 'body-parser';
import moment from 'moment';

//------------CONFIG------------

const port = 9336;
const app: Express = express();
const bodyParser: BodyParser = require('body-parser');
const sqlize: Sequelize = require('../config/db/db-config'); // tomar cuidado com imports locais quando usado typescript com outDir

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
sqlize
  .authenticate()
  .then(() => console.table(sqlize.config))
  .catch((error) => console.error(error));

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});

app.get('/status', (req: Request, res: Response) => {
  res.send('UP');
});

//------------CONFIG------------

app.get('/exemplo', (req: Request, res: Response) => {
  const [nome, lang] = ['Francielle', 'Typescript'];
  const cores = ['vermelho', 'verde', 'rosa', 'azul'];
  res.render(Views.EXEMPLO, { nome, lang, cores, exibir: true });
});

app.get('/', async (req: Request, res: Response) => {
  const perguntas: Pergunta[] = await Pergunta.findAll({
    raw: true,
    order: [['DT_CRIACAO', 'desc']],
  });
  console.log('Carregando perguntas', perguntas);

  res.render(Views.INDEX, {
    pagina: Partials.LISTAR_PERGUNTAS,
    perguntas,
    moment,
  });
});

app.get('/listar-respostas/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log('id recebido', id);

  const pergunta = await Pergunta.findByPk(id);

  if (!pergunta) {
    res.redirect('/');
  }

  const respostas: Resposta[] = await Resposta.findAll({
    where: { idPergunta: id },
    raw: true,
    order: [['DT_CRIACAO', 'asc']]
  });

  console.log(`Respostas da pergunta ${id}`, respostas);

  res.render(Views.INDEX, {
    pagina: Partials.LISTAR_RESPOSTAS,
    pergunta,
    respostas,
    moment,
  });
});

app.get('/criar-pergunta', (req: Request, res: Response) => {
  res.render(Views.INDEX, { pagina: Partials.PERGUNTA });
});

app.get(
  '/responder/:id',
  async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    console.log('id recebido', id);

    const pergunta = await Pergunta.findByPk(id);

    if (!pergunta) {
      res.redirect('/');
    }

    res.render(Views.INDEX, { pagina: Partials.RESPONDER, pergunta });
  }
);

app.post(
  '/pergunta-criada',
  (req: Request<{}, {}, FormPergunta>, res: Response) => {
    console.table(req.body);
    const { titulo, descricao } = req.body;

    Pergunta.create({ titulo, descricao }).then(() =>
      res.render(Views.INDEX, { pagina: Partials.SUCESSO_PERGUNTA })
    );
  }
);

app.post(
  '/resposta-criada',
  (req: Request<{}, {}, FormResposta>, res: Response) => {
    console.table(req.body);
    const { idPergunta, corpo } = req.body;

    Resposta.create({ idPergunta, corpo }).then(() =>
      res.render(Views.INDEX, { pagina: Partials.SUCESSO_RESPOSTA })
    );
  }
);
