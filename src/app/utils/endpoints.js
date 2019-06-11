const baseUrl = "https://iff00umlx0.execute-api.us-east-1.amazonaws.com/split-dev-two/";

// Healt
export const HEALT_DETAILED = baseUrl + "health/detailed";
export const HEALT_CHECK = baseUrl + "/health/check";

// Users 
export const USERS_COGNITO = baseUrl + "/users/cognito"; 
export const USERS_PHONE = baseUrl + "/users/phone";
export const USERS_PROFILE = baseUrl + "/users/profile"; 
export const USERS_PROFILE_FILTER = baseUrl + "/users/profile/filter"; 
export const USERS_PROFILE_LOCATION = baseUrl + "/users/profile/location";
 
// Events
export const EVENTS = baseUrl + "/events"; 
export const EVENTSBRIDE = baseUrl + "/events/brite"; 
export const EVENTS_ID = baseUrl + "/events/{id}";
export const EVENTS_ID_REPLACE = "{id}";

// User interests
export const USER_INTERESTS = baseUrl + "/userinterests";
export const USER_INTERESTS_ENTITY = baseUrl + "/userinterests/entity";
export const USER_INTERESTS_ENTITY_COUNT = baseUrl + "/userinterests/entity/count";
export const USER_INTERESTS_ENTITY_MULTIPLE = baseUrl + "/userinterests/entity/multiple";
export const USER_INTERESTS_SIMILAR = baseUrl + "/userinterests/similar";
export const USER_INTERESTS_ID = baseUrl + "/userinterests/{interestId}";
export const USER_INTERESTS_ID_REPLACE = "{interestId}";

// Files
export const FILES_REQUEST_UPLOAD = baseUrl + "/files/requestUpload";
export const FILES_ID= baseUrl + "/files/{id}";
export const FILES_ID_REPLACE = "{id}";

// Categories
export const CATEGORIES = baseUrl + "/categories";
export const CATEGORIES_SEARCH = baseUrl + "/categories/search";
export const CATEGORIES_ID = baseUrl + "/categories/{categoryId}";
export const CATEGORIES_ID_REPLACE = "{categoryId}";

// Category entity
export const C_ENTITIES = baseUrl + "/categories/entities";
export const C_ENTITIES_SEARCH = baseUrl + "/categories/entities/search";
export const C_ENTITIES_ID = baseUrl + "/categories/entities/{categoryEntityId}";
export const C_ENTITIES_ID_REPLACE = "{categoryEntityId}";

// User payments 
export const PAYMENTS = baseUrl + "/payments";
export const PAYMENTS_ID = baseUrl + "/payments/{paymentId}";
export const PAYMENTS_ID_REPLACE =  "{paymentId}";

// Chats
export const CHAT = baseUrl + "/chat";
export const CHAT_QUICBLOX = baseUrl + "/chat/quickblox";
export const CHAT_SESSION = baseUrl + "/chat/session";
export const CHAT_ID = baseUrl + "/chat/{id}";
export const CHAT_ID_REPLACE = "{id}";

// Notofication
export const NOTIFICATIONS = baseUrl + "/notifications";
export const NOTIFICATIONS_PUBLISH = baseUrl + "/notifications/publish";
export const NOTIFICATIONS_ID = baseUrl + "/notifications/{id}";
export const NOTIFICATIONS_ID_REPLACE = "{id}";

// Actions
export function fetchLink(path, method, data){
  // TODO : Fix autentification token
    return fetch(path, {
        method,
        credentials: "include",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
}


