import React from 'react';
import './App.css';
import { FluentProvider, webLightTheme, Button, Image, Title2, Title1 } from '@fluentui/react-components';
import { Questionaire } from './components/questionaire';


function App() {
  const [quizStarted, setQuizStarted] = React.useState(false)
  return (
    <FluentProvider theme={webLightTheme}>
      {!quizStarted ? 
      <div style={{ width: '100%', height: '100%', flexDirection:'column', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Image
            alt='a chibi chinese sage'
            height={300}
            width={300}
            src='..\homepage_pet.png'
          />
          <Title2>Select as many correct meanings or pinyin as you can under 1 minute.  </Title2>
          <Title2><b>Any single Hanzi that ever existed</b> could show up! </Title2>
          <Title1>READY?</Title1>
          <br/>
          <Button size='large' appearance="primary" onClick={() => setQuizStarted(true)}>Start!</Button>
      </div>
        : <Questionaire/>
      }
    </FluentProvider>
  );
}

export default App;
