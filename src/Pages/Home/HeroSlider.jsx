import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade"
import bg1 from "../../assets/bg1.jpg";
import bg2 from "../../assets/bg2.jpg";
import bg3 from "../../assets/bg3.jpg";
import { Link } from "react-router";

const HeroSlider = () => {
  const slides = [
    {
      image:
        bg1,
      title: "Act Today for a Greener Future ",
      subtitle: "Small sustainable steps today can build a cleaner, greener, and healthier planet for generations to come.",
      btn: "Add Issues",
    },
    {
      image:
       bg2,
      title: "Together We Make It Clean",
      subtitle: "Join hands with your community to clean your surroundings and inspire change through collective action.",
      btn: "Add Issues",
    },
    {
      image:
        bg3,
      title: "Clean City, Healthy Life",
      subtitle: "Our streets deserve to shine. Let’s raise awareness and take action against garbage pollution for a cleaner tomorrow.",
      btn: "Add Issues",
    },
  ];

  return (
    <div className="w-full h-[95vh]">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        effect="fade" 
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        speed={2500} 
        pagination={{ clickable: true }}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[4000ms] ease-in-out scale-105 swiper-slide-active:scale-100"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              ></div>
              <div className="absolute inset-0 bg-black/50"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
                <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg animate-fadeIn text-green-500">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-2xl mb-6 max-w-2xl drop-shadow-md animate-fadeIn delay-200 text-green-200">
                  {slide.subtitle}
                </p>
                <Link to="/add-issues" className=" bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all shadow-lg animate-fadeIn delay-300">
                  {slide.btn}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style>{`
        .swiper-slide div.bg-cover {
          transform: scale(1.1);
          opacity: 0.8;
          transition: transform 4s ease-in-out, opacity 1.5s ease-in-out;
        }
        .swiper-slide-active div.bg-cover {
          transform: scale(1);
          opacity: 1;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1.5s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;