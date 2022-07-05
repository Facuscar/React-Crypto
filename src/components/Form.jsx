import styled from '@emotion/styled';
import { fiat } from '../data/coins';
import { API_KEY } from '../data/env';

import { useEffect, useState } from 'react';

import useSelectCurrency from '../hooks/useSelectCurrency';

import Error from './Error';

const InputSubmit = styled.input`
    background-color: #9497ff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;

    transition: background-color .3s;

    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

function Form() {
    const [cryptos, setCryptos] = useState([]);
    const [error, setError] = useState(false);
   
    const [currency, SelectCurrency] = useSelectCurrency('Choose your currency!', fiat);
    const [cryptoCurrency, SelectCryptoCurrency] = useSelectCurrency('Choose your crypto!', cryptos)


    const handleSubmit = (e) => {
        e.preventDefault();
        if([currency, cryptoCurrency].includes('')){
            setError(true);
            return;
        }
    }

    
    useEffect(() => {
        const consultAPI = async () => {
            const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD&api_key=${API_KEY}`

            const resp = await fetch(url);

            const result = await resp.json()

            const cryptoArray = result.Data.map( crypto => {
                const object = {
                    id: crypto.CoinInfo.Name,
                    name: crypto.CoinInfo.FullName
                }

                return object;
            })
            setCryptos(cryptoArray);
        }

        consultAPI();
    }, []);

    return ( 

        <>
        {error && <Error>You must select both a currency and a crypto currency!</Error>}
        <form action="" onSubmit={handleSubmit}>
            <SelectCurrency></SelectCurrency>

            <SelectCryptoCurrency />    

            <InputSubmit type="submit" value="Get price"/>
        </form>
        </>
     );
}

export default Form;