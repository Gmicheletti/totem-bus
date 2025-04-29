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


