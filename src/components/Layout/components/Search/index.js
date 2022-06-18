import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless'; // different import path!
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { useEffect, useState, useRef } from 'react';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState(' ');
    const [searchResult, setSearchResult] = useState([]); /* Hiện cái bảng khi tìm kiếm */
    const [showResult, setShowResult] = useState(true);
     const [loading, setLoading] = useState(false);

    const inputRef = useRef();
    useEffect(() => {

        if(!searchValue.trim){
            return;
        }
        setLoading(true)
        fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=h&type=less`) // do sòng này mà nó k hiện
            .then((res) => res.json())
            .then((res) => {
                setSearchResult(res.data);
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [searchValue]);
    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]); // khi xóa chữ trong tìm kiếm thì nó tắt luôn hover ở dưới
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        /* hàm xử lí ẩn khi rê chuột ra ngoài */
        setShowResult(false);
    };

    return (
        <HeadlessTippy
            interactive /* interactive giúp tương tác với kết quả */
            visible={showResult && searchResult.length > 0} /* nếu kết quả tìm kiếm lớn hơn 0 mới hiện */
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Accounts</h4>
                        {searchResult.map((result) => (
                            <AccountItem key={result.id} data={result} />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Search accounts and videos"
                    spellCheck={false}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={() => setShowResult(true)} // khi nhấn lại vào ôn tìm kiếm nó lại hiện
                />
                {/* spell check là để bỏ gạch chân đỏ dưới */}

                {!!searchValue && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        {' '}
                        {/* Khi có SearchValue thì nó mới hiện button Clear */}
                        <FontAwesomeIcon icon={faCircleXmark} />{' '}
                        {/* Khi nhấn vào Clear thì ta cho setSearchValue = chuỗi rỗng để nó xóa đi */}
                    </button>
                )}

               {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                <button className={cx('search-btn')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />{' '}
                    {/* sử dụng thẻ tippy để khi hover vào nó hiện chữ ra, placement để nó lonh động */}
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
