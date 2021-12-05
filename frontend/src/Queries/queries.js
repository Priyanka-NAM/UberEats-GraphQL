import { gql } from "apollo-boost";

const LOGIN_QUERY = gql`
  query LoginQuery($email: String, $password: String) {
    login(email: $email, password: $password) {
      status
      errCode
      token
      user {
        is_owner
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

const SIGN_UP_CUSTOMER = gql`
  query signUpCustomer(
    $name: String
    $email: String
    $password: String
    $address_line_1: String
    $city: String
    $state: String
    $country: String
    $zipcode: String
  ) {
    signUpCustomer(
      name: $name
      email: $email
      password: $password
      address_line_1: $address_line_1
      city: $city
      state: $state
      country: $country
      zipcode: $zipcode
    ) {
      status
      token
      errCode
      user {
        name
        email_id
        password
        address_line_1
        city
        state
        country
        zipcode
      }
    }
  }
`;

const UPDATE_CUSTOMER = gql`
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

const CUSTOMER_ORDERS = gql`
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

const CUSTOMER_ORDERS_PLACED = gql`
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

const SIGN_UP_OWNER = gql`
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

export {
  LOGIN_QUERY,
  GET_ALL_RESTAURANTS_QUERY,
  SIGN_UP_CUSTOMER,
  UPDATE_CUSTOMER,
  CUSTOMER_ORDERS,
  SIGN_UP_OWNER,
};
