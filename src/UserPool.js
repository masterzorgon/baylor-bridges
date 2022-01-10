import {CognitoUserPool} from "amazon-cognito-identity-js"

const poolData={
    UserPoolId:"us-east-2_O1ku8d52G",
    ClientId:"7o86gkq6a707l4qm79ef1sq4h8"
}

export default new CognitoUserPool(poolData);