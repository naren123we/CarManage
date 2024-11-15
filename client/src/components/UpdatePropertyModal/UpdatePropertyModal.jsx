import { Container, Modal, Stepper } from "@mantine/core";
import React, { useContext, useState } from "react";
import UploadImage from "../UploadImage/UploadImage";
import BasicDetails from "../BasicDetails/BasicDetails";
import Facilities from "../UpdateFacilities/UpdateFacilities";
import UserDetailContext from "../../context/UserDetailContext";

const UpdatePropertyModal = ({ opened, setOpened,data }) => {
  const [active, setActive] = useState(0);
  const { userDetails, } = useContext(UserDetailContext);

  const [propertyDetails, setPropertyDetails] = useState({
    title: data?.title,
    description: data?.description,
    price: data?.price,
    image:data?.image,
    tags:data?.tags,
    facilities: {
      seats: data?.facilities?.seats,
      mileage: data?.facilities?.mileage,
      FuelCapacity: data?.facilities?.FuelCapacity,
    },
    userEmail: userDetails?.email,
  });

  const nextStep = () => {
    setActive((current) => (current < 4 ? current + 1 : current));
  };

  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      closeOnClickOutside
      size={"90rem"}
    >
      <Container h={"40rem"} w={"100%"}>
        <Stepper
          active={active}
          onStepClick={setActive}
          breakpoint="sm"
          allowNextStepsSelect={false}
        >
          <Stepper.Step label="Images" description="Upload ">
            <UploadImage
              prevStep={prevStep}
              nextStep={nextStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>
          <Stepper.Step label="Basics" description="Details">
            <BasicDetails
              prevStep={prevStep}
              nextStep={nextStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
            />
          </Stepper.Step>

          <Stepper.Step>
            <Facilities
              prevStep={prevStep}
              propertyDetails={propertyDetails}
              setPropertyDetails={setPropertyDetails}
              setOpened={setOpened}
              setActiveStep={setActive}
              id={data?._id}
            />
          </Stepper.Step>
          <Stepper.Completed>
            Completed, click back button to get to previous step
          </Stepper.Completed>
        </Stepper>
      </Container>
    </Modal>
    
  );
};

export default UpdatePropertyModal;
