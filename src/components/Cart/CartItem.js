import classes from './CartItem.module.css';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cartReducer';

const CartItem = (props) => {
    const { title, quantity, total, price, id } = props.item;

    const dispatch = useDispatch();

    const addOneItem = () => {
        dispatch(cartActions.addItemToCart({ title, price, id }));
    };

    const removeOneItem = () => {
        dispatch(
            cartActions.removeItemFromCart({ title, price, quantity, id })
        );
    };

    return (
        <li className={classes.item}>
            <header>
                <h3>{title}</h3>
                <div className={classes.price}>
                    ${total.toFixed(2)}{' '}
                    <span className={classes.itemprice}>
                        (${price.toFixed(2)}/item)
                    </span>
                </div>
            </header>
            <div className={classes.details}>
                <div className={classes.quantity}>
                    x <span>{quantity}</span>
                </div>
                <div className={classes.actions}>
                    <button onClick={removeOneItem}>-</button>
                    <button onClick={addOneItem}>+</button>
                </div>
            </div>
        </li>
    );
};

export default CartItem;
