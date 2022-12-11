import React, { useState, useEffect, ReactChild, ReactChildren } from 'react';
import { Badge, Table, Button } from 'react-bootstrap';
import api from '../../services/api'

import moment from 'moment'

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

    useEffect(() => {
        loadTasks()
    }, [])

    async function loadTasks() {

        const response = await api.get('/tasks')
        console.log(response)
        setTasks(response.data)
    }

    function formateDate(date: Date) {
        return moment(date).format("DD/MM/YY - HH:MM")
    }

    return(
        <div className="container">
            <br/>
            <h1>Tasks Page</h1>
            <br/>
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
                                <Badge bg={ task.finished ? "success" : "warning" } text="dark">
                                    { task.finished ? "FINALIZADO" : "PENDENTE" }
                                </Badge>
                                </></td>
                                <td><>
                                    <Button size="sm" variant="secondary">Editar</Button>{' '}
                                    <Button size="sm" variant="primary">Visualizar</Button>{' '}
                                    <Button size="sm" variant="success">Finalizar</Button>{'  '}
                                    <Button size="sm" variant="danger">Remover</Button>{' '}
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