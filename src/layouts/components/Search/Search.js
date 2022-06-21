import { useEffect, useState, useRef } from 'react';
import { faCircleXmark, faSpinner} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless'; // different import path!
import classNames from 'classnames/bind';


import * as searchServices from '~/services/searchServices';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import styles from './Search.module.scss';
import {useDebounce} from '~/hooks';

const cx = classNames.bind(styles);


function Search() {
    const [searchValue, setSearchValue] = useState(' ');
    const [searchResult, setSearchResult] = useState([]); /* Hiện cái bảng khi tìm kiếm */
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(searchValue, 500); // khi người dùng ngừng gõ 500ms thì giá trọ deboundce nó mới ddc update bằng giá trị mới nhất của sưearchValue

    const inputRef = useRef();

     useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            setLoading(true);

            const result = await searchServices.search(debouncedValue);

            setSearchResult(result);
            setLoading(false);
        };

        fetchApi();
    }, [debouncedValue]);
    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]); // khi xóa chữ trong tìm kiếm thì nó tắt luôn hover ở dưới
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        /* hàm xử lí ẩn khi rê chuột ra ngoài */
        setShowResult(false);
    };
  const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };
    return (
        <div>
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

                <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()} >
                   <SearchIcon />
                    {/* sử dụng thẻ tippy để khi hover vào nó hiện chữ ra, placement để nó lonh động */}
                </button>
            </div>
        </HeadlessTippy>
        </div>
    );
}

export default Search;
