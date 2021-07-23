export const pro_token = "pro_token" // token变量

export const ENV = process.env.NODE_ENV

export const apiUrl =
  ENV === `development` ? `http://rest.cata.show` : `http://rest.cata.show`
