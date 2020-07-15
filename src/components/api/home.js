import gql from "graphql-tag";

export const GET_IMAGE_URL = gql`
  query MyQuery($product_id: Int!, $image_id: Int!) {
    product_images(
      where: { product_id: { _eq: $product_id }, image_id: { _eq: $image_id } }
    ) {
      image_url
      id
      product_id
      image_id
      category
      view
      isLabelled
      item_category
      segmented_image
      segmented_image_back
      gender
      is_rolled_up
      is_tucked_in
      is_occluded
    }
  }
`;

export const UPDATE_DATA = gql`
  mutation MyMutation(
    $product_id: Int!
    $image_id: Int
    $category: String!
    $view: String
    $isLabelled: String!
    $item_category: String!
    $gender: String!
  ) {
    update_product_images(
      where: { product_id: { _eq: $product_id }, image_id: { _eq: $image_id } }
      _set: {
        category: $category
        view: $view
        isLabelled: $isLabelled
        item_category: $item_category
        gender: $gender
      }
    ) {
      affected_rows
    }
  }
`;

export const GET_IDS = gql`
  query MyQuery($id: Int) {
    product_images(where: { id: { _eq: $id } }) {
      product_id
      image_id
    }
  }
`;

export const SAVE_IMAGE = gql`
  mutation MyMutation(
    $product_id: Int!
    $image_id: Int
    $segmented_image: String!
  ) {
    update_product_images(
      where: { product_id: { _eq: $product_id }, image_id: { _eq: $image_id } }
      _set: { segmented_image: $segmented_image }
    ) {
      affected_rows
    }
  }
`;

export const GET_PRODUCT_CONDITION = gql`
  query MyQuery4($product_id: Int!) {
    product_condition(where: { product_id: { _eq: $product_id } }) {
      product_id
      condition
      isDuplicate
    }
  }
`;

export const UPDATE_CONDITION = gql`
  mutation MyMutation2($product_id: Int!, $condition: String!) {
    update_product_condition(
      where: { product_id: { _eq: $product_id } }
      _set: { condition: $condition }
    ) {
      affected_rows
    }
  }
`;

export const GET_NEXT_10 = gql`
  query getNext10($first: Int!, $last: Int!) {
    product_images(
      where: { product_id: { _gte: $first, _lte: $last } }
      order_by: { product_id: asc }
    ) {
      product_id
      image_id
      image_url
    }
  }
`;

export const UPDATE_NEXT_10 = gql`
  mutation updatenext10($first: Int!, $last: Int!, $condition: String!) {
    update_product_condition(
      where: { product_id: { _lte: $last, _gte: $first } }
      _set: { condition: $condition }
    ) {
      affected_rows
    }
  }
`;

export const SAVE_EXTRA_IMAGE = gql`
  mutation MyMutation(
    $product_id: Int!
    $image_id: Int
    $segmented_image_back: String!
  ) {
    update_product_images(
      where: { product_id: { _eq: $product_id }, image_id: { _eq: $image_id } }
      _set: { segmented_image_back: $segmented_image_back }
    ) {
      affected_rows
    }
  }
`;

export const UPDATE_ISDUPLICATE = gql`
  mutation MyMutation3($product_id: Int!, $isDuplicate: Boolean!) {
    update_product_condition(
      where: { product_id: { _eq: $product_id } }
      _set: { isDuplicate: $isDuplicate }
    ) {
      affected_rows
      returning {
        product_id
        isDuplicate
      }
    }
  }
`;

export const GET_NEXT_10_DUPLICATE = gql`
  query getNext10($first: Int!, $last: Int!) {
    product_condition(
      where: { product_id: { _gte: $first, _lte: $last } }
      order_by: { product_id: asc }
    ) {
      product_id
      isDuplicate
    }
  }
`;

export const GET_PRODUCT_IDS_CONDITION = gql`
  query MyQuery($current: Int!) {
    product_condition(
      where: { condition: { _eq: "good" }, product_id: { _gt: $current } }
      limit: 1
      order_by: { product_id: asc }
    ) {
      product_id
    }
  }
`;

export const CHECK_PRODUCT_ID_CONDITION = gql`
  query MyQuery($current: Int!) {
    product_condition(
      where: {
        _and: [
          { product_id: { _gte: $current } }
          { condition: { _eq: "good" } }
          {
            _or: [
              { item_category: { _eq: "tops" } }
              { item_category: { _eq: "t-shirts" } }
              { item_category: { _eq: "shirts" } }
              { item_category: { _eq: "suits" } }
              { item_category: { _eq: "sweatshirts" } }
              { item_category: { _eq: "hoodies" } }
              { item_category: { _eq: "jackets" } }
            ]
          }
        ]
      }
      limit: 1
      order_by: { product_id: asc }
    ) {
      product_id
    }
  }
`;

export const GET_ALL_IMAGES = gql`
  query MyQuery3($product_id: Int!) {
    product_images(
      where: {
        _and: [
          { product_id: { _eq: $product_id } }
          { category: { _eq: "Person" } }
        ]
      }
      order_by: { image_id: asc }
    ) {
      image_url
      id
      image_id
      segmented_image
      segmented_image_back
      occludedBy
      tuckedIn
      sleeves
      topwear_viewed
      one_product
    }
  }
`;

export const UPDATE_PERSON_DATA = gql`
  mutation MyMutation(
    $product_id: Int!
    $image_id: Int
    $occludedBy: String!
    $tuckedIn: String!
    $sleeves: String!
    $one_product: String!
  ) {
    update_product_images(
      where: { product_id: { _eq: $product_id }, image_id: { _eq: $image_id } }
      _set: { occludedBy: $occludedBy, tuckedIn: $tuckedIn, sleeves: $sleeves, topwear_viewed: "Yes", one_product: $one_product }
    ) {
      affected_rows
    }
  }
`;

export const GET_PRODUCT_ID_HELPER = gql`
  query MyQuery($current: Int!, $limit: Int!) {
    product_condition(
      where: {
        _and: [
          { product_id: { _gte: $current } }
          { condition: { _eq: "good" } }
          {
            _or: [
              { item_category: { _eq: "tops" } }
              { item_category: { _eq: "t-shirts" } }
              { item_category: { _eq: "shirts" } }
              { item_category: { _eq: "suits" } }
              { item_category: { _eq: "sweatshirts" } }
              { item_category: { _eq: "hoodies" } }
              { item_category: { _eq: "jackets" } }
            ]
          }
        ]
      }
      limit: $limit
      order_by: { product_id: asc }
    ) {
      product_id
    }
  }
`;
