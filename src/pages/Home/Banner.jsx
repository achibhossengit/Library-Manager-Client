import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import library1 from "../../assets/slider/library1.jpg";
import library2 from "../../assets/slider/Library2.jpg";
import library3 from "../../assets/slider/Library2.jpg";

const slides = [
  {
    image: library1,
    title: "Unlock Worlds Beyond Pages",
    description:
      "Dive into endless stories and knowledge with our expansive collection of books. Whether you're into fiction, non-fiction, or academic resources, your next adventure or learning journey is just a click away. Discover new perspectives, meet unforgettable characters, and expand your imagination without limits.",
  },
  {
    image: library2,
    title: "Read. Learn. Grow.",
    description:
      "Our digital library caters to curious minds of all ages. From historical epics and scientific discoveries to thrilling sci-fi and fantasy worlds, every page offers an opportunity to grow, learn, and be inspired. Curate your reading list, track your progress, and make reading an enriching daily habit.",
  },
  {
    image: library3,
    title: "Borrow Smarter, Read Better",
    description:
      "Experience the convenience of borrowing books anytime, anywhere. Our smart library system helps you track your borrowed books, manage due dates, and receive personalized recommendations. Focus on enjoying and learning from every book, while we handle the rest.",
  },
];

const Banner = () => {
  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        className="rounded-lg shadow-lg"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 p-6 bg-base-100">
              {/* Left: Image */}
              <div className="border rounded-lg overflow-hidden animate-fade-in">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-70 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Right: Text */}
              <div className="space-y-4 text-center md:text-left">
                <h2 className="text-4xl font-bold text-primary">
                  {slide.title}
                </h2>
                <p className="text-base-content text-lg">{slide.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
