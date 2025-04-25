const URL = '/api/siumobile-ws-v01/rest/ws/'

export async function getPrevisoes() {

  const path_url = 'buscarPrevisoes/9847/0/retornoJSON'
  const responseHttp = await fetch(URL + path_url)

  if(responseHttp.ok) {

    const text = await responseHttp.text()

    // Remove a função `retornoJSON(...)` e pega só o conteúdo
    const jsonMatch = text.match(/retornoJSON\((.*)\)/s)
    const json = JSON.parse(jsonMatch[1])
    return json
    
  } else {
    console.log('Falha ao tentar buscar as previsoes.')
    throw new Error('Falha ao tentar buscar as previsoes.')
  }

}


export async function getCoordIti(itinerario) {
  const path_url = `buscarItinerario/${itinerario}/0/retornoJSONItinerario`;
  const responseHttp = await fetch(URL + path_url);

  if (responseHttp.ok) {
    const text = await responseHttp.text();

    // Corrigido: usa o nome correto da função e extrai apenas o conteúdo
    const jsonMatch = text.match(/retornoJSONItinerario\((.*)\)/s);
    
    if (jsonMatch && jsonMatch[1]) {
      const json = JSON.parse(jsonMatch[1]);
      return json;
    } else {
      throw new Error('Resposta inesperada do servidor');
    }

  } else {
    console.log('Falha ao tentar buscar coordenadas do itinerário.');
    throw new Error('Falha ao tentar buscar coordenadas do itinerário.');
  }
}

