import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import DataDisplay from './ChartComponent'; // Import your ChartComponent

// Define an interface to represent the data structure
interface DataItem {
    timestamp_str: string;
    mean_blue_intensity: number;
}

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA7zSAhw05-iocxcZa4J7NMyY_C_pmfZi8",
    authDomain: "bio-chart.firebaseapp.com",
    projectId: "bio-chart",
    storageBucket: "bio-chart.appspot.com",
    messagingSenderId: "1098628309757",
    appId: "1:1098628309757:web:6a53278d1c684100569494"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const FirestoreDataComponent = () => {
    const [chartData, setChartData] = useState<DataItem[]>([]); // Specify the type of chartData

    useEffect(() => {
        // Reference to the Firestore collection
        const collectionRef = collection(db, 'B_Mean_Blue_Intensity');

        // Fetch data from Firestore
        const fetchData = async () => {
            try {
                const querySnapshot = await getDocs(collectionRef);
                const data: DataItem[] = []; // Specify the type of data

                querySnapshot.forEach((doc) => {
                    // Get data from Firestore document
                    const { 'Timestamp string': timestamp_str, 'Mean Blue Intensity': mean_blue_intensity } = doc.data();
                    data.push({ timestamp_str, mean_blue_intensity });
                });

                // Set the data for the chart
                setChartData(data);
            } catch (error) {
                console.error('Error fetching data from Firestore:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Firestore Data Chart</h2>
            <DataDisplay data={chartData} />
        </div>
    );
};

export default FirestoreDataComponent;
