import {
  GET,
  POST
} from '../util'

const url = {
  SellerRegister: "/seller/register",
  SellerLoginIn: "/seller/login"
}

function SellerRegister(params = {}) {
  return POST(url.SellerRegister, params, false);
}

function SellerLoginIn(params = {}) {
  return POST(url.SellerLoginIn, params, false);
}

//   function AddressInfo(params = {}) {
//     return GET(url.AddressInfo, params);
//   }

//   function FindAllByCounty(params = {}) {
//     return GET(url.FindAllByCounty+"/"+params.code, null);
//   }

export {
  SellerRegister,
  SellerLoginIn
}
