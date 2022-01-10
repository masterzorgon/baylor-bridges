import {CognitoUserPool} from "amazon-cognito-identity-js"

const poolData={
    UserPoolId:"us-east-2_phN1rHU8I",
    ClientId:"5oventbh8mh2noja8sc4la2q1g"
}

export default new CognitoUserPool(poolData);