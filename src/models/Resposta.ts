import { Pergunta } from './Pergunta';
import { DataTypes, Sequelize } from 'sequelize';

import { BaseEntity } from './base-entity';

/* export interface Pergunta extends BaseEntity {
  titulo: string;
  descricao: string;
} */

export class Resposta extends BaseEntity<Resposta> {
  declare corpo: string;
  declare idPergunta: string;
}

const sequelize: Sequelize = require('../../../config/db/db-config');

Resposta.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      field: 'CD_RESPOSTA',
      defaultValue: DataTypes.UUIDV4,
    },
    corpo: {
      type: DataTypes.STRING(250),
      allowNull: false,
      field: 'DS_RESPOSTA',
    },
    idPergunta: {
      type: DataTypes.UUID,
      references: { model: Pergunta, key: 'CD_PERGUNTA' },
      field: 'CD_PERGUNTA',
      allowNull: false,
    },
    dataAlteracao: { type: DataTypes.DATE, field: 'DT_ALTERACAO' },
    dataCriacao: {
      type: DataTypes.DATE,
      field: 'DT_CRIACAO',
    },
  },
  {
    sequelize,
    timestamps: true,
    tableName: 'TB_RESPOSTA',
    createdAt: 'DT_CRIACAO',
    updatedAt: 'DT_ALTERACAO',
  }
);

Resposta.sync({ force: false }).then(() =>
  console.log('Tabela Resposta sincronizada')
);
