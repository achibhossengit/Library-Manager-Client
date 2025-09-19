import React from "react";
import Banner from "./Banner";
import Categories from "./Categories";
import PopularBooks from "./PopularBooks";

const Home = () => {
  return (
    <div>
      <div>
        <Banner></Banner>
      </div>
      <div>
        <Categories></Categories>
      </div>
      <div>
        <PopularBooks></PopularBooks>
      </div>
    </div>
  );
};

export default Home;
