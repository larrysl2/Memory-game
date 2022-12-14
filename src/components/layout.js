import React, {useEffect, useState} from "react";
import cardlist from './cardlist';
import '../style.css'

const Layout = () => {
    const [score, setScore] = useState(0);
    const [hiscore, setHiscore] = useState(0);
    let [list, setList] = useState(cardlist);
    //create states for setting current score, hi score, and cards to use
    useEffect(()=>{if (score==8){//live highscore update that does not wait for elements to render before udpating because of useEffect
        setHiscore(score);
        alert("YOU WIN! Click ok to restart.");
        setScore(0);
        var list2 = list;
        list2.map((x)=>{//map clicked property to false
            x.clicked=false;
        })
        list = list2;
    }
    else if (score>hiscore){
        setHiscore(score);
    }});
    
    const scoreupdate =(x)=>{
        if (x.clicked==false){
            setScore(score + 1);
            x.clicked=true;
            }
            else{
                alert("You already clicked that card! Click ok to restart.")
                setScore(0);
                var list2 = list;
                
                list2.map((x)=>{
                    x.clicked=false;
                })
                setList(list2);
            }
        }//update live score and set to 0 if card is already clicked. 
        function shuffleArray(array1,x,scoreupdate) {//randomly shuffle element order in cardlist array
            scoreupdate(x);
            let array = [...array1];
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            setList(array);
            console.log(array);
        }
        
    return(
        <div className="page">
            <div className="header">
                <div className="gamename">Memory Card Game</div>
                <div className="scoreboard">{"Current Score:" + score} {"High Score:"+ hiscore}</div>
            </div>
            <div className="instructs">Click on each card once to earn a point!</div>
            <div className="cardbox">{list.map((x) => {
            return (<div className="imageholder">
                        <div className = "cardname" key={x.name} onClick={()=>shuffleArray(cardlist,x,scoreupdate)}> {x.name} </div>
                        <img className = 'image' src ={x.img} onClick={()=>shuffleArray(cardlist,x,scoreupdate)}></img>
                    </div>);
            })}</div>
        </div>
        );
}
export default Layout;
   