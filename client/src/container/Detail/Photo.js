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
                {/* <div className='carousel__container'><img src={`data:image/png;base64, ${new Buffer.from(props.data.coverphoto.data).toString("base64")}`} /></div> */}
                {props.data.photos.map((el, i) =>
                    <div className='carousel__container' key={i}><img src={`data:image/png;base64, ${new Buffer.from(el.data).toString("base64")}`} /></div>)}
            </OwlCarousel>
        </div>
    )
}


export default Photo