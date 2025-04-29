import "./CardPropaganda.css";

function CardPropaganda({ count }) {
    const img_prop = `/assets/prop${count}.png`; // caminho direto da pasta public
    return (
        <>
            <img src={img_prop} alt={`Propaganda ${count}`} />
        </>
    );
}

export default CardPropaganda;
