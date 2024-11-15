import React from "react";
import { useQuery } from "react-query";
import { getAllCars } from "../utils/api";

const useProperties = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "allProperties",
    getAllCars,
    { refetchOnWindowFocus: false }
  );

  return {
    data,
    isError,
    isLoading,
    refetch,
  };
};

export default useProperties;
