import { Fragment, useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';

import FeaturedItems from "../components/Featured/Items/FetauredItems";
import FeaturedCategories from "../components/Featured/Categories/FeaturedCategories";
import { TabTitle } from "../utils/General";
import {getGachas} from '../redux/actions/gachaAction';

const Home = () => {
    const dispatch=useDispatch();
    let { categoryId } = useParams();
    categoryId=categoryId?categoryId:'all';
    const [ gachas, setGachas ] = useState([])
    TabTitle("Home - Gacha");

    useEffect(() => {
        async function getData(){
            await dispatch(getGachas(categoryId))
            .then(res=>{
                setGachas(res);
            });
            window.scrollTo(0, 0);
        }
        getData();        
    }, [dispatch, categoryId])

    return ( 
        <Fragment>
            {gachas.length>0&&<FeaturedItems items={gachas}/>}            
        </Fragment>
    );
}
 
export default Home;