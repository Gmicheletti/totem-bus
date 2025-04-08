import { useState, useEffect } from 'react'
import './App.css'
import CardMap from "../cardMap/CardMap"


function App() {
  const [count, setCount] = useState(0)

  const allBus = ["64", "67", "3301A", "3301B", "3302A", "3302B", "3302D", "3502", "3503A", "4107", "5102", "8501"];
  const [indexBus, setIndexBus] = useState(0);
  const [progress, setProgress] = useState(0);
  const duration = 7000; // 7 segundos
  const updateInterval = 100; // Atualiza a barra a cada 100ms

  useEffect(() => {
    const totalSteps = duration / updateInterval;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setProgress((currentStep / totalSteps) * 100);

      if (currentStep >= totalSteps) {
        setIndexBus(prev => (prev + 1) % allBus.length);
        currentStep = 0;
        setProgress(0);
      }
    }, updateInterval);

    return () => clearInterval(interval);
  }, []);

  const currentBus = allBus[indexBus];



  const [dataHora, setDataHora] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDataHora(new Date());
    }, 1000); // atualiza a cada 1 segundo

    return () => clearInterval(interval);
  }, []);

  const date = dataHora.toLocaleDateString(); // formato: dd/mm/yyyy
  const hour = dataHora.toLocaleTimeString(); // formato: hh:mm:ss
  
  return (
    <>
      <CardMap linha={currentBus} progress={progress} date={date} hour={hour}></CardMap>
    </>
  )
}

export default App
