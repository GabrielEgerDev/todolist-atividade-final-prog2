import { Router, Request, Response } from 'express'

import { getTasks, saveTask, getTask, updateTask, finishTask, deleteTask } from "./controller/TasksController"

const routes = Router()

routes.get('/', (request: Request, response: Response) => {
    return response.json({ message: 'Hello World!'})
})

routes.get('/tasks', getTasks)
routes.get('/tasks/:id', getTask)
routes.post('/tasks', saveTask)
routes.put('/tasks/:id', updateTask)
routes.patch('/tasks/:id', finishTask)
routes.delete('/tasks/:id', deleteTask)

export default routes