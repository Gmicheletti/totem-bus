const URL = '/api/siumobile-ws-v01/rest/ws/buscarPrevisoes/9847/0/retornoJSON'

export async function getPrevisoes() {
  console.log('Executando getPrevisoes()')

  const responseHttp = await fetch(URL)


  if(responseHttp.ok) {
    // return await responseHttp.text()

    const responseHttp = await fetch(URL)
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
