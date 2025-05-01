const URL = '/api/'


export async function getCoordIti(itinerario) {
    const path_url = `buscarItinerario/${itinerario}`;
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
  

  export async function getVeiculos(itinerario) {
    const path_url = `retornaVeiculosMapa/${itinerario}`
    const responseHttp = await fetch(URL + path_url)
  
    if (responseHttp.ok) {
      const text = await responseHttp.text()
  
      // Regex para pegar o conteúdo entre retornoJSONVeiculos(...)
      const jsonMatch = text.match(/retornoJSONVeiculos\((.*)\)/s)
  
      if (!jsonMatch) throw new Error('Formato de resposta inválido')
  
      const json = JSON.parse(jsonMatch[1])
      return json
    } else {
      console.error('Erro ao buscar veículos')
      throw new Error('Erro ao buscar veículos')
    }
  }
  
