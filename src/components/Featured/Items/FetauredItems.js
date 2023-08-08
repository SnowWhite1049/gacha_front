import { Link } from "react-router-dom";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import ItemCard from '../../Card/ItemCard/ItemCard';
import ReactLoading from 'react-loading';
import './FeaturedItems.css'

const FeaturedItems = (props) => {
    const { items } = props;
    return (

        <div className="featured__products__container">
            <div className="featured__products">
                {/* <div className="featured__products__header">
                    <h3 className='featured__items__header__big'>Featured Items </h3><Link to="/shop" className='featured__header__small'>Show all<ArrowRightAltIcon /></Link>
                </div> */}
                {/* <div className="featured__products__header__line"></div> */}
                <div className='d-flex  w-100 justify-content-center  m-auto' >
                    {!items && <ReactLoading type="balls" color='#FFE26E' height={100} width={100} className='m-auto' />}
                    {items &&
                        <div className="featured__products__card__container row">
                            {items.map((item, index) => (
                                <ItemCard item={item} category="featured" key={item.id} />
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default FeaturedItems;