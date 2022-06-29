import styled from '@emotion/styled';

const Label = styled.label`
    color: #FFF;
`

const useSelectCrypto = (label, options) => {

    const SelectCrypto = () =>(
        <>
            <Label htmlFor="">{label}</Label>
            <select name="" id="">
                <option value="">Select</option>

                {options.map ( option => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>

                ))}
            </select>
        </>
    )

    return [ SelectCrypto ];
}

export default useSelectCrypto;