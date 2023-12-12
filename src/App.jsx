import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './css/App.css'

import DefaultLayout from './components/Outlet'
import Homepage from './pages/Homepage'
import Blog from './pages/Blog'
import Post from './pages/Post'
import Contact from './pages/Contact'

export default function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<Homepage />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/blog/:id' element={<Post />} />
            <Route path='/contact' element={<Contact />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

