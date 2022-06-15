import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import Header from './Header';
import MenuItem from './MenuItem';
import styles from './Menu.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles); /* bind cái object styles vào rồi trả ra method funcition */
const defaultFn = () => {} 

function Menu({ children, items = [], onChange = defaultFn }) {
    const [history, setHistory] = useState([{ data: items }]);
    const current = history[history.length - 1]; // lấy phần tử cuối rồ render cái current.data ở dưới
    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children; // dấu !! là not, nếu có thì nó sẽ trả về boolen true
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children]);
                        } else {
                            onChange(item);
                        }
                    }}
                />
            );
        });
    };
    return (
        <Tippy
            // visible //làm nó luôn hiện
            interactive /* interactive giúp tương tác với kết quả */
            placement="bottom-end"
            delay={[0, 700]} // muốn nó hiện rồi 700ms sau mới ẩn đi
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {history.length > 1 && (
                            <Header
                                title=" Language"
                                onBack={() => {
                                    setHistory((prev) => prev.slice(0, prev.length - 1)); // Đây là hàm quay trở lại, chie hirn languege ở lớp thứ 2
                                }}
                            />
                        )}
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
