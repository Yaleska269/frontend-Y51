import React, { useState} from 'react' ;
import Contador from '../components/Contador';

const Inicio = () => {

    const [contador, setContador] = useState(0);

    const incrementar = () => {
        setContador(contador + 1);

    }
    return (
        <>
            <Contador 
            contador={contador}
            incremente={incrementar}
            />

        </>
    );
}
export default Inicio;
