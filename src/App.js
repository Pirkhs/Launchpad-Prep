import Header from './components/Header';
// import Home from './components/Home'
import Objects from './components/Objects'
import './styles/App.css';
import './styles/Header.css';
import './styles/Objects.css';
import './styles/ObjectCard.css';
import './styles/Error.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <Objects/>
    </div>
  );
}

export default App;
