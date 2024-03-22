import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import DiarySignIn from './DiarySignIn';
import DiarySignUp from './DiarySignUp';
import DiaryMain from './DiaryMain';

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<DiarySignIn />} />
        <Route path='/signup' element={<DiarySignUp />} />
        <Route path='/main' element={<DiaryMain />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default Router;
