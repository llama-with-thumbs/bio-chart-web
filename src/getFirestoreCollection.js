import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
import SnippetsList from "./SnippetsList";
// Define an interface to represent the data structure
// No need for TypeScript interfaces in JavaScript
// Just remove the interface definition

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
      } catch (error) {
        console.error("Error fetching data from Firestore:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {chamberData.map((chamber) => (
        <div key={chamber.creation_date}>
          <strong>Chamber identification:</strong>{" "}{chamber.chamber}
          {chamber.flasks.map((flask) => (
            <SnippetsList snippets={flask.snippets} flask={flask} creation_date={chamber.creation_date}/>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FirestoreDataComponent;
