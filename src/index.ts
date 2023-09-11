import 'dotenv/config'
import express from 'express'
import { Sequelize, DataTypes } from 'sequelize';

let app = express();
const port = parseInt(process.env.PORT as string);
const database = process.env.DATABASE as string;
const username = process.env.USERNAME as string;
const password = process.env.PASSWORD as string;
const server = process.env.SERVER as string;

const sequelize = new Sequelize(database, username, password, {
    dialect: 'mssql',
    host: server,
    dialectOptions: {
      // Observe the need for this nested `options` field for MSSQL
      options: {
        // Your tedious options here
        useUTC: false,
        dateFirst: 1
      }
    }
});

async function connexionTest() {
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connexionTest();

const Todo = sequelize.define('Todo', {
    nomTache: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.BOOLEAN
    }
})

Todo.sync({force: true});


app.get('/todo/:value', function (req, res) {
    let taskValue: string = req.params.value;
    Todo.create({nomTache: `${taskValue}`, status: false})
    res.send(`${taskValue}`)
})

app.get('/todo/:checked', function (req, res) {
    let taskStatus: string = req.params.checked;
    Todo.update({status: true}, {
        where: {
            nomTache: taskStatus,
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
