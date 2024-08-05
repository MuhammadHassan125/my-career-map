import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../auth/login/index'
import Register from '../auth/register/index'
import Layout from '../Layout'
import Dashboard from '../dashboard/Dashboard'
import Documents from '../dashboard/Documents'
import UploadDocuments from '../dashboard/UploadDocuments';
import Recommendations from '../dashboard/Recommendations';
import MapCareer from '../dashboard/MapCareer/MapCareer';
import MapSinglePath from '../dashboard/MapSinglePath'
import MapZoom from '../dashboard/MapZoom'
import MapSelectedPath from '../dashboard/MapSelectedPath'
import Path from '../dashboard/Path'
import ListCareerPath from '../dashboard/ListCareerPath'
const AppRouter = () => {
  return (
    <React.Fragment>
        <BrowserRouter>
            <Routes>
                <Route path='/' axact element={<Login/>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='register' element={<Register/>}/>
                <Route element={<Layout/>}>
                  <Route path='dashboard' element={<Dashboard/>} index={true}/>
                  <Route path='documents' element={<Documents/>}/>
                  <Route path='documents-upload' element={<UploadDocuments/>} />
                  <Route path='recommendations' element={<Recommendations/>} />
                  <Route path='map-career' element={<MapCareer/>} />
                  <Route path='map-single-path' element={<MapSinglePath/>} />
                  <Route path='map-zoom' element={<MapZoom/>}/>
                  <Route path='map-selected-path' element={<MapSelectedPath/>}/>
                  <Route path='path' element={<Path/>}/>
                  <Route path='list-career-path' element={<ListCareerPath/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </React.Fragment>
  )
}

export default AppRouter