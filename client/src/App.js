import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from "./hooks/useAuthContext";

// pages and components
import "./index.css"
import NavBar from "./components/Navbar";
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminHome from './pages/AdminHome';
import UserHome from './pages/UserHome';
import EditSurvey from "./pages/EditSurvey";
import EditQuestion from "./pages/EditQuestion";
import AddSurvey from "./pages/AddSurvey";
import QuestionOverview from './pages/QuestionOverview';
import UserSurvey from './pages/UserSurvey';
import UserSurveyStart from './pages/UserSurveyStart';
import UserSurveyEnd from './pages/UserSurveyEnd';
import AnswerOverview from './pages/AnswersOverview';
import AdminLanding from './pages/AdminLanding';
import AllQuestions from './pages/AllAnswers';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <div className="pages">
          <Routes>
            <Route 
            path="/" 
            element={user ? user.role === "admin" ? <Navigate to="/Admin"/> : <Navigate to="/User"/> : <Navigate to="/login"/>}
            />
            <Route
            path="/User"
            element={user ? user.role === "user" ? <UserHome/> : <Navigate to="/Admin"/> : <Navigate to="/login"/>}
            />
            <Route
            path='/Admin'
            element={user ? user.role === "admin" ? <AdminLanding/> : <Navigate to="/User"/> : <Navigate to="/login"/>}	
            />
            <Route 
            path="/survey" 
            element={user ? user.role === "admin" ? <AdminHome/> : <Navigate to="/User"/> : <Navigate to="/login"/>}
            />
            <Route path="/questions"
            element={user ? user.role === "admin" ? <QuestionOverview/> : <Navigate to="/User"/> : <Navigate to="/login"/>}
            />
            <Route
            path="/survey/:id/edit"
            element={user ? user.role === "admin" ? <EditSurvey /> : <Navigate to="/User"/> : <Navigate to="/login"/>}
            />
            <Route
            path="/survey/new"
            element={user ? user.role === "admin" ? <AddSurvey /> : <Navigate to="/User"/> : <Navigate to="/login"/>}
            />
            <Route
            path="/survey/:id/edit/:ques_id"
            element={user ? user.role === "admin" ? <EditQuestion /> : <Navigate to="/User"/> : <Navigate to="/login"/>}
            />
            <Route
            path="/questions/:id"
            element={user ? user.role === "admin" ? <EditQuestion /> : <Navigate to="/User"/> : <Navigate to="/login"/>}
            />
            <Route 
            path="/login" 
            element={!user ? <Login/> : <Navigate to="/"/>}
            />
            <Route 
            path="/signup" 
            element={!user ? <Signup/> : <Navigate to="/"/>}
            />
            <Route
            path="/survey/:id/:index"
            element={!user ? <Navigate to="/login"/> : <UserSurvey/>}
            />
            <Route
            path="/survey/:id"
            element={!user ? <Navigate to="/login"/> : <UserSurveyStart/>}
            />
            <Route
            path="/survey/:id/end"
            element={!user ? <Navigate to="/login"/> : <UserSurveyEnd/>}
            />
            <Route
            path='/answers'
            element={user ? user.role === "admin" ? <AllQuestions/> : <Navigate to="/"/> : <Navigate to="/login"/>}
            />
            <Route
            path="/answers/:id"
            element={user ? user.role === "admin" ? <AnswerOverview/> : <Navigate to="/"/> : <Navigate to="/login"/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;