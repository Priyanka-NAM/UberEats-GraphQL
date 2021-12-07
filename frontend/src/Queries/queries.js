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
          dish_id
          dish_name
          quantity
          price
        }
      }
    }
  }
`;

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
          dish_id
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
          dish_id
          dish_name
          quantity
          price
        }
      }
    }
  }
`;

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

export {
  LOGIN_QUERY,
  GET_ALL_RESTAURANTS_QUERY,
  GET_CUSTOMER_ORDERS,
  ALL_DISHES_LIST,
  GET_OWNER_DETAILS,
  GET_NEW_ORDERS,
  GET_COMPLETED_ORDERS,
  GET_CUSTOMERS_RESTAURANT_DETAILS,
  GET_CUSTOMERS_RESTAURANT_DISHES,
};
