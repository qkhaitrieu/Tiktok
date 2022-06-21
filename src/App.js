import { Fragment } from 'react'; // chỉ chứa, không sinh ra thẻ thật trong DOM
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout  from '~/layouts'; //

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        //nếu mà có layout thì layout = route.layout
                        // còn nếu layout bằng null thì ta lấy Fragment là không có gì, không có layout
                        
                      
                        const Page = route.component;

                        let Layout = DefaultLayout // mặc định là lấy defaultlayout

                        if(route.layout){
                            Layout = route.layout
                        } else if (route.layout === null){
                            Layout =  Fragment
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
