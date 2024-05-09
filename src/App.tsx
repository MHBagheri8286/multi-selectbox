import './assets/styles/app.css';
import './assets/styles/iconfont.css';
import MultiSelectBox from './components/multi-selectbox';
import SampleData from './sampleData';

function App() {
  return (
    <div className="app">
      <header>
        <h1>Multi SelectBox</h1>
      </header>
      <main className='wrapper'>
        <MultiSelectBox
          style={{ width: 300 , minHeight: 35}}
          defaultValue={['science']}
          options={SampleData}
        />
      </main>
    </div>
  );
}

export default App;
