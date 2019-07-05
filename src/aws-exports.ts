// export default {
//     APIKEY: 'amazonaws.com/split-dev-two',
//     REGION: 'us-east-1',
//     TYPE: 'execute-api',
//     ENDPOINT: 'iff00umlx0',
// };;

const config={
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: 'us-east-1:7a695e31-3d99-40bb-b430-84d9936cc3f6',
    
    // REQUIRED - Amazon Cognito Region
    region: 'US_EAST_1',

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
    // Required only if it's different from Amazon Cognito Region
    identityPoolRegion: 'US_EAST_1',

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'us-east-1_UQIFMKX3e',

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: '4rnibg8jj8rgfsgdvc99hf10bi',

    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    // authenticationFlowType: ':A52.8-k8mepnEC'

    // userPoolWebclientSecret: '1av2l07r7evnqloo5vhhj98vtpdvfoi5bhj0fr6lc4cbbf25f2fd',

}
export default config




//https://event-dating-dev-1-beta.auth.us-east-1.amazoncognito.com

