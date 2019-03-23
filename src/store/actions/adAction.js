import axios from "axios";

const URL = "https://lad-network.herokuapp.com";

// ------------------------------------ Get All Ads ------------------------------------

// "GET /api/ads" gets all ads

// ------------------------------------ Get Ad by ID ------------------------------------

export const GET_AD_START = "GET_AD_START";
export const GET_AD_SUCCESS = "GET_AD_SUCCESS";
export const GET_AD_FAILURE = "GET_AD_FAILURE";

export const getAd = adId => dispatch => {
  dispatch({ type: GET_AD_START });
  axios
    .get(`${URL}/api/ads/${adId}`)
    .then(res => {
      dispatch({ type: GET_AD_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: GET_AD_FAILURE, payload: err || err.response.data });
    });
};

// ------------------------------------ Create Ad ------------------------------------

export const CREATE_AD_START = "CREATE_AD_START";
export const CREATE_AD_SUCCESS = "CREATE_AD_SUCCESS";
export const CREATE_AD_FAILURE = "CREATE_AD_FAILURE";

export const createAd = (ad, props) => dispatch => {
  dispatch({ type: CREATE_AD_START });
  let newAd = new FormData();
  newAd.append("offer_id", ad.offer_id);
  newAd.append("headline", ad.headline);
  newAd.append("tagline", ad.tagline);
  newAd.append("message", ad.message);
  newAd.append("cta_button", ad.cta_button);
  newAd.append("destination_url", ad.destination_url);
  newAd.append("image", ad.back_img);
  newAd.append("text_color", ad.text_color);
  newAd.append("btn_color", ad.btn_color);
  newAd.append("btn_text_color", ad.btn_text_color);
  newAd.append("size", ad.size);
  axios
    .post(`${URL}/api/ads`, newAd)
    .then(res => {
      dispatch({ type: CREATE_AD_SUCCESS, payload: res.data });
    })
    .then(() => {
      props.history.push('/dashboard/offers')
    })
    .catch(err => {
      dispatch({ type: CREATE_AD_FAILURE, payload: err.response.data });
    });
};

// ------------------------------------ Get User Ads ------------------------------------

// "GET /api/ads/myads" gets personal users ads (provide token)

// ------------------------------------ Get Offer Ads ------------------------------------

export const GET_OFFER_ADS_START = "GET_OFFER_ADS_START"
export const GET_OFFER_ADS_SUCCESS = "GET_OFFER_ADS_SUCCESS"
export const GET_OFFER_ADS_FAILURE = "GET_OFFER_ADS_FAILURE"

export const getOfferAds = offer_id => dispatch => {
  dispatch({ type: GET_OFFER_ADS_START })
  axios
    .get(`${URL}/api/ads/offers/${offer_id}`)
    .then(res => {
      dispatch({ type: GET_OFFER_ADS_SUCCESS, payload: res.data })
    })
    .catch(err => {
      dispatch({ type: GET_OFFER_ADS_FAILURE, payload: err.response.data})
    })
}