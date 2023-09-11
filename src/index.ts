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

Todo.sync();


app.post('/todo/:value', function (req, res) {
    let taskValue: string = req.params.value;
    Todo.create({nomTache: `${taskValue}`, status: false})
    res.send(taskValue)
})

app.put('/true/:task', function (req, res) {
    let taskStatus: string = req.params.task;
    Todo.update({status: true}, {
        where: {
            nomTache: taskStatus,
        }
    })
    res.send("updated")
})

app.put('/false/:task', function (req, res) {
    let taskStatus: string = req.params.task;
    Todo.update({status: false}, {
        where: {
            nomTache: taskStatus,
        }
    })
    res.send("updated")
})

app.delete('/delete/:task', function (req, res) {
    let task: string = req.params.task;
    Todo.destroy({
        where: {
            nomTache: task,
        }
    })
    res.send("deleted")
});

app.get('/getall', function (_, res) {
    const allTasks = Todo.findAll().toString();
    res.send(allTasks)
})

app.delete('/removeall', function (_, res) {
    Todo.truncate();
    res.send("all tasks deleted")
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
