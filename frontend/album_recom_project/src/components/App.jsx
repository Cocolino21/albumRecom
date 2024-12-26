import {HashRouter, Routes, Route} from 'react-router-dom'
import Home from './Home.jsx'
import TempPage from './TempPage.jsx';
import Layout from './Layout.jsx';
function App() {
   return (
    <HashRouter>
        <Routes >
            <Route element = {<Layout />}>
                <Route path="/" element = {<Home/>}/>
                <Route path="/album/40" element = {<TempPage/>}/>
            </Route>
        </Routes>
    </HashRouter>);
}

export default App;
