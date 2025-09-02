import { Header } from './components/layout/Header';
import { HomePage } from './pages/HomePage';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HomePage />
      </main>
    </div>
  );
}

export default App;
