import logo from './logo.svg';
import './App.css';
import { Message } from './components/message/message.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h3> My First React App </h3>
        <Message text='Hello! My name is Ksenia)))' />
      </header>
    </div>
  );
}

export default App;
