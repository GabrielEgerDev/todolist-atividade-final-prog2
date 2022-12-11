import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'

import Home from '../pages/Home'
import Tasks from '../pages/Tasks'
import TasksForm from '../pages/Tasks/Form'

const AppRoutes: React.FC = () => {
    return(
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/tarefas' element={<Tasks/>}/>
            <Route path='/tarefas_cadastro' element={<TasksForm/>}/>
            <Route path='/tarefas_cadastro/:id' element={<TasksForm/>}/>
        </Routes>
    );
}

export default AppRoutes;