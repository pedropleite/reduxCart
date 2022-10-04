import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCartData, sendCartData } from './store/cartReducer';
import Notification from './components/UI/Notification';

let isInitial = true;

function App() {
    const showCart = useSelector((state) => state.cart.showCart);
    const cart = useSelector((state) => state.cart);
    const notification = useSelector((state) => state.ui.notification);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isInitial) {
            isInitial = false;
            dispatch(fetchCartData());
            return;
        }

        if (cart.changed) {
            dispatch(sendCartData(cart));
        }
    }, [cart, dispatch]);

    return (
        <>
            {notification && (
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
            <Layout>
                {showCart && <Cart />}
                <Products />
            </Layout>
        </>
    );
}

export default App;
