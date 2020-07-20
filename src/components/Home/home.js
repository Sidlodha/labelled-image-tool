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
    occluded: product_images
      ? product_images[props.props.match.params.imageid]
        ? product_images[props.props.match.params.imageid].occludedBy
          ? product_images[props.props.match.params.imageid].occludedBy
          : "No"
        : "No"
      : "No",
    one_product: product_images
      ? product_images[props.props.match.params.imageid]
        ? product_images[props.props.match.params.imageid].sleeves
        : "Yes"
      : "Yes",
    sleeves: product_images
      ? product_images[props.props.match.params.imageid]
        ? product_images[props.props.match.params.imageid].sleeves
        : "No"
      : "No",
    tuckedIn: product_images
      ? product_images[props.props.match.params.imageid]
        ? product_images[props.props.match.params.imageid].tuckedIn
        : "No"
      : "No",
    cloth_parsing: product_images
      ? product_images[props.props.match.params.imageid]
        ? product_images[props.props.match.params.imageid].cloth_parsing
        : "Yes"
      : "Yes",
    pred_decider: "No",
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
    onCompleted(data) {
      if (data) {
        props.nextImage();
      }
    },
    onError(error) {
      alert(
        `The form did not submit. Please check your internet connection. \n For Technical Purpose : ${error}`
      );
    },
  });
  const onInputChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (defaultValues = false) => {
    // if (
    //   formFields.occluded != "No" &&
    //   formFields.occluded != "Others" &&
    //   !picData &&
    //   !product_images[parseInt(props.props.match.params.imageid)]
    //     .segmented_image
    // ) {
    //   alert("Please save the segmented image.");
    //   return;
    // }
    if (
      formFields.occluded == "" ||
      formFields.sleeves == "" ||
      formFields.tuckedIn == "" ||
      formFields.one_product == ""
    ) {
      alert("Please fill all the details.");
      return;
    }
    await submitData({
      variables: {
        product_id: props.props.match.params.productid,
        image_id:
          product_images &&
          product_images[props.props.match.params.imageid].image_id,
        occludedBy: formFields.occluded,
        sleeves: formFields.sleeves,
        tuckedIn: formFields.tuckedIn,
        one_product: formFields.one_product,
        cloth_parsing: formFields.cloth_parsing,
      },
    });
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

  const linkChange_id = (id) => {
    return `https://storage.cloud.google.com/naman-bucket/dataset/parsings/${id}_parse_vis.png`;
    if (id === undefined) {
      return undefined;
    } else {
      return `https://storage.googleapis.com/download/storage/v1/b/naman-bucket/o/dataset/parsings/${id}_parse_vis.png?alt=media`;
    }
  };
  useEffect(() => {
    if (product_images) {
      setFormFields({
        occluded:
          product_images[props.props.match.params.imageid].occludedBy || "No",
        tuckedIn:
          product_images[props.props.match.params.imageid].tuckedIn || "No",
        sleeves:
          product_images[props.props.match.params.imageid].sleeves || "No",
        one_product:
          product_images[props.props.match.params.imageid].one_product || "Yes",
        cloth_parsing:
          product_images[props.props.match.params.imageid].cloth_parsing || "Yes",
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
        one_product:
          product_images[props.props.match.params.imageid].one_product || "Yes",
        cloth_parsing:
          product_images[props.props.match.params.imageid].cloth_parsing || "Yes",
      });
    } else {
      setEdit(false);
    }
  }, [product_images, props.props.match.params.imageid]);

  const clickAutoFill = () => {
    setFormFields({
      occluded: "No",
      one_product: "Yes",
      sleeves: "No",
      tuckedIn: "No",
    });
  };

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
          {product_images &&
            product_images[parseInt(props.props.match.params.imageid)] &&
            product_images[parseInt(props.props.match.params.imageid)]
              .topwear_viewed === "Yes" && (
              <div style={{ fontSize: "18px" }}>
                <b>The topwear is Viewed </b>
              </div>
            )}
          {formFields.occluded == "No" &&
            formFields.one_product == "Yes" &&
            formFields.sleeves == "No" &&
            formFields.tuckedIn == "No" && (
              <Button
                onClick={() => handleSubmit(true)}
                variantColor="green"
                style={{ margin: "10px" }}
              >
                Proceed with Default values >>>
              </Button>
            )}
          <FormControl>
            <FormLabel htmlFor="one_product">
              Is there only one topwear in the image ?
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
              <option value="No">No</option>
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
          <FormControl>
            <FormLabel htmlFor="cloth_parsing">
              {" "}
              Does the cloth parsing look reasonable ?
            </FormLabel>
            <Select
              name="cloth_parsing"
              placeholder="Select option"
              value={formFields.cloth_parsing}
              onChange={onInputChange}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </Select>
          </FormControl>
          {/* <Button
            variantColor="green"
            style={{ margin: "10px" }}
            onClick={clickAutoFill}
          >
            Autofill & Submit
          </Button> */}
          <Button
            onClick={handleSubmit}
            variantColor="green"
            style={{ margin: "10px" }}
          >
            Submit
          </Button>
          <Button onClick={props.nextImage} style={{ margin: "10px" }}>
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
        {false && !edit &&
          formFields.occluded &&
          formFields.occluded != "No" &&
          formFields.occluded != "Others" && (
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
                    product_images[props.props.match.params.imageid]
                      .image_url &&
                    linkChange(
                      product_images[props.props.match.params.imageid].image_url
                    )
                  }
                  load={product_images && product_images.length > 0}
                  isOccluded={formFields.occluded}
                  pred_decider={"No"}
                  setPicData={setPicData}
                  product_id={parseInt(props.props.match.params.productid)}
                  image_id={
                    product_images &&
                    product_images[parseInt(props.props.match.params.imageid)]
                      .image_id
                  }
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
      <Box>
        <Image
          style={{ margin: "50px 10px 0px 10px" }}
          src={
            product_images &&
            product_images[parseInt(props.props.match.params.imageid)].id &&
            linkChange_id(product_images[props.props.match.params.imageid].id)
          }
          htmlWidth={384}
        />
      </Box>
    </div>
  );
}

export default Home;
