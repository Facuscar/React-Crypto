import styled from '@emotion/styled';

import useSelectCrypto from '../hooks/useSelectCrypto';

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

    const fiat = [
        {id: 'USD', name: 'United State Dolar'},
        {id: 'ARG', name: 'Peso Argentino'},
        {id: 'EUR', name: 'Euro'},
        {id: 'GBP', name: 'Pound Sterling'},
    ]

    const [SelectCrypto] = useSelectCrypto('Choose your crypto!', fiat);

    return ( 
        <form action="">
            <SelectCrypto></SelectCrypto>

            <InputSubmit type="submit" value="Get price" onClick={(e) => handleSubmit(e)}/>
        </form>
     );
}

export default Form;