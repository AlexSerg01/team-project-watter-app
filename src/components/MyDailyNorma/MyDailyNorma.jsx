import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import css from './MyDailyNorma.module.css';
import DailyNormaModal from '../DailyNormaModal/DailyNormaModal';
import { updateNorma, openModal, closeModal } from '../../redux/dailyNorma/slice';
import { getNorma } from '../../redux/dailyNorma/operations';  
import { selectNorma, selectStatus, selectError, selectShowModal } from '../../redux/dailyNorma/selectors'; // Онови селектори

export default function MyDailyNorma() {
    const dispatch = useDispatch();
    const waterNorma = useSelector(selectNorma);
    const status = useSelector(selectStatus);
    const error = useSelector(selectError);
    const showModal = useSelector(selectShowModal);

    useEffect(() => {
        dispatch(getNorma());
    }, [dispatch]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    const handleEditClick = () => {
        dispatch(openModal());
    };

    const handleConfirm = (newNorma) => {
        dispatch(updateNorma(newNorma));
        dispatch(closeModal());
    };

    return (
        <div className={css.container}>
            <h2 className={css.title}>My daily norma</h2>
            <div>
                <span className={css.norma}>{Number(waterNorma).toFixed(1)} L</span>
                <button className={css.btn} onClick={handleEditClick}>Edit</button>
                {showModal && <DailyNormaModal onConfirm={handleConfirm} onClose={() => { dispatch(closeModal()) }} />}
            </div>
        </div>
    );
}