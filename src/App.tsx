import './App.css';
import SelectBox from './components/selectBox';

function App() {
  return (
    <div className="App">
      <main className='wrapper'>
        <SelectBox
          style={{ width: '200px' }}
          defaultValue={['china']}
          options={[{
            label: 'China',
            value: 'china',
            emoji: '🇨🇳',
            desc: 'China (中国)',
          },
          {
            label: 'USA',
            value: 'usa',
            emoji: '🇺🇸',
            desc: 'USA (美国)',
          },
          {
            label: 'Iran',
            value: 'iran',
            emoji: '🇨🇳',
            desc: 'China (中国)',
          },
          {
            label: 'UAE',
            value: 'uae',
            emoji: '🇺🇸',
            desc: 'USA (美国)',
          },
          {
            label: 'Italy',
            value: 'italy',
            emoji: '🇨🇳',
            desc: 'China (中国)',
          },
          {
            label: 'France',
            value: 'france',
            emoji: '🇺🇸',
            desc: 'USA (美国)',
          },
          {
            label: 'Japan',
            value: 'japan',
            emoji: '🇨🇳',
            desc: 'China (中国)',
          },
          {
            label: 'Germany',
            value: 'germany',
            emoji: '🇺🇸',
            desc: 'USA (美国)',
          },]}
        />
      </main>
    </div>
  );
}

export default App;
