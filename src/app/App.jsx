import { useState, useEffect } from "react";
import "./App.css";
import CardMap from "../cardMap/CardMap";
import CardPropaganda from "../cardPropaganda/CardPropaganda";
import { getPrevisoes } from "./AppAPI";

function App() {
  const [Linhas, setLinhas] = useState([]);
  const [indexBus, setIndexBus] = useState(0);
  const [CurrentBus, setCurrentBus] = useState(null);
  const [progress, setProgress] = useState(0);
  const [countPropaganda, setCountPropaganda] = useState(1);

  const updateInterval = 100; //intervalo de atualizao da barra

  //--------------------------------------------
  //Busca as linhas que passam no ponto de onibus escolhido
  async function fetchPrevisoes() {
    const dados = await getPrevisoes();
    console.log(dados)

    var list = [];
    const tamanhoLista = dados.previsoes.length;

    for (var i = 0; i < tamanhoLista; i++) {
      
      let minutos = parseInt(dados.previsoes[i].prev.split(" ")[0]);

      // Pega somente os onibus que tem a previsao de chegada menor ou igual a 20 minutos
      if (minutos <= 20) {

        // Adiciona linha na lista
        list.push(dados.previsoes[i]);

        // O codItinerario 0 é utilizado para identificar que é um anúncio
        // Para cada linha, um anúncio é intercalado

        list.push({
          codItinerario: 0,
          sgLin: "0",
        });

      }
    }

    setLinhas(list || []);
  }

  useEffect(() => {
    fetchPrevisoes();
  }, []);
  //--------------------------------------------

  //--------------------------------------------
  // Atualiza progress e troca o ônibus
  useEffect(() => {
    if (Linhas.length === 0) return;

    const isAd = Linhas[indexBus]?.codItinerario === 0; // verifica se item atual é uma linha ou anuncio
    const dynamicDuration = isAd ? 3000 : 15000; // 5s para propaganda, 15s para ônibus

    const totalSteps = dynamicDuration / updateInterval;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setProgress((currentStep / totalSteps) * 100);

      if (currentStep >= totalSteps) {
        setIndexBus((prev) => (prev + 1) % Linhas.length);
        currentStep = 0;
        setProgress(0);
        fetchPrevisoes();
      }
    }, updateInterval);

    return () => clearInterval(interval);
  }, [Linhas, indexBus]);
  //--------------------------------------------

  //--------------------------------------------
  // Atualiza CurrentBus toda vez que indexBus muda
  useEffect(() => {
    if (Linhas.length > 0) {
      setCurrentBus(Linhas[indexBus]);

      if (CurrentBus?.codItinerario == 0) {
        setCountPropaganda(countPropaganda + 1);
      }

      if (countPropaganda == 5) {
        setCountPropaganda(1);
      }
    }
  }, [indexBus, Linhas]);
  //--------------------------------------------

  //-----------------RELOGIO--------------------
  const [dataHora, setDataHora] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDataHora(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const date = dataHora.toLocaleDateString();
  const hour = dataHora.toLocaleTimeString();
  //--------------------------------------------
  return (
    <>
      {CurrentBus?.codItinerario > 0 ? (
        <CardMap
          linha={CurrentBus?.sgLin}
          itinerario={CurrentBus?.codItinerario}
          previsao={CurrentBus?.prev}
          progress={progress}
          date={date}
          hour={hour}
          numVeicGestor={CurrentBus?.numVeicGestor}
        />
      ) : (
        <CardPropaganda className="prop" count={countPropaganda} />
      )}
    </>
  );
}

export default App;
