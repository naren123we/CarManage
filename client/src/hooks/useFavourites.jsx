import React, { useContext, useEffect, useRef } from "react";
import UserDetailContext from "../context/UserDetailContext";
import { useQuery } from "react-query";
import { getAllFav } from "../utils/api";

const useFavourites = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const queryRef = useRef();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: "allFavourites",
    queryFn: () => getAllFav(userDetails?.email, userDetails?.token),
    onSuccess: (data) =>
      data ? setUserDetails((prev) => ({ ...prev, favourites: data })) : "",
    enabled: userDetails !== undefined,
    staleTime: 30000,
  });

  queryRef.current = refetch;

  useEffect(() => {
    queryRef.current && queryRef.current();
  }, [userDetails?.token]);

  return { data, isError, isLoading, refetch };
};

export default useFavourites;
