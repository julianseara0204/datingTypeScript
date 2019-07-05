


 const data = {   
    WORK:"none", 
    JOB_TITLE:"", 
    SCHOOL:"", 
    EDUCATION_LEVEL:"", 
    RELIGIOUS_BELIEFS:"",
    POLITICS:"", 
    NAME:"", 
    GENDER:"", 
    AGE:"", 
    HEIGHT:"",
    KIDS:"", 
    FAMILY_PLANS:"", 
    DRINKING:"", 
    SMOKING:"", 
    MARIKUANA:"", 
    DRUGS:"",
    latitude: 0.123545,
    longitude:0.23165,  
    Token:"",
};

const datapost={
    "profile": [
      {
        "entryType": "GENDER",
        "privacy": "PUBLIC",
        "value": data.GENDER
      },
      {
        "entryType": "HEIGHT",
        "privacy": "PUBLIC",
        "value": data.HEIGHT
      },
      {
        "entryType": "DRINKING",
        "privacy": "PUBLIC",
        "value": data.DRINKING
      },
      {
        "entryType": "SMOKING",
        "privacy": "PUBLIC",
        "value": data.SMOKING
      },
      {
        "entryType": "EDUCATION_LEVEL",
        "privacy": "PUBLIC",
        "value": data.EDUCATION_LEVEL
      },
      {
        "entryType": "NAME",
        "privacy": "PUBLIC",
        "value": data.NAME
      } 
    ],
    "location": {
      "latitude": 0.123545,
      "longitude": 0.213454
    }
  }
export {data,datapost};