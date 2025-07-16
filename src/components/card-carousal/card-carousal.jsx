import "./cardCarousal.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

function CardCarousal() {
  const images = [
    "/images/burger.jpg",
    "/images/menu.jpg",
    "/images/salad.jpg",
    "/images/wrap.jpg",
    "/images/sides.jpg",
  ];
  return (
    <>
      <Swiper
        spaceBetween={5}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="slide-inner">
              <div>
                <div className="card-image">
                  <img src={src} alt={`Slide ${index}`} className="card-img" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default CardCarousal;
