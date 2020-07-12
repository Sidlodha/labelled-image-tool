import React, { useState, useEffect } from "react";
import Home from "./home";
import {
  GET_PRODUCT_IDS_CONDITION,
  CHECK_PRODUCT_ID_CONDITION,
  GET_ALL_IMAGES,
} from "../api/home";
import { useQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";


function App(props) {
  const [id, setId] = useState(props.match.params.productid);
  const [validId, setValidId] = useState();
  const [numOfImages, setNumOfImages] = useState(0);
  const [activeImageId, setActiveImageId] = useState(0);
  const [runApi, setRunApi] = useState(true);

  const history = useHistory();
  if(id!==props.match.params.productid){
    setId(props.match.params.productid)
  }
  const { data: checkData, loading } = useQuery(CHECK_PRODUCT_ID_CONDITION, {
    variables: {
      current: id,
    },
    onCompleted(data) {
      if (data && data.product_condition[0].product_id) {
        if (
          data.product_condition[0].product_id !==
          parseInt(props.match.params.productid)
        ) {
          setId(data.product_condition[0].product_id);
          history.push(
            `productid=${data.product_condition[0].product_id}&imageid=0`
          );
        }
      }
    },
  });

  const { data: product_data } = useQuery(GET_ALL_IMAGES, {
    variables: {
      product_id: id,
    },
    // skip: !validId,
    onCompleted(data) {
      if (data && data.product_images) {
        setNumOfImages(data.product_images.length);
      }
    },
  });

  const handleNext = () => {
    if (activeImageId < numOfImages - 1) {
      history.push(
        `productid=${parseInt(props.match.params.productid)}&imageid=${activeImageId + 1}`
      );
      setActiveImageId(activeImageId + 1);
    }
    else{
      setActiveImageId(0)
      history.push(
        `productid=${parseInt(props.match.params.productid) + 1}&imageid=${0}`
      );
    }
  };

  if (loading) {
    return <div>loading</div>;
  }
  return (
    <div>
      <Home product_images = {product_data && product_data.product_images} nextImage={handleNext} props={props}/>
    </div>
  );

  // const { data, loading, error } = useQuery(GET_PRODUCT_IDS_CONDITION,{
  //   variables: {
  //     current: id
  //   }
  // });

  // const {data: product_data} = useQuery(GET_ALL_IMAGES,{
  //   variables: {
  //     product_id: validId
  //   },
  //   onCompleted(data){
  //     console.log(data, "here 1")
  //     if(data && data.product_images){
  //       setNumOfImages(data.product_images.length)
  //       if(data.product_images.length > 0){
  //         setActiveImageId(0)
  //       }
  //     }
  //   }
  // })

  // useEffect(() => {

  //   if(checkData && checkData.product_condition[0].product_id){
  //     if(checkData.product_condition[0].product_id === parseInt(props.match.params.productid)){
  //       setValidId(parseInt(props.match.params.productid))
  //     }
  //     else{
  //       setValidId(data && data.product_condition[0].product_id)
  //     }
  //   }

  // }, [checkData, data])

  // useEffect(()=>{
  //   if(activeImageId>=numOfImages){
  //     console.log(data, "here 2")
  //   }
  // },[activeImageId])

  // const nextGoodProduct = () => {
  //   if(product_data && product_data.product_images){
  //     history.push(`productid=${checkData.product_condition[0].product_id}&imageid=${product_data.product_images[activeImageId].image_id}`)
  //   }

  // }

  // useEffect(()=>{
  //   nextGoodProduct()
  //   setActiveImageId(0)
  // },[id])

  // const history = useHistory()

  // const nextImage = () => {
  //   console.log(activeImageId, numOfImages)
  //   if(activeImageId<numOfImages - 1){
  //     const nextId = activeImageId + 1
  //     setActiveImageId(nextId)
  //     history.push(`productid=${validId}&imageid=${product_data.product_images[nextId].image_id}`)
  //   }
  //   else{
  //     setActiveImageId(0)
  //   }
  // }

  // if(checkData && checkData.product_condition[0].product_id){
  //   if(checkData.product_condition[0].product_id !== parseInt(props.match.params.productid)){
  //     return <div>Not a good product <button onClick={nextGoodProduct}> Next </button></div>
  //   }
  // }
  // console.log(data, checkData, product_data)
  // return <Home id = {validId} product_images = {product_data && product_data.product_images} nextImage={nextImage}/>;
}

export default App;
