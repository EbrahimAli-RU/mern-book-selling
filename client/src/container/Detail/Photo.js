import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const Photo = (props) => {
    return (
        <div className='container-fluid' >
            <OwlCarousel items={1}
                className="owl-theme"
                loop nav center dots={false} autoPlay={true} autoplayHoverPause={true}>
                <div className='carousel__container'><img src={`${props.data.coverphoto}`} /></div>
                {props.data.photos.map(el =>
                    <div className='carousel__container' key={el}><img src={`http://localhost:8000/${el}`} /></div>)}
            </OwlCarousel>
        </div>
    )
}


export default Photo