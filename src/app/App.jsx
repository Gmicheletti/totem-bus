import { useState, useEffect } from 'react';
import './App.css';
import CardMap from "../cardMap/CardMap";
import { getPrevisoes } from './AppAPI';

function App() {
  const [Linhas, setLinhas] = useState([]);
  const [indexBus, setIndexBus] = useState(0);
  const [progress, setProgress] = useState(0);
  const [CurrentBus, setCurrentBus] = useState(null);

  const duration = 7000;
  const updateInterval = 100;

  useEffect(() => {
    async function fetchPrevisoes() {
      const dados = await getPrevisoes();
      setLinhas(dados.previsoes || []);
    }

    fetchPrevisoes();
  }, []);

  // Atualiza progress e troca o ônibus
  useEffect(() => {
    const totalSteps = duration / updateInterval;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setProgress((currentStep / totalSteps) * 100);

      if (currentStep >= totalSteps) {
        setIndexBus(prev => (prev + 1) % Linhas.length);
        currentStep = 0;
        setProgress(0);
      }
    }, updateInterval);

    return () => clearInterval(interval);
  }, [Linhas]);

  // Atualiza CurrentBus toda vez que indexBus muda
  useEffect(() => {
    if (Linhas.length > 0) {
      setCurrentBus(Linhas[indexBus]);
    }
  }, [indexBus, Linhas]);

  // Relógio
  const [dataHora, setDataHora] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDataHora(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const date = dataHora.toLocaleDateString();
  const hour = dataHora.toLocaleTimeString();

  return (
    <>
      <CardMap linha={CurrentBus?.sgLin} previsao={CurrentBus?.prev} progress={progress} date={date} hour={hour} />
    </>
  );
}

export default App;
