


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
    id:"7a85852b-f136-499e-843a-bd727ead06c7",
    Token:"eyJraWQiOiIzV1gxZXpNS251RTBvZVY4cFcyVnJPaGN4clYrdlNYMkNuNStlSjZFaGRZPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI1ZmFlNzE2MS1lZDViLTQ2YmEtYTI4MC00ZGMzODg5NDcyNjciLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX1VRSUZNS1gzZSIsInBob25lX251bWJlcl92ZXJpZmllZCI6dHJ1ZSwiY29nbml0bzp1c2VybmFtZSI6IjVmYWU3MTYxLWVkNWItNDZiYS1hMjgwLTRkYzM4ODk0NzI2NyIsImF1ZCI6IjRybmliZzhqajhyZ2ZzZ2R2Yzk5aGYxMGJpIiwiZXZlbnRfaWQiOiIyMzg4MTRhZi0xNzcyLTQyMzYtYjJkYS02NjJmMTU3ZGY5MTkiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTU2OTUzODc4NywibmFtZSI6IkhhbnphbGEiLCJwaG9uZV9udW1iZXIiOiIrOTIzMDEyMjk0NjYwIiwiZXhwIjoxNTY5NTQyMzg3LCJpYXQiOjE1Njk1Mzg3ODcsImVtYWlsIjoiSGFuemFsYUBnbWFpbC5jb20ifQ.JjMYhL02sX_kN5SUy-nAbjtKx1q5n9XxL1qFHppmw2ZCL7RbqmpJX5iN-r-6l4hvX5AM5oqVQg0Vtr_rWe0OZdjW86qCDHB05NCBDGrlDlI51WPRBFVMvAMFDeUXCESggzoV07jZDjbnybnSNJJVcDBte6slqD13dZkPYe9T3h-3zyCBedm7dYbkIlH4CoERYDgOyZDgb7_CCZndi_rBhDuHUE417AHbxHAoFmGJ2QFdTgjgp-iWsm4Dz5oRL24E5MQWn8wGedTF2oS_NL_vxeis7tXpE_gPOiaCKdHFH-FvsSrx3qTXFUXhez2WPI5yOM4UArSvdEBWw2s_H_i-iA",
    RefreshToken:"",
    username:""
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
        "entryType": "WORK",
        "privacy": "PUBLIC",
        "value": data.WORK
      },
      {
        "entryType": "JOB_TITLE",
        "privacy": "PUBLIC",
        "value": data.JOB_TITLE
      },
      {
        "entryType": "NAME",
        "privacy": "PUBLIC",
        "value": data.NAME
      },
    ],
    "location": {
      "latitude":data.longitude,
      "longitude": data.longitude
    }
  }
export {data,datapost};