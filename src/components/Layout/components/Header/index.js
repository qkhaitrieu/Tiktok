import classNames from 'classnames/bind';
import styles from './Header.module.scss'
  

const cx = classNames.bind(styles) //bind cái object styles vào rồi trả ra method funcition
function Header() {
    return <header className  ={cx('wrapper')}>
        <div className ={cx('inner' )}> 
        
        </div>
    </header>
}

export default Header;