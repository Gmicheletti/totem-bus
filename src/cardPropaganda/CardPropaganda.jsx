import "./CardPropaganda.css";

function CardPropaganda({ count }) {
    const img_prop = `/assets/prop${count}.png`; // caminho direto da pasta public, o count é utilizado para puxar a proxima imagem de acordo com o nome
    return (
        <>
            <img src={img_prop} alt={`Propaganda ${count}`} />
        </>
    );
}

export default CardPropaganda;
