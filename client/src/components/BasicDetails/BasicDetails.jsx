import React from "react";
import { TextInput, Box, Textarea, Group, Button, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { validateString } from "../../utils/common";

const BasicDetails = ({ prevStep, nextStep, propertyDetails, setPropertyDetails }) => {
  const form = useForm({
    initialValues: {
      title: propertyDetails.title,
      description: propertyDetails.description,
      price: propertyDetails.price,
      tags: propertyDetails.tags
    },
    validate: {
      title: (value) => validateString(value),
      description: (value) => validateString(value),
      price: (value) =>
          value < 1000 ? "Must be greater than 999 dollars" : null,
      tags: (value) => validateString(value),
    },
  });

  const {title, description, price,tags} = form.values


  const handleSubmit = ()=> {
    const {hasErrors} = form.validate()
    if(!hasErrors) {
     setPropertyDetails((prev)=> ({...prev, title, description, price,tags}))
     nextStep()
    }
   }
  return (
    <Box maw="50%" mx="auto" my="md">
      <form  onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
        <TextInput
          withAsterisk
          label="Title"
          placeholder="Brand Name"
          {...form.getInputProps("title")}
        />
        <TextInput
          withAsterisk
          label="Tags"
          placeholder="Enter Tag"
          {...form.getInputProps("tags")}
        />
        <Textarea
          placeholder="Description"
          label="Description"
          withAsterisk
          {...form.getInputProps("description")}
        />
        <NumberInput
          withAsterisk
          label="Price"
          placeholder="1000"
          min={0}
          {...form.getInputProps("price")}
        />
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit">
            Next step
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default BasicDetails;
