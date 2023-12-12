import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './css/App.css';

import DefaultLayout from './components/Outlet';
import Homepage from './pages/Homepage';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import PostShow from './pages/PostShow';

export default function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route index element={<Homepage />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/blog/:id' element={<PostShow />} />
            <Route path='/contact' element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

