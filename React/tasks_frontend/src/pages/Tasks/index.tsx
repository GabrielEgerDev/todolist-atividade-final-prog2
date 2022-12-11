import React, { useState, useEffect, ReactChild, ReactChildren } from 'react';
import { Badge, Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

import moment from 'moment';

import './index.css';

interface ITask {
    id: number;
    title: string;
    description: string;
    finished: boolean;
    created_at: Date;
    updated_at: Date;
}

const Tasks: React.FC = () => {

    const [tasks, setTasks] = useState<ITask[]>([])
    let navigate = useNavigate()

    useEffect(() => {
        loadTasks()
    }, [])

    async function loadTasks() {
        const response = await api.get('/tasks')
        console.log(response)
        setTasks(response.data)
    }

    async function finishTask(id: number) {
        await api.patch(`/tasks/f/${id}`)
        loadTasks()
    }

    async function unfinishTask(id: number) {
        await api.patch(`/tasks/unf/${id}`)
        loadTasks()
    }

    async function deleteTask(id: number) {
        await api.delete(`/tasks/${id}`)
        loadTasks()
    }

    function formateDate(date: Date) {
        return moment(date).format("DD/MM/YYYY - HH:mm")
    }

    function newTask() {
        navigate('/tarefas_cadastro')
    }

    function editTask(id: number) {
        navigate(`/tarefas_cadastro/${id}`)
    }

    function viewTask(id: number) {
        navigate(`/tarefas/${id}`)
    }

    return(
        <div className="container">
            <br/><br/>
            <div className="task-header">
                <h1>Tasks Page</h1>
                <Button size="sm" variant="dark" onClick={newTask}>ADICIONAR TAREFA</Button>
            </div>
            <br/><br/>
            <Table striped bordered hover className='text-center'>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Título</th>
                    <th>Data de atualização</th>
                    <th>Status</th>
                    <th>Ações</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        tasks.map(task => (
                            <tr key={task.id}>
                                <td> <>{task.id}</> </td>
                                <td> <>{task.title}</> </td>
                                <td> <>{formateDate(task.updated_at)}</> </td>
                                <td><>
                                <Badge bg={ task.finished ? "success" : "warning" } text={ task.finished ? "light" : "dark" }>
                                    { task.finished ? "FINALIZADO" : "PENDENTE" }
                                </Badge>
                                </></td>
                                <td><>
                                    <Button size="sm" disabled={task.finished} variant="secondary" onClick={() => editTask(task.id)}>Editar</Button>{' '}
                                    <Button size="sm" variant="primary" onClick={() => viewTask(task.id)}>Visualizar</Button>{' '}
                                    <Button size="sm" className={task.finished ? "d-none" : ""} disabled={task.finished} variant="success" onClick={() => finishTask(task.id)}>Finalizar</Button>{'  '}
                                    <Button size="sm" className={!task.finished ? "d-none" : ""} disabled={!task.finished} variant="warning" onClick={() => unfinishTask(task.id)}>Reativar</Button>{'  '}
                                    <Button size="sm" variant="danger" onClick={() => deleteTask(task.id)}>Remover</Button>{' '}
                                </></td>
                            </tr>
                        ))
                    }

                </tbody>
            </Table>
        </div>

    );
}

export default Tasks;