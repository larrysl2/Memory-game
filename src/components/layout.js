import React, {useState} from "react";
import cardlist from './cardlist';

const Layout = () => {
    const [score, setScore] = useState(0);
    const [hiscore, setHiscore] = useState(0);
    const [list, setList] = useState(cardlist);
    console.log(cardlist);
    const scoreupdate =(x)=>{
        if (x.clicked==false){
            setScore(score + 1);
            if (score>=hiscore){
                setHiscore(score+1);
            }
        }
        else{
            setScore(0);
            var list2 = list;
            list2.map((x)=>{
                x.clicked=false;
            })
            list = list2;
        }
        }
        function shuffleArray(array1,x,scoreupdate) {
            scoreupdate(x);
            x.clicked=true;
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
        <div>
            {"Current Score:" + score} {"High Score:"+ hiscore}
            <div className="cardname">{list.map((x) => {
            return (<div >
                    <div className = "cardname" key={x.name} onClick={()=>shuffleArray(cardlist,x,scoreupdate)}>{x.name} </div>
                    </div>);
        })}</div>
        </div>
        );
    }
export default Layout;
   