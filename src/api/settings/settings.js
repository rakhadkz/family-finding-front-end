import { request } from "../../utils/request";

export const fetchPhoneNumbers = () => {
    return request({
      endpoint: `available_phone_numbers/0987654321poiuytrewq`,
      method: "GET",
      isV1: false
    });
  };
  
  
  