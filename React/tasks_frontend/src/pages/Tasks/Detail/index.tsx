import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { Badge, Button, Card} from "react-bootstrap";
import moment from "moment";

import './index.css';
import api from "../../../services/api";

interface ITask {
    id: number;
    title: string;
    description: string;
    finished: boolean;
    created_at: Date;
    updated_at: Date;
}

const Detail: React.FC = () => {

    let navigate = useNavigate()
    const { id } = useParams()
    const [task, setTask] = useState<ITask>()

    useEffect(() => {
        findTask()
    }, [id])

    function back() {
        navigate("/tarefas")
    }

    async function findTask() {

        const response = await api.get<ITask>(`/tasks/${id}`)
        console.log(response)

        setTask(response.data)

    }

    function formateDate(date: Date | undefined) {
        return moment(date).format("DD/MM/YYYY - HH:mm")
    }

    return(
        <div className="container">
            <br/><br/>
            <div className="task-header">
                <h1>Tasks Detail</h1>
                <Button size="sm" variant="dark" onClick={back}>VOLTAR</Button>
            </div>
            <br/><br/>

            <Card>
                <Card.Body>
                    <Badge bg={ task?.finished ? "success" : "warning" } text={ task?.finished ? "light" : "dark" }>
                        { task?.finished ? "FINALIZADO" : "PENDENTE" }
                    </Badge>
                    <br/><br/>
                    <Card.Title className="title"> {task?.title} </Card.Title>
                    <Card.Text className="description">
                    {task?.description}
                    </Card.Text>
                    <span>CADASTRADA EM: 
                        <Badge bg="primary">
                            <>{formateDate(task?.created_at)}</>
                        </Badge>
                    </span>
                    <br/>
                    <span>ATUALIZADA EM:
                        <Badge bg="primary">
                            <>{formateDate(task?.updated_at)}</>
                        </Badge>
                    </span>
                    <br/><br/>
                </Card.Body>
            </Card>
            
        </div>
    );
}

export default Detail;





// import React from "react";

// const Detail: React.FC = () => {
//     return(

//     );
// }

// export default Detail;