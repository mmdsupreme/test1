import Home from '../components/pages/Home';
import PlaceEdit from '../components/pages/PlaceEdit';
import PlaceCreate from '../components/pages/PlaceCreate';
import PlaceDetail from '../components/pages/PlaceDetail';
import PageNotFound from '../components/pages/PageNotFound';

export default [
    { path: '/', name: 'home', component: Home },
    { path: '/place/create', name: 'place-create', component: PlaceCreate },
    { path: '/place/edit/:id', name: 'place-edit', component: PlaceEdit },
    { path: '/place/detail/:id', name: 'place-detail', component: PlaceDetail },
    { path: "*", component: PageNotFound }
]