import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
import FlasksList from "./FlasksList";
import "./getFirestoreCollection.css";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7zSAhw05-iocxcZa4J7NMyY_C_pmfZi8",
  authDomain: "bio-chart.firebaseapp.com",
  projectId: "bio-chart",
  storageBucket: "bio-chart.appspot.com",
  messagingSenderId: "1098628309757",
  appId: "1:1098628309757:web:6a53278d1c684100569494",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const FirestoreDataComponent = () => {
  const [chamberData, setChamberData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // New state for loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "bio-chart"));
        const data = await Promise.all(
          querySnapshot.docs.map(async (docRef) => {
            const { creation_date: creation_date, chamber: chamber } = docRef.data();

            const flasksCollectionRef = collection(doc(db, "bio-chart", docRef.id), "flasks");
            const flasksQuerySnapshot = await getDocs(flasksCollectionRef);
            const flasksData = await Promise.all(
              flasksQuerySnapshot.docs.map(async (flaskDoc) => {
                const flask = flaskDoc.data();
                const snippetsCollectionRef = collection(flaskDoc.ref, "snippets");
                const snippetsQuerySnapshot = await getDocs(snippetsCollectionRef);
                const snippetsData = snippetsQuerySnapshot.docs.map((snippetDoc) => snippetDoc.data());
                return { ...flask, snippets: snippetsData };
              })
            );

            return { creation_date, chamber, flasks: flasksData };
          })
        );

        setChamberData(data);
        setIsLoading(false); // Set loading to false when data is fetched

      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{display:"flex", flexDirection:"column", minHeight:"80vh", justifyContent:"center" }}>
      {isLoading ? (
        // Render a loading spinner while data is being fetched
        <div className="spinner"></div>
      ) : (
        // Render the content when data is loaded
        chamberData.map((chamber) => (
          <div key={chamber.creation_date} style={{ padding: '0', margin: '10px', border: "1px solid #ccc", borderRadius: '8px' }}>
            <div style={{ padding: '5px 0 0 10px' }}>
              <strong>Chamber identifier:</strong> {chamber.chamber}
            </div>
            {chamber.flasks.map((flask) => (
              <FlasksList snippets={flask.snippets} flask={flask} creation_date={chamber.creation_date} />
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default FirestoreDataComponent;
