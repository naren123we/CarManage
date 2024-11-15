import React, { useContext, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import useProperties from "../../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import "../Properties/Properties.css";
import UserDetailContext from "../../context/UserDetailContext";
import { Link } from "react-router-dom";

const Favourites = () => {
  const { data, isError, isLoading } = useProperties();
  const [filter, setFilter] = useState("");
  const { userDetails } = useContext(UserDetailContext);

  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }

  const favourites = data?.filter((property) =>
    userDetails?.favourites?.includes(property._id)
  );

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar filter={filter} setFilter={setFilter} />

        <div className="paddings flexCenter properties">
          {data !== undefined && favourites.length > 0 ? (
            data
              ?.filter((property) =>
                userDetails?.favourites?.includes(property._id)
              )

              .filter(
                (property) =>
                  property.title.toLowerCase().includes(filter.toLowerCase()) ||
                  property.tags.toLowerCase().includes(filter.toLowerCase()) ||
                  property.description.toLowerCase().includes(filter.toLowerCase())
              )
              .map((card, i) => <PropertyCard card={card} key={i} />)
          ) : (
            <div className="noItm_box">
              <img
                src="https://cdn.dribbble.com/users/2698098/screenshots/5957957/untitled-2-01_4x.jpg"
                width={300}
              ></img>
              <p style={{ color: "#1f3e72", fontWeight: 500 }}>
                No Favourits Available
              </p>
              <Link to="/cars">
                <button className="button">Explore Now</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favourites;
