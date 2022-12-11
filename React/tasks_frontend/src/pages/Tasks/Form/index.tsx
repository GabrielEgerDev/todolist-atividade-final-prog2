import React, { useState, useEffect, ReactChild, ReactChildren, ChangeEvent } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../services/api';

import './index.css';

interface ITask {
    title: string;
    description: string;
}

const Tasks: React.FC = () => {

    let navigate = useNavigate()
    const { id } = useParams()

    const [model, setModel] = useState<ITask>({
        title: "",
        description: ""
    })

    useEffect(() => {
        if (id != undefined) {
            findTask(id)
        }
    }, [id])

    function updateModel (e: ChangeEvent<HTMLInputElement>) {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit (e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        if (id != undefined) {
            const response = await api.put(`/tasks/${id}`, model)
        } else {
            const response = await api.post("/tasks", model)
        }

        back()

    }

    async function findTask(id: string | undefined) {
        const response = await api.get(`tasks/${id}`)
        setModel({
            title: response.data.title,
            description: response.data.description
        })
    }

    function back() {
        navigate('/tarefas')
    }

    return(
        <div className="container">
            <br/>
            <div className="task-header">
                <h1>New Task</h1>
                <Button size="sm" variant="dark" onClick={back}>VOLTAR</Button>
            </div>
            <br/>

            <div className="container">
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Título</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={model.title}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={model.description}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}
                        />
                    </Form.Group>
                    <Button variant="dark" type="submit">
                        Adicionar
                    </Button>
                </Form>
            </div>

        </div>
    );
}

export default Tasks;