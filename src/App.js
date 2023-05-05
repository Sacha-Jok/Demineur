import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Play from './pages/Play';
import Tuto from './pages/Tuto';
import Leaderboard from './pages/Leaderboard';
import ErrorPage from './pages/ErrorPage';

const App = () => {
    return (
      <div className="App">
        <Router>
            <Routes>
                <Route exact path='/' element={<Play />} />
                <Route exact path='tuto' element={<Tuto />} />
                <Route exact path='leaderboard' element={<Leaderboard />} />
                <Route path='*' element={<ErrorPage />} />
            </Routes>
        </Router>
      </div>
    );
}

export default App;