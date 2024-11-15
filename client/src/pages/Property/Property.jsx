import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteCar, getCar } from "../../utils/api";
import { PuffLoader } from "react-spinners";
import "./Property.css";

import { FaShower } from "react-icons/fa";
import { AiTwotoneCar } from "react-icons/ai";
import { MdLocationPin, MdMeetingRoom } from "react-icons/md";
import UserDetailContext from "../../context/UserDetailContext.js";
import { toast } from "react-toastify";
import Heart from "../../components/Heart/Heart";
import { validateLogin } from "../../utils/common.js";
import UpdatePropertyModal from "../../components/UpdatePropertyModal/UpdatePropertyModal.jsx";
import { useEffect } from "react";
const Property = () => {
  const { pathname } = useLocation();
  const id = pathname.split("/").slice(-1)[0];
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery(["res", id], () => getCar(id));
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const checklogin = () => {
    if (validateLogin() && data?.userEmail === userDetails?.email) return true;
    else return false;
  };
  const handleDelete = () => {
    mutate();
  };
  const [modalOpened, setModalOpened] = useState(false);
  const [mainimg, setMainImg] = useState("");

  const { mutate, isLoadingdel } = useMutation({
    mutationFn: () => deleteCar(id, userDetails?.token),
    onError: ({ response }) =>
      toast.error(response.data.message, { position: "bottom-right" }),
    onSuccess: () => {
      toast.success("Deleted Successfully", { position: "bottom-right" });
      navigate("/");
    },
  });

  useEffect(() => {
    setMainImg(data?.image[0]);
  }, [data]);

  if (isLoading) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <PuffLoader />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="wrapper">
        <div className="flexCenter paddings">
          <span>Error while fetching the car details</span>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="flexColStart paddings innerWidth property-container">
        {/* like button */}
        <div className="like">
          <Heart id={id} />
        </div>

        {/* image */}
        <img src={mainimg} alt="home image" />

        <div className="allimages">
          {data?.image.map((imgurl, index) => {
            return (
              <img
                onMouseEnter={() => {
                  setMainImg(imgurl);
                }}
                src={imgurl}
                alt="home image"
              />
            );
          })}
        </div>

        <div className="flexCenter property-details">
          {/* left */}
          <div className="flexColStart left">
            {/* head */}
            <div className="flexStart head">
              <span className="primaryText">{data?.title}</span>
              <span className="orangeText" style={{ fontSize: "1.5rem" }}>
                $ {data?.price}
              </span>
            </div>

            {/* facilities */}
            <div className="flexStart facilities">
              {/* seats */}
              <div className="flexStart facility">
                <FaShower size={20} color="#1F3E72" />
                <span>{data?.facilities?.seats} Seats</span>
              </div>

              {/* mileage */}
              <div className="flexStart facility">
                <AiTwotoneCar size={20} color="#1F3E72" />
                <span>{data?.facilities.mileage} Mileage</span>
              </div>

              {/* fuel */}
              <div className="flexStart facility">
                <MdMeetingRoom size={20} color="#1F3E72" />
                <span>{data?.facilities.FuelCapacity} Fuel Capacity</span>
              </div>
            </div>

            {/* description */}

            <span className="secondaryText" style={{ textAlign: "justify" }}>
              {data?.description}
            </span>

            {/* address */}

            <div className="flexStart" style={{ gap: "1rem" }}>
              <MdLocationPin size={25} />
              <span className="secondaryText">{data?.tags}</span>
            </div>
          </div>
          <button
            className="button"
            onClick={() => {
              {
                checklogin()
                  ? setModalOpened(true)
                  : toast.error("Please Login with Owner's to Continue", {
                      position: "bottom-right",
                    });
              }
            }}
          >
            Edit Details
          </button>
          <UpdatePropertyModal
            opened={modalOpened}
            setOpened={setModalOpened}
            data={data}
          />
          <button
            className="button"
            onClick={() => {
              {
                checklogin()
                  ? handleDelete()
                  : toast.error("Please Login with Owner's to Continue", {
                      position: "bottom-right",
                    });
              }
            }}
          >
            Delete Car
          </button>
        </div>
      </div>
    </div>
  );
};

export default Property;
