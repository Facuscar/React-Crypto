import styled from '@emotion/styled';
import { fiat } from '../data/coins';
import { API_KEY } from '../data/env';

import { useEffect } from 'react';

import useSelectCurrency from '../hooks/useSelectCurrency';

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

const handleSubmit = (e) => {
    e.preventDefault();
    console.log('You clicked me!');
}

function Form() {

   
    const [currency, SelectCurrency] = useSelectCurrency('Choose your currency!', fiat);

    useEffect(() => {
        const consultAPI = async () => {
            const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD&api_key=${API_KEY}`

            const resp = await fetch(url);

            const result = await resp.json()

            console.log(result.Data);
        }

        consultAPI();
    }, []);

    return ( 
        <form action="">
            <SelectCurrency></SelectCurrency>

            {currency}

            <InputSubmit type="submit" value="Get price" onClick={(e) => handleSubmit(e)}/>
        </form>
     );
}

export default Form;