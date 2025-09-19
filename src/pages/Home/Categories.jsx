import { useContext } from "react";
import { CategoryContext } from "../../contexts/CategoryContenxt";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useNavigate } from "react-router";

const Categories = () => {
  const categories = useContext(CategoryContext);
  const navigate = useNavigate();

  return (
    <div className="py-10 bg-base-200">
      {/* Header */}
      <div className="text-center mb-8 px-4">
        <h2 className="text-3xl font-bold text-primary mb-2">
          📚 Explore Categories
        </h2>
        <p className="text-base-content text-md max-w-xl mx-auto">
          Discover genres that spark imagination, fuel curiosity, and inspire
          growth.
        </p>
      </div>

      {/* Slider */}
      <div className="max-w-6xl mx-auto px-4">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          loop
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {categories.map((category, index) => (
            <SwiperSlide className="cursor-pointer" onClick={()=>navigate(`/all-books?category=${category.name}`)} key={index}>
              <div className="card bg-base-100 shadow-sm border rounded-lg overflow-hidden w-56 h-72 mx-auto">
                <figure className="h-32 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                </figure>
                <div className="card-body text-center px-3 py-2 space-y-1">
                  <h3 className="text-lg font-semibold text-primary">
                    {category.name}
                  </h3>
                  <p className="text-xs text-base-content">
                    {category.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Categories;
