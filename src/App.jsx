import styled from '@emotion/styled';
import cryptoImage from './img/crypto-image.png';
import { API_KEY } from './data/env';

import { useState, useEffect } from 'react';

import Form from './components/Form';
import Result from './components/Result';
import Spinner from './components/Spinner';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media( min-width: 992px ){
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 2rem;
  }
`

const Image = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
    margin: 10px auto 0;
  }
`

function App() {

  const [currencies, setCurrencies] = useState({});
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    if(Object.keys(currencies).length > 0){
      const quoteCrypto = async () => {
        setLoading(true);
        const {currency, cryptoCurrency} = currencies
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoCurrency}&tsyms=${currency}&api_key=${API_KEY}`

        const resp = await fetch(url);
        const result = await resp.json();

        setResult(result.DISPLAY[cryptoCurrency][currency]);
        setLoading(false);
      }

      quoteCrypto()
    }
  }, [currencies]);

  return (
    <Container>
      <Image src={cryptoImage} alt="image with different crypto logos"/>
      <div>
        <Heading>See real time market prices</Heading>
        <Form setCurrencies={setCurrencies} ></Form>
        {!loading && result.PRICE && <Result result = {result}></Result>}
        {loading && <Spinner /> }
      </div>
    </Container>
  )
}

export default App
