import config from '~/config'
//layouts
import { HeaderOnly } from '~/layouts';
//Pages
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';

const publicRoutes = [
    // không cần đăng nhâp
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly  },
    { path: config.routes.search, component: Search, layout: null  }, // null là không có layout
];
const privateRoutes = [
    //yêu cầu đăng nhập, nếu khôn đăng nhập thì chuyển sang trang login
];
export { publicRoutes, privateRoutes };
