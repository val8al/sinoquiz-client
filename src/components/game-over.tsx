import React from "react";
import { questionUrl, resultsUrl } from "../global";
import { Display, Title1 } from "@fluentui/react-components";
import { Results } from "../interfaces/results";

export const GameOverView = () => {
    const [data, setData] = React.useState<Results | null>(null)
    const [score, setScore] = React.useState(0)

    React.useEffect(() => {
        fetch(resultsUrl,{method: 'GET', credentials: 'include'}).then(response => {
            if (!response.ok) {
                throw new Error('Bad response')
            }
            return response.json()
        }).then(data => {
            setData(data);
            console.log(data)
            console.log("wkapsdokapsdokpoaksdpokasd")
        }).catch(error => {
            console.log("err in results: "+error)
        });
    }, [])

    React.useEffect(()=> {
        if(!data){
            setTimeout(() => {
                setScore(Math.floor(Math.random() * 25)) 
            },100)   
        }else{
            setScore(data.score)
            console.log("setting data")
            console.log(data)
        }
    });

    return(
        <div  style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Title1>Your score is...</Title1>
            <Display>{score}</Display>
        </div>
    )
}
//a cropped cartoon of a chibi ancient chinese  scribe intellectual holding his brush and a scroll