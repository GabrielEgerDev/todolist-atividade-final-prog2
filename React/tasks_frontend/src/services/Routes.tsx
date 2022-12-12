import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom'

import Home from '../pages/Home'
import Tasks from '../pages/Tasks'
import TasksForm from '../pages/Tasks/Form'
import TasksDetail from '../pages/Tasks/Detail'
import { RequireAuth } from '../contexts/Auth/requireAuth';

const AppRoutes: React.FC = () => {
    return(
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/tarefas' element={<RequireAuth><Tasks/></RequireAuth>}/>
            <Route path='/tarefas_cadastro' element={<RequireAuth><TasksForm/></RequireAuth>}/>
            <Route path='/tarefas_cadastro/:id' element={<RequireAuth><TasksForm/></RequireAuth>}/>
            <Route path='/tarefas/:id' element={<RequireAuth><TasksDetail/></RequireAuth>}/>
        </Routes>



        // <Routes>
        //     <Route path='/' element={<Home/>}/>
        //     <Route path='/tarefas' element={<Tasks/>}/>
        //     <Route path='/tarefas_cadastro' element={<TasksForm/>}/>
        //     <Route path='/tarefas_cadastro/:id' element={<TasksForm/>}/>
        //     <Route path='/tarefas/:id' element={<TasksDetail/>}/>
        // </Routes>
    );
}

export default AppRoutes;