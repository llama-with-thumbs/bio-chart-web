import './App.css';
import ImageDisplay from './ImageDisplay';
import FirestoreDataComponent from './getFirestoreCollection'

function App() {
  return (
    <div className="App">
        <ImageDisplay sample="A"/>
        <FirestoreDataComponent/>
        <ImageDisplay sample="B"/>
        <ImageDisplay sample="C"/>
    </div>
  );
}

export default App;
