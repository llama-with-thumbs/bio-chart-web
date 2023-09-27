import './App.css';
import ImageDisplay from './ImageDisplay';
import FirestoreDataComponent from './getFirestoreCollection'

function App() {
  return (
    <div className="App">
      <div className='sample'>
        <ImageDisplay sample="A" />
        <FirestoreDataComponent sample="A" />
      </div>
      <div className='sample'>
        <ImageDisplay sample="B" />
        <FirestoreDataComponent sample="B" />
      </div>
      <div className='sample'>
        <ImageDisplay sample="C" />
        <FirestoreDataComponent sample="C" />
      </div>
    </div>
  );
}

export default App;
