import classes from './CartButton.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../store/cartReducer';

const CartButton = (props) => {
    const dispatch = useDispatch();
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);

    const toggleCart = () => {
        dispatch(cartActions.toggleCart());
    };

    return (
        <button className={classes.button} onClick={toggleCart}>
            <span>My Cart</span>
            <span className={classes.badge}>{totalQuantity}</span>
        </button>
    );
};

export default CartButton;
