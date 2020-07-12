import React from 'react';
import { useMutation, useQuery } from "@apollo/react-hooks";
import {GET_PRODUCT_IDS, TRANSFER_PRODUCT_IDS} from "../Api/home"

function Transfer(){

    // const { loading, error, data } = useQuery(GET_PRODUCT_IDS)
    // const { loading: transfering, error: transferError, data: transferConf }
    // const [insertRows] = useMutation(TRANSFER_PRODUCT_IDS)
    // let data_length = data?.product_images?.length
    // let r = 0
    // let q = 0
    // if(data_length){
    //     console.log(data_length)
    //      r = data_length%10000
    //     console.log(r)
    //      q = Math.floor(data_length/10000)
    //     console.log(q)
    // }
    const transferData = () => {
        
        // console.log(data.product_images[q*10000 + r - 1],"here")
        // for(let i = 0;i<data.product_images.length - 10000; i=i+10000){
        //     console.log(i, i+10000)
        //     setTimeout(function(){
        //         try{ 
        //         insertRows({variables: {row: data.product_images.slice(i,i+10000)}})
        //         }
        //         catch{
                    
        //         }
        //     }, 10000);
            
        // }
        // console.log(q*10000,q*10000 + r )
        
        // insertRows({variables: {row: data.product_images.slice(q*10000,q*10000 + r)}})
    }
    
    return (
        <button onClick={transferData}>
            Transfer
        </button>
    )
}


export default Transfer