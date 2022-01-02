import Menu from '../pages/Menu';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Setting from '../pages/Setting';

export const navlinks = [
    { id: 0, path: '/Menu', name: 'Menu', target: <Menu /> },
    { id: 1, path: '/Cart', name: 'Cart', target: <Cart /> },
    { id: 2, path: '/Checkout', name: 'Checkout', target: <Checkout /> },
    { id: 3, path: '/Settings', name: 'Settings', target: <Setting /> }
];