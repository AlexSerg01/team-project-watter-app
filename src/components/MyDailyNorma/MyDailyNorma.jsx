import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import css from './MyDailyNorma.module.css';
import DailyNormaModal from '../DailyNormaModal/DailyNormaModal';
import { openModal } from '../../redux/dailyNorma/slice';
import { getNorma } from '../../redux/dailyNorma/operations';  
import { selectNorma, selectShowModal } from '../../redux/dailyNorma/selectors';
import Loader from '../Loader/Loader';

export default function MyDailyNorma() {
    const dispatch = useDispatch();
    const showModal = useSelector(selectShowModal);
    

    useEffect(() => {
        dispatch(getNorma());
    }, [dispatch]);

    const waterNorma = useSelector(selectNorma);
    
    const handleEditClick = () => {
        dispatch(openModal());
    };

    return (
        <div className={css.container}>
            <h2 className={css.title}>My daily norma</h2>
            <div className={css.father}>
                {waterNorma !== null ? (
                    <span className={css.norma}>{Number(waterNorma).toFixed(1)} L</span>
                ) : (
                        <Loader className={css.loader} />
                )}
                <button className={css.btn} onClick={handleEditClick}>Edit</button>
                {showModal && <DailyNormaModal/>}
            </div>
        </div>
    );
}