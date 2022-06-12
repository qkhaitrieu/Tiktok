import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from './AccountItem.module.scss'

const cx = classNames.bind(styles);

function AccountItem() {
    return ( 
        <div className={cx('wrapper')}>
            <img className={cx('avatar')} src="https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/284112634_1351614845318609_1147390007543392347_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=OqJzPzigSgsAX_VHgG6&_nc_ht=scontent.fdad3-1.fna&oh=00_AT-IAJ1bKYV0xINClM2Nt5uOGd4nzpxQUaU62R8fWd7ptA&oe=62AA594B" alt="Khải" />
            <div className={cx('info')}> 
             <h4 className={cx('name')}> 
             <span> Như Ý</span>
             <FontAwesomeIcon className={cx('check')} icon ={faCheckCircle}/>
             </h4>
             <span className={cx('username')}>wickky</span>
            </div>
        </div>
     ); 
}

export default AccountItem;