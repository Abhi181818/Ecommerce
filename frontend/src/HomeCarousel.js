import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
const handleDragStart = (e) => e.preventDefault();
function HomeCarousel() {
    const handleOnclick1 = () => {
        window.location.href = "/product/SAMSUNG-S24-Ultra-5G"

    }
    const handleOnclick2 = () => {
        window.location.href = "/product/iPhone-15"
    }
    const handleOnclick3 = () => {
        window.location.href = "/product/Google-Pixel-8"
    }


    const items = [
        <img alt="sample_img" style={{ height: "600px", paddingLeft: "12px" }} src="https://dynaimage.cdn.cnn.com/cnn/digital-images/org/e9ea52b0-5a10-4371-848e-54043c3721a3.jpg" onDragStart={handleDragStart} role="presentation" onClick={handleOnclick1} />,
        <img alt="sample_img" style={{ height: "600px", paddingLeft: "12px" }} src="https://slidechef.net/wp-content/uploads/2023/09/Iphone-15-Presentation-Template.jpg" onDragStart={handleDragStart} role="presentation" onClick={handleOnclick2} />,
        <img alt="sample_img" style={{ height: "600px", paddingLeft: "12px" }} src="https://www.91-cdn.com/pricebaba-blogimages/wp-content/uploads/2023/09/Pixel-8-banner.jpg" onDragStart={handleDragStart} role="presentation" onClick={handleOnclick3} />,
    ];


    return (
        <div className="m-5">
            <AliceCarousel
                mouseTracking="true"
                items={items}
                autoPlay="true"
                keyboardNavigation="true"
                infinite="true"
                autoWidth="true"
                disableButtonsControls="true"
                animationDuration={1000}
                touchTracking="true"

            />
        </div>
    )
}

export default HomeCarousel