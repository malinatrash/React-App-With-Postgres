import AuthPage from "./pages/auth/AuthPage";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import SignUpForm from "./pages/auth/modules/SignUpForm";
import SignInForm from "./pages/auth/modules/SignInForm";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    element={<AuthPage child={<SignUpForm/>}/>}
                    path={'/signup'}
                />
                <Route
                    element={<AuthPage child={<SignInForm/>}/>}
                    path={'/signin'}
                />
                <Route
                    path={'/*'}
                    element={<Navigate to={'/signup'}/>}
                />
            </Routes>
        </BrowserRouter>
    )
}
export default App
