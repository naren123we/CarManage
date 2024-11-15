import { useContext, useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { useMutation } from "react-query";
import UserDetailContext from "../../context/UserDetailContext";
import {
  checkFavourites,
  updateFavourites,
  validateLogin,
} from "../../utils/common";
import { toFav } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Heart = ({ id }) => {
  const [heartColor, setHeartColor] = useState("white");

  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const history = useNavigate();

  useEffect(() => {
    setHeartColor(() => checkFavourites(id, userDetails?.favourites));
  }, [userDetails?.favourites]);

  const { mutate } = useMutation({
    mutationFn: () => toFav(id, userDetails?.email, userDetails?.token),
    onSuccess: () => {
      setUserDetails((prev) => ({
        ...prev,
        favourites: updateFavourites(id, prev.favourites),
      }));
    },
  });

  const handleLike = () => {
    if (validateLogin()) {
      mutate();
      setHeartColor((prev) => (prev === "#fa3e5f" ? "white" : "#fa3e5f"));
    } else {
      toast.error("Please Login to continue", {
        position: "bottom-right",
      });
    }
  };

  return (
    <AiFillHeart
      size={24}
      color={heartColor}
      onClick={(e) => {
        e.stopPropagation();
        handleLike();
      }}
    />
  );
};

export default Heart;
