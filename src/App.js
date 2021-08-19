import './App.css';
import { Route, Switch } from 'react-router-dom';
import QuickAds from './pages/CreateQuickAds';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Switch>
            <Route exact path='/quick-ads' component={QuickAds} />
      </Switch>
      </header>
    </div>
  );
}

export default App;
