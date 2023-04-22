function Die(props){

    const diceValue = parseInt(props.value)
    let diceSpan

    if(props.type === 'dice'){
        if(diceValue === 1){
            diceSpan = (
                <div className="dice first-face">
                    <span className="dot">{" "}</span>
                </div>
            )
        }
        else if(diceValue === 2){
            diceSpan = (
                <div className="dice second-face">
                    <span className="dot"> </span>
                    <span className="dot"> </span>
                </div>
            )
        }
        else if(diceValue === 3){
            diceSpan = (
                <div className="dice third-face">
                    <span className="dot"> </span>
                    <span className="dot"> </span>
                    <span className="dot"> </span>
                </div>
            )
        }
        else if(diceValue === 4){
            diceSpan = (
                <div className="dice fourth-face">
                    <div className="column">
                        <span className="dot"> </span>
                        <span className="dot"> </span>
                    </div>
                    <div className="column">
                        <span className="dot"> </span>
                        <span className="dot"> </span>
                    </div>
                </div>
            )
        }
        else if(diceValue === 5){
            diceSpan = (
                <div className="dice fifth-face">
                    <div className="column">
                        <span className="dot"> </span>
                        <span className="dot"> </span>
                    </div>
                    <div className="column">
                        <span className="dot"> </span>
                    </div>
                    <div className="column">
                        <span className="dot"> </span>
                        <span className="dot"> </span>
                    </div>
                </div>
            )
        }
        else if(diceValue === 6){
            diceSpan = (
                <div className="dice fourth-face">
                    <div className="column">
                        <span className="dot"> </span>
                        <span className="dot"> </span>
                        <span className="dot"> </span>
                    </div>
                    <div className="column">
                        <span className="dot"> </span>
                        <span className="dot"> </span>
                        <span className="dot"> </span>
                    </div>
                </div>
            )
        }
        else
        {
            diceSpan = (
                <h2>{props.value}</h2>
            )
        }
    }
    else
    {
        diceSpan = (
            <h2>{props.value}</h2>
        )
    }

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    return(
        <div onClick={props.holdDice} className={props.type === 'dice' ? 'die-dice' : 'die-num'} style={styles}>
            {diceSpan}
        </div>
    )
}

export default Die