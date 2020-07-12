import React from "react";
import { Image, Box, Button } from "@chakra-ui/core";
import { useState, useEffect } from "react";
import { FormControl, FormLabel, Select } from "@chakra-ui/core";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { UPDATE_PERSON_DATA, GET_ALL_IMAGES } from "../api/home";
import "./index.css";
import ModelOutput from "../OutputCorrector";

function Home(props) {
  const { product_images } = props;
  const [formFields, setFormFields] = useState({
    occluded: "",
    one_product: product_images
      ? product_images[props.props.match.params.imageid]
        ? product_images[props.props.match.params.imageid].occludedBy
        : ""
      : "",
    sleeves: product_images
      ? product_images[props.props.match.params.imageid]
        ? product_images[props.props.match.params.imageid].sleeves
        : ""
      : "",
    tuckedIn: product_images
      ? product_images[props.props.match.params.imageid]
        ? product_images[props.props.match.params.imageid].tuckedIn
        : ""
      : "",
    pred_decider: "Yes",
    extra_pred_decider: "Yes",
  });
  const [showDropdown, setShowDropDown] = useState(false);
  const [edit, setEdit] = useState(true);
  const [picData, setPicData] = useState();
  const [extraPicData, setExtraPicData] = useState();
  const [submitData] = useMutation(UPDATE_PERSON_DATA, {
    refetchQueries: [
      {
        query: GET_ALL_IMAGES,
        variables: {
          product_id: props.props.match.params.productid,
        },
      },
    ],
  });
  const onInputChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Submit");
    if (formFields.occluded) {
      submitData({
        variables: {
          product_id: props.props.match.params.productid,
          image_id:
            product_images &&
            product_images[props.props.match.params.imageid].image_id,
          occludedBy: formFields.occluded,
          sleeves: formFields.sleeves,
          tuckedIn: formFields.tuckedIn,
        },
      });
      props.nextImage();
    } else {
      alert("Please Fill the required Details");
    }
  };

  const linkChange = (link) => {
    if (link === undefined) {
      return undefined;
    } else {
      return `https://storage.googleapis.com/download/storage/v1/b/${
        link.split("/")[3]
      }/o/${link
        .substring(34 + link.split("/")[3].length)
        .replace(/[/]/g, "%2F")}?alt=media`;
    }
  };

  useEffect(() => {
    if (product_images) {
      setFormFields({
        occluded:
          product_images[props.props.match.params.imageid].occludedBy || "",
        tuckedIn:
          product_images[props.props.match.params.imageid].tuckedIn || "",
        sleeves: product_images[props.props.match.params.imageid].sleeves || "",
      });
    }
    if (
      product_images &&
      product_images[props.props.match.params.imageid].segmented_image
    ) {
      setEdit(true);
      setFormFields({
        occluded:
          product_images[props.props.match.params.imageid].occludedBy || "",
        tuckedIn:
          product_images[props.props.match.params.imageid].tuckedIn || "",
        sleeves: product_images[props.props.match.params.imageid].sleeves || "",
      });
    } else {
      setEdit(false);
    }
  }, [product_images, props.props.match.params.imageid]);

  return (
    <div style={{ display: "flex", padding: "0px 10px" }}>
      <Box margin="50px 0px 0px 0px">
        <Image
          // size="500px"
          height="512px"
          width="384px"
          src={
            product_images &&
            product_images[props.props.match.params.imageid].image_url &&
            linkChange(
              product_images[props.props.match.params.imageid].image_url
            )
          }
          alt="No image in database"
          id="storage_image"
        />
      </Box>

      <Box w="50%" margin="50px 0px 0px 0px">
        <form>
          <FormControl>
            <FormLabel htmlFor="one_product">
              Is there only one product in the image ?
            </FormLabel>
            <Select
              name="one_product"
              placeholder="Select option"
              value={formFields.one_product}
              onChange={onInputChange}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="occluded">Is the top obscured ?</FormLabel>
            <Select
              name="occluded"
              placeholder="Select option"
              value={formFields.occluded}
              onChange={onInputChange}
            >
              <option value="Arm">By Arm</option>
              <option value="Hair">By hair</option>
              <option value="Others">Others</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="sleeves">Are the sleeves rolled up ?</FormLabel>
            <Select
              name="sleeves"
              placeholder="Select option"
              value={formFields.sleeves}
              onChange={onInputChange}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="tuckedIn">Is it tucked in ?</FormLabel>
            <Select
              name="tuckedIn"
              placeholder="Select option"
              value={formFields.tuckedIn}
              onChange={onInputChange}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </FormControl>
          {formFields.occluded !== "" && (
            <FormControl>
              <FormLabel htmlFor="pred_decider">
                Is the Front Prediction Good ?
              </FormLabel>
              <Select
                name="pred_decider"
                placeholder="Select option"
                value={formFields.pred_decider}
                onChange={onInputChange}
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Yes Mod">Yes, but needs to be Modified</option>
              </Select>
            </FormControl>
          )}
          <Button
            onClick={handleSubmit}
            variantColor="green"
            style={{ margin: "10px" }}
          >
            Submit
          </Button>
          <Button onClick={props.nextImage}
           style={{ margin: "10px" }}
          >
            Next
          </Button>
          {edit && (
            <Button
              onClick={() => {
                setEdit(!edit);
              }}
            >
              Edit
            </Button>
          )}
        </form>
      </Box>
      <Box>
        {!edit && formFields.occluded && (
          <div style={{ display: "flex" }}>
            <div>
              <div>FRONT</div>
              <ModelOutput
                image={
                  product_images &&
                  product_images[props.props.match.params.imageid].image_url
                }
                new_image={
                  product_images &&
                  product_images[props.props.match.params.imageid].image_url &&
                  linkChange(
                    product_images[props.props.match.params.imageid].image_url
                  )
                }
                load={product_images && product_images.length > 0}
                isOccluded={formFields.occluded}
                pred_decider={formFields.pred_decider}
                setPicData={setPicData}
                product_id={parseInt(props.props.match.params.productid)}
                image_id={parseInt(props.props.match.params.imageid)}
                canvas_name={"canvas_1"}
              />
            </div>
          </div>
        )}
        {edit && (
          <div style={{ display: "flex", padding: "40px 10px 40px 10px" }}>
            <div>
              <div>FRONT</div>
              <Image
                htmlWidth="384px"
                src={
                  product_images &&
                  product_images[parseInt(props.props.match.params.imageid)]
                    .segmented_image
                }
                alt="No image in database"
                id="storageimage"
              />
            </div>
          </div>
        )}
      </Box>
    </div>
  );
}

export default Home;
