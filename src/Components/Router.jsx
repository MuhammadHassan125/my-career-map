import { Route, Routes } from "react-router-dom"
import Login from '../Pages/Login'
import Register from '../Pages/Register'
import MainLayout from '../Layouts/MainLayout'
import Dashboard from '../Pages/Dashboard'
import Documents from '../Pages/Documents'
import UploadDocuments from '../Pages/UploadDocuments';
import Recommendations from '../Pages/Recommendations';
import MapCareer from '../Pages/MapCareer/MapCareer';
import MapSinglePath from '../Pages/MapSinglePath'
import MapZoom from '../Pages/MapZoom'
import MapSelectedPath from '../Pages/MapSelectedPath'
import Path from '../Pages/Path'
import ListCareerPath from '../Pages/ListCareerPath'
import GuestRoute from "./GuestRoute"
import AuthRoute from "./AuthRoute"

const Router = () => {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
      </Route>
      <Route element={<AuthRoute />}>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Dashboard />} index={true} />
          <Route path='documents' element={<Documents />} />
          <Route path='documents-upload' element={<UploadDocuments />} />
          <Route path='recommendations' element={<Recommendations />} />
          <Route path='map-career' element={<MapCareer />} />
          <Route path='map-single-path' element={<MapSinglePath />} />
          <Route path='map-zoom' element={<MapZoom />} />
          <Route path='map-selected-path' element={<MapSelectedPath />} />
          <Route path='path' element={<Path />} />
          <Route path='list-career-path' element={<ListCareerPath />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default Router