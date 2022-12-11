import { AppDataSource } from "../index"
import { Tasks } from "../entity/tasks"
import { Request, Response } from "express"
import { StringDecoder } from "string_decoder"
import { isDataView } from "util/types"


// Obtendo todas as tasks
export const getTasks = async (request: Request, response: Response) => {

    const tasks = await AppDataSource.getRepository(Tasks).find()
    return response.json(tasks)

};


// Obtendo task por id
export const getTask = async (request: Request, response: Response) => {
    const id = Number(request.params.id)
    const task = await AppDataSource.getRepository(Tasks).findOneBy({id})

    if (task != null) {
        return response.json(task)
    }
    
    return response.status(404).json({ message: "Task not found!"})
};


// Salvando task no banco de dados
export const saveTask = async (request: Request, response: Response) => {
    const task = await AppDataSource.getRepository(Tasks).save(request.body)
    return response.json(task)
};


// Atualizando tasks
export const updateTask = async (request: Request, response: Response) => {
    const id = Number(request.params.id)
    const task = await AppDataSource.getRepository(Tasks).update(id, request.body)

    if (task.affected == 1) {
        const taskUpdated = await AppDataSource.getRepository(Tasks).findOneBy({id})
        return response.json(taskUpdated)
    }

    return response.status(404).json({ message: "Task not found!"})

};

// Finalizando tasks
export const finishTask = async (request: Request, response: Response) => {
    const id = Number(request.params.id)
    const task = await AppDataSource.getRepository(Tasks).update(id, {
        finished: true
    })

    if (task.affected == 1) {
        const taskUpdated = await AppDataSource.getRepository(Tasks).findOneBy({id})
        return response.json({message: "Task finished"})
    }

    return response.status(404).json({ message: "Task not found!"})

};

// Reativando tasks
export const unfinishTask = async (request: Request, response: Response) => {
    const id = Number(request.params.id)
    const task = await AppDataSource.getRepository(Tasks).update(id, {
        finished: false
    })

    if (task.affected == 1) {
        const taskUpdated = await AppDataSource.getRepository(Tasks).findOneBy({id})
        return response.json({message: "Task unfinished"})
    }

    return response.status(404).json({ message: "Task not found!"})

};

// Deletando tasks
export const deleteTask = async (request: Request, response: Response) => {
    const id = Number(request.params.id)
    const task = await AppDataSource.getRepository(Tasks).delete(id)

    if (task.affected == 1) {
        const taskUpdated = await AppDataSource.getRepository(Tasks).findOneBy({id})
        return response.json({message: "Task deleted!"})
    }

    return response.status(404).json({ message: "Task not found!"})

};