import { Box, Button, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useContext } from "react";
import UserDetailContext from "../../context/UserDetailContext";
import useProperties from "../../hooks/useProperties.jsx";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { createCar, updateCar } from "../../utils/api";
const Facilities = ({
  prevStep,
  propertyDetails,
  setPropertyDetails,
  setOpened,
  setActiveStep,
  id
}) => {
  const form = useForm({
    initialValues: {
      seats: propertyDetails.facilities.seats,
      mileage: propertyDetails.facilities.mileage,
      FuelCapacity: propertyDetails.facilities.FuelCapacity,
    },
    validate: {
      seats: (value) => (value < 1 ? "Must have atleast one seat" : null),
      mileage: (value) =>
        value < 1 ? "Must have atleast some mileage" : null,
    },
  });

  const { seats, mileage, FuelCapacity } = form.values;
console.log(propertyDetails)
  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({
        ...prev,
        facilities: { seats, mileage, FuelCapacity },
      }));
      mutate();
    }
  };

  // ==================== upload logic

  const { userDetails } = useContext(UserDetailContext);
  const { refetch: refetchProperties } = useProperties();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      updateCar(
        id,
        {
          ...propertyDetails,
          facilities: { seats, mileage, FuelCapacity },
        },
        userDetails?.token
      ),
    onError: ({ response }) =>
      toast.error(response.data.message, { position: "bottom-right" }),
    onSuccess: () => {
      toast.success("Added Successfully", { position: "bottom-right" });
      setPropertyDetails({
        title: "",
        description: "",
        price: 0,
        tags: "",
        image: null,
        facilities: {
          seats: 0,
          mileage: 0,
          FuelCapacity: 0,
        },
        userEmail: userDetails?.email,
      });
      setOpened(false);
      setActiveStep(0);
      refetchProperties();
    },
  });

  return (
    <Box maw="30%" mx="auto" my="sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <NumberInput
          withAsterisk
          label="No of Seats"
          min={0}
          {...form.getInputProps("seats")}
        />
        <NumberInput
          label="Mileage"
          min={0}
          {...form.getInputProps("mileage")}
        />
        <NumberInput
          withAsterisk
          label="Fuel Capacity"
          min={0}
          {...form.getInputProps("FuelCapacity")}
        />
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit" color="green" disabled={isLoading}>
            {isLoading ? "Submitting" : "Add Car"}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default Facilities;
