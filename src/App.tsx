import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import BuildAgentPage from './pages/BuildAgentPage';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<><CatalogPage /><Footer /></>} />
            <Route path="/build-agent" element={<><BuildAgentPage /><Footer /></>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
