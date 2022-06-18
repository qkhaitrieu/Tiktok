//layouts
import { HeaderOnly } from '~/components/Layout';
//Pages
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';

const publicRoutes = [
    // không cần đăng nhâp
    { path: '/', component: Home },
    { path: '/following', component: Following },
    { path: '/@:nickname', component: Profile },
    { path: '/upload', component: Upload, layout: HeaderOnly  },
    { path: '/search', component: Search, layout: null  }, // null là không có layout
];
const privateRoutes = [
    //yêu cầu đăng nhập, nếu khôn đăng nhập thì chuyển sang trang lohin
];
export { publicRoutes, privateRoutes };
