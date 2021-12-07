import { gql } from "apollo-boost";

const LOGIN_QUERY = gql`
  query LoginQuery($email: String, $password: String) {
    login(email: $email, password: $password) {
      status
      errCode
      token
      user {
        is_owner
        name
        email_id
        password
        date_of_birth
        address_line_1
        city
        state
        country
        zipcode
        nick_name
        profile_pic_file_path
        customer_id
        restaurant_id
        description
        restaurant_address_line_one
        restaurant_city
        restaurant_state
        restaurant_country
        restaurant_zipcode
        image_file_path
        phone_num
        restaurant_start_time
        restaurant_end_time
        restaurant_week_start
        restaurant_week_end
        national_brand
        delivery_type
      }
    }
  }
`;

const GET_ALL_RESTAURANTS_QUERY = gql`
  query getRestaurantsQuery {
    getRestaurants {
      status
      errCode
      allRestaurants {
        is_search_result
        is_owner
        name
        email_id
        restaurant_id
        password
        description
        restaurant_address_line_one
        restaurant_city
        restaurant_state
        restaurant_country
        restaurant_zipcode
        image_file_path
        phone_num
        restaurant_start_time
        restaurant_end_time
        restaurant_week_start
        restaurant_week_end
        national_brand
        delivery_type
      }
    }
  }
`;

// const SIGN_UP_CUSTOMER = gql`
//   mutation signUpCustomer(
//     $name: String
//     $email: String
//     $password: String
//     $address_line_1: String
//     $city: String
//     $state: String
//     $country: String
//     $zipcode: String
//   ) {
//     signUpCustomer(
//       name: $name
//       email: $email
//       password: $password
//       address_line_1: $address_line_1
//       city: $city
//       state: $state
//       country: $country
//       zipcode: $zipcode
//     ) {
//       status
//       token
//       errCode
//       user {
//         customer_id
//         is_owner
//         name
//         email_id
//         password
//         address_line_1
//         city
//         state
//         country
//         zipcode
//         date_of_birth
//         nick_name
//         phone_num
//         profile_pic_file_path
//       }
//     }
//   }
// `;

// const UPDATE_CUSTOMER = gql`
//   query profileCustomer(
//     $name: String
//     $email: String
//     $password: String
//     $address_line_1: String
//     $city: String
//     $state: String
//     $country: String
//     $zipcode: String
//     $date_of_birth: String
//     $nick_name: String
//     $phone_num: String
//     $profile_pic_file_path: String
//     $customer_id: String
//   ) {
//     profileCustomer(
//       name: $name
//       email: $email
//       password: $password
//       address_line_1: $address_line_1
//       city: $city
//       state: $state
//       country: $country
//       zipcode: $zipcode
//       date_of_birth: $date_of_birth
//       nick_name: $nick_name
//       phone_num: $phone_num
//       profile_pic_file_path: $profile_pic_file_path
//       customer_id: $customer_id
//     ) {
//       status
//       errCode
//       user {
//         customer_id
//         is_owner
//         name
//         email_id
//         password
//         address_line_1
//         city
//         state
//         country
//         zipcode
//         date_of_birth
//         nick_name
//         phone_num
//         profile_pic_file_path
//       }
//     }
//   }
// `;

const GET_CUSTOMER_ORDERS = gql`
  query getOrderStatus($customer_id: String) {
    getOrderStatus(customer_id: $customer_id) {
      status
      errCode
      orders {
        order_id
        order_status
        delivery_status
        order_total
        tax
        delivery_cost
        gratitude
        sub_total
        order_delivery_type
        order_address_line_1
        order_city
        order_state
        order_country
        order_zipcode
        notes
        restaurant_name
        restaurant_image_file_path
        restaurant_city
        customer_name
        customer_id
        restaurant_id
        create_time
        dishes {
          _id
          dish_name
          quantity
          price
        }
      }
    }
  }
`;

// const CUSTOMER_ORDERS_PLACED = gql`
//   query getRestaurantsQuery {
//     getRestaurants {
//       status
//       errCode
//       allRestaurants {
//         is_search_result
//         is_owner
//         name
//         email_id
//         restaurant_id
//         password
//         description
//         restaurant_address_line_one
//         restaurant_city
//         restaurant_state
//         restaurant_country
//         restaurant_zipcode
//         image_file_path
//         phone_num
//         restaurant_start_time
//         restaurant_end_time
//         restaurant_week_start
//         restaurant_week_end
//         national_brand
//         delivery_type
//       }
//     }
//   }
// `;

// const SIGN_UP_OWNER = gql`
//   query signUpOwner(
//     $name: String
//     $email: String
//     $password: String
//     $restaurant_address_line_one: String
//     $restaurant_city: String
//     $restaurant_state: String
//     $restaurant_country: String
//     $restaurant_zipcode: String
//   ) {
//     signUpOwner(
//       name: $name
//       email: $email
//       password: $password
//       restaurant_address_line_one: $restaurant_address_line_one
//       restaurant_city: $restaurant_city
//       restaurant_state: $restaurant_state
//       restaurant_country: $restaurant_country
//       restaurant_zipcode: $restaurant_zipcode
//     ) {
//       status
//       token
//       errCode
//       user {
//         is_owner
//         restaurant_id
//         name
//         email_id
//         password
//         description
//         restaurant_address_line_one
//         restaurant_city
//         restaurant_state
//         restaurant_country
//         restaurant_zipcode
//         restaurant_zipcode
//         image_file_path
//         restaurant_start_time
//         restaurant_end_time
//         delivery_type
//       }
//     }
//   }
// `;

// const UPDATE_OWNER = gql`
//   query profileOwner(
//     $restaurant_id: String
//     $name: String
//     $email: String
//     $password: String
//     $description: String
//     $phone_num: String
//     $restaurant_address_line_one: String
//     $restaurant_city: String
//     $restaurant_state: String
//     $restaurant_country: String
//     $restaurant_zipcode: String
//     $image_file_path: String
//     $restaurant_start_time: String
//     $restaurant_end_time: String
//     $delivery_type: String
//   ) {
//     profileOwner(
//       restaurant_id: $restaurant_id
//       name: $name
//       email_id: $email
//       password: $password
//       description: $description
//       phone_num: $phone_num
//       restaurant_address_line_one: $restaurant_address_line_one
//       restaurant_city: $restaurant_city
//       restaurant_state: $restaurant_state
//       restaurant_country: $restaurant_country
//       restaurant_zipcode: $restaurant_zipcode
//       image_file_path: $image_file_path
//       restaurant_start_time: $restaurant_start_time
//       restaurant_end_time: $restaurant_end_time
//       delivery_type: $delivery_type
//     ) {
//       status
//       errCode
//       user {
//         is_owner
//         restaurant_id
//         name
//         email_id
//         password
//         description
//         restaurant_address_line_one
//         restaurant_city
//         restaurant_state
//         restaurant_country
//         restaurant_zipcode
//         restaurant_zipcode
//         image_file_path
//         restaurant_start_time
//         restaurant_end_time
//         delivery_type
//       }
//     }
//   }
// `;

const ALL_DISHES_LIST = gql`
  query getAllDishes($restaurant_id: String) {
    getAllDishes(restaurant_id: $restaurant_id) {
      status
      errCode
      allDishes {
        name
        dish_id
        description
        ingredients
        price
        image_file_path
        category
        dish_type
        cuisine_type
        dish_start_time
        dish_end_time
        isActive
        restaurant_id
      }
    }
  }
`;

const GET_OWNER_DETAILS = gql`
  query getOwnerRestaurantDetails($restaurant_id: String) {
    getOwnerRestaurantDetails(restaurant_id: $restaurant_id) {
      status
      errCode
      user {
        is_owner
        restaurant_id
        name
        email_id
        phone_num
        password
        description
        restaurant_address_line_one
        restaurant_city
        restaurant_state
        restaurant_country
        restaurant_zipcode
        restaurant_zipcode
        image_file_path
        restaurant_start_time
        restaurant_end_time
        delivery_type
      }
    }
  }
`;

// const ADD_DISH = gql`
//   query dishesAddDish(
//     $dishname: String
//     $dishdescription: String
//     $restaurentId: String
//     $price: String
//     $ingredients: String
//     $dishcategory: String
//     $imageFilePath: String
//     $dishtype: String
//   ) {
//     dishesAddDish(
//       dishname: $dishname
//       dishdescription: $dishdescription
//       dishtype: $dishtype
//       restaurentId: $restaurentId
//       imageFilePath: $imageFilePath
//       price: $price
//       ingredients: $ingredients
//       dishcategory: $dishcategory
//     ) {
//       status
//       errCode
//       allDishes {
//         name
//         dish_id
//         description
//         ingredients
//         price
//         image_file_path
//         category
//         dish_type
//         cuisine_type
//         dish_start_time
//         dish_end_time
//         isActive
//         restaurant_id
//       }
//     }
//   }
// `;

// const UPDATE_DISH = gql`
//   query dishesUpdateDish(
//     $dishname: String
//     $dishdescription: String
//     $restaurentId: String
//     $price: String
//     $ingredients: String
//     $dishcategory: String
//     $imageFilePath: String
//     $dishtype: String
//     $dishId: String
//     $isActive: String
//   ) {
//     dishesUpdateDish(
//       dishId: $dishId
//       dishname: $dishname
//       dishdescription: $dishdescription
//       dishtype: $dishtype
//       restaurentId: $restaurentId
//       imageFilePath: $imageFilePath
//       price: $price
//       ingredients: $ingredients
//       dishcategory: $dishcategory
//       isActive: $isActive
//     ) {
//       status
//       errCode
//       allDishes {
//         name
//         dish_id
//         description
//         ingredients
//         price
//         image_file_path
//         category
//         dish_type
//         cuisine_type
//         dish_start_time
//         dish_end_time
//         isActive
//         restaurant_id
//       }
//     }
//   }
// `;

const GET_COMPLETED_ORDERS = gql`
  query getCompletedOrders($restaurant_id: String) {
    getCompletedOrders(restaurant_id: $restaurant_id) {
      status
      errCode
      orders {
        order_id
        order_status
        delivery_status
        order_total
        tax
        delivery_cost
        gratitude
        sub_total
        order_delivery_type
        order_address_line_1
        order_city
        order_state
        order_country
        order_zipcode
        notes
        restaurant_name
        restaurant_image_file_path
        restaurant_city
        customer_name
        customer_id
        restaurant_id
        dishes {
          _id
          dish_name
          quantity
          price
        }
      }
    }
  }
`;
const GET_NEW_ORDERS = gql`
  query getNewOrders($restaurant_id: String) {
    getNewOrders(restaurant_id: $restaurant_id) {
      status
      errCode
      orders {
        order_id
        order_status
        delivery_status
        order_total
        tax
        delivery_cost
        gratitude
        sub_total
        order_delivery_type
        order_address_line_1
        order_city
        order_state
        order_country
        order_zipcode
        notes
        restaurant_name
        restaurant_image_file_path
        restaurant_city
        customer_name
        customer_id
        restaurant_id
        dishes {
          _id
          dish_name
          quantity
          price
        }
      }
    }
  }
`;

// const NEW_ORDERS_UPDATE = gql`
//   query ordersNewOrderUpdate(
//     $order_status: String
//     $restaurant_id: String
//     $order_id: String
//     $delivery_status: String
//   ) {
//     ordersNewOrderUpdate(
//       order_status: $order_status
//       restaurant_id: $restaurant_id
//       order_id: $order_id
//       delivery_status: $delivery_status
//     ) {
//       status
//       errCode
//       orders {
//         order_id
//         order_status
//         delivery_status
//         order_total
//         tax
//         delivery_cost
//         gratitude
//         sub_total
//         order_delivery_type
//         order_address_line_1
//         order_city
//         order_state
//         order_country
//         order_zipcode
//         notes
//         restaurant_name
//         restaurant_image_file_path
//         restaurant_city
//         customer_name
//         customer_id
//         restaurant_id
//         dishes {
//           _id
//           dish_name
//           quantity
//           price
//         }
//       }
//     }
//   }
// `;

const GET_CUSTOMERS_RESTAURANT_DETAILS = gql`
  query getRestaurantDetails($restaurant_id: String) {
    getRestaurantDetails(restaurant_id: $restaurant_id) {
      status
      errCode
      restaurentDetails {
        is_owner
        restaurant_id
        name
        email_id
        password
        description
        restaurant_address_line_one
        restaurant_city
        restaurant_state
        restaurant_country
        restaurant_zipcode
        restaurant_zipcode
        image_file_path
        restaurant_start_time
        restaurant_end_time
        delivery_type
      }
    }
  }
`;

const GET_CUSTOMERS_RESTAURANT_DISHES = gql`
  query getAllDishes($restaurant_id: String) {
    getAllDishes(restaurant_id: $restaurant_id) {
      status
      errCode
      allDishes {
        name
        dish_id
        description
        ingredients
        price
        image_file_path
        category
        dish_type
        cuisine_type
        dish_start_time
        dish_end_time
        isActive
        restaurant_id
      }
    }
  }
`;

// const CUSTOMER_ORDER_PLACED = gql`
//   query ordersNewOrderAdd(
//     $customerName: String
//     $restaurentId: String
//     $restaurant_name: String
//     $restaurant_city: String
//     $restaurant_image: String
//     $customerId: String
//     $order_status: String
//     $sub_total: Float
//     $delivery_status: String
//     $order_total: Float
//     $tax: Float
//     $delivery_cost: Float
//     $gratitude: Float
//     $sub_total: Float
//     $order_delivery_type: String
//     $order_address_line_1: String
//     $order_city: String
//     $order_state: String
//     $order_country: String
//     $order_zipcode: String
//     $cart_items: [cart_itemsType]
//   ) {
//     ordersNewOrderAdd(
//       customerName: $customerName
//       restaurentId: $restaurentId
//       restaurant_name: $restaurant_name
//       restaurant_city: $restaurant_city
//       restaurant_image: $restaurant_image
//       customerId: $customerId
//       order_status: $order_status
//       sub_total: $sub_total
//       delivery_status: $delivery_status
//       order_total: $order_total
//       tax: $tax
//       delivery_cost: $delivery_cost
//       gratitude: $gratitude
//       sub_total: $sub_total
//       order_delivery_type: $order_delivery_type
//       order_address_line_1: $order_address_line_1
//       order_city: $order_city
//       order_state: $order_state
//       order_country: $order_country
//       order_zipcode: $order_zipcode
//       dishes: $dishes
//       cart_items: $cart_items
//     ) {
//       status
//       errCode
//       orders {
//         price
//       }
//     }
//   }
// `;

// const OWNER_IMAGE_UPLOAD = gql`
//   query fileUplaod($file: String) {
//     fileUplaod(file: $file) {
//       status
//       errCode
//       orders {
//         price
//       }
//     }
//   }
// `;

// const DISHES_IMAGE_UPLOAD = gql`
//   query ordersNewOrderAdd(
//     $customerName: String
//     $restaurentId: String
//     $restaurant_name: String
//     $restaurant_city: String
//     $restaurant_image: String
//   ) {
//     ordersNewOrderAdd(
//       customerName: $customerName
//       restaurentId: $restaurentId
//       sub_total: $sub_total
//       delivery_status: $delivery_status
//       order_total: $order_total
//     ) {
//       status
//       errCode
//       orders {
//         price
//       }
//     }
//   }
// `;

// const CUSTOMER_IMAGE_UPLOAD = gql`
//   query ordersNewOrderAdd(
//     $customerName: String
//     $restaurentId: String
//     $restaurant_name: String
//     $restaurant_city: String
//     $restaurant_image: String
//   ) {
//     ordersNewOrderAdd(
//       customerName: $customerName
//       restaurentId: $restaurentId
//       sub_total: $sub_total
//       delivery_status: $delivery_status
//       order_total: $order_total
//     ) {
//       status
//       errCode
//       orders {
//         price
//       }
//     }
//   }
// `;

export {
  LOGIN_QUERY,
  GET_ALL_RESTAURANTS_QUERY,
  //   SIGN_UP_CUSTOMER,
  //   UPDATE_CUSTOMER,
  GET_CUSTOMER_ORDERS,
  //   SIGN_UP_OWNER,
  //   UPDATE_OWNER,
  ALL_DISHES_LIST,
  GET_OWNER_DETAILS,
  //   ADD_DISH,
  //   UPDATE_DISH,
  GET_NEW_ORDERS,
  GET_COMPLETED_ORDERS,
  //   NEW_ORDERS_UPDATE,
  GET_CUSTOMERS_RESTAURANT_DETAILS,
  GET_CUSTOMERS_RESTAURANT_DISHES,
  //   CUSTOMER_ORDER_PLACED,
  //   OWNER_IMAGE_UPLOAD,
  //   DISHES_IMAGE_UPLOAD,
  //   CUSTOMER_IMAGE_UPLOAD,
};
