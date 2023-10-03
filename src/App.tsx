import './App.css';
import ImageDisplay from './ImageDisplay';
import GifDisplay from './GifDisplay'
import FirestoreDataComponent from './getFirestoreCollection'

function App() {
  return (
    <div className="App">
      <div className='sample'>
        <ImageDisplay sample="A" />
        <GifDisplay flask="A" />
        <FirestoreDataComponent sample="A" />
      </div>
      <div className='sample'>
        <ImageDisplay sample="B" />
        <GifDisplay flask="B" />
        <FirestoreDataComponent sample="B" />
      </div>
      <div className='sample'>
        <ImageDisplay sample="C" />
        <GifDisplay flask="C" />
        <FirestoreDataComponent sample="C" />
      </div>
    </div>
  );
}

export default App;
