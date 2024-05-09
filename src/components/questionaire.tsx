import React, { MouseEventHandler, useEffect } from "react"
import { questionUrl, answerUrl } from "../global"
import { Body1, Button, Caption1, Card, CardFooter, CardHeader, CardPreview, Display, Divider, Spinner, Subtitle1, Subtitle2, Title2 } from "@fluentui/react-components";
import { question } from "../interfaces/question";
import { SkeletonBlock } from "./skeleton-block";
import { GameOverView } from "./game-over";

export const Questionaire = () => {

    const [data, setData] = React.useState<question | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [timer, setTimer] = React.useState(30)
    const [timeOver,setTimeOver] = React.useState(false)
    const [questionTrigger, setQuestionTrigger] = React.useState(0)

    React.useEffect(() => {
        setLoading(true)
        fetch(questionUrl).then(response => {
            if (!response.ok) {
                throw new Error('Bad response')
            }
            return response.json()
        }).then(data => {
            console.log("setting...")
            setLoading(false);
            setData(data);
        }).catch(error => {
            setLoading(false)
        });
    }, [questionTrigger])

    React.useEffect(() => {
        if (timer != 0){
            setTimeout(() => {
                setTimer(timer-1)
            }, 1000)
        }else{
            setTimeOver(true)
        }
    },[timer]);

    const validateResponse = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, optionIndex: number) =>{
        event.preventDefault()
        const answerOk = {good:(data?.correctAnswer == optionIndex) ? 1 : 0};
        fetch(answerUrl,
            {method: 'POST', credentials: 'include', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(answerOk)}
        ).then(response => {
            if (!response.ok) {
                throw new Error('Bad response')
            }else{
                setQuestionTrigger(questionTrigger+1)
            }
        });

    }

    return (
        <>
        {!timeOver ?
            <Card size="large" style={{margin: "16px"}}>
                {loading ? <Spinner /> :
                    <>
                        <CardHeader 
                            header={
                                <Body1>
                                    <Display> {data?.char} </Display>
                                </Body1>} 
                            description={
                                <Subtitle2>{data?.text}</Subtitle2>
                            }
                            action={
                                <Subtitle1>{timer}</Subtitle1>
                            }
                            style={{alignSelf: "center"}}
                        />
                        <CardPreview style={{paddingInline: "100px", margin:"16px"}}>

                            {data?.options.map((option, i) =>{
                                return <Button onClick={(e) =>validateResponse(e,i)} size={"large"}>{option}</Button>
                            })}
                        </CardPreview>
                    </>
                }
            </Card>
            :
            <GameOverView/>
        }
        </>
    );

}
