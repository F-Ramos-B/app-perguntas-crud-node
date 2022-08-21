/* import moment from 'moment'; */
import { DataTypes, Sequelize } from 'sequelize';

import { BaseEntity } from './base-entity';

/* export interface Pergunta extends BaseEntity {
  titulo: string;
  descricao: string;
} */

export class Pergunta extends BaseEntity<Pergunta> {
  declare titulo: string;
  declare descricao: string;
}

const sequelize: Sequelize = require('../../../config/db/db-config');

Pergunta.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      field: 'CD_PERGUNTA',
      defaultValue: DataTypes.UUIDV4,
    },
    titulo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'NO_PERGUNTA',
    },
    descricao: {
      type: DataTypes.STRING(250),
      allowNull: false,
      field: 'DS_PERGUNTA',
    },
    dataAlteracao: { type: DataTypes.DATE, field: 'DT_ALTERACAO' },
    dataCriacao: {
      type: DataTypes.DATE,
      field: 'DT_CRIACAO',
/*       get() {
        const rawValue = this.getDataValue('dataCriacao');
        return moment(rawValue).format('DD/MM/YYYY');
      }, */
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: 'TB_PERGUNTA',
    createdAt: 'DT_CRIACAO',
    updatedAt: 'DT_ALTERACAO',
  }
);

Pergunta.sync({ force: false }).then(() =>
  console.log('Tabela PERGUNTA sincronizada')
);

/* const PerguntaModel = sequelize.define<Pergunta>(
  'TB_PERGUNTA',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      field: 'CD_PERGUNTA',
      defaultValue: DataTypes.UUIDV4,
    },
    titulo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'NO_PERGUNTA',
    },
    descricao: {
      type: DataTypes.STRING(250),
      allowNull: false,
      field: 'DS_PERGUNTA',
    },
  },
  { createdAt: 'dataCriacao', updatedAt: 'dataAlteracao' }
);

PerguntaModel.sync({ force: false }).then(() =>
  console.log('Tabela PERGUNTA criada')
);

module.exports = PerguntaModel; */
