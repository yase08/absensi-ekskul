// Berfungsi untuk menangani response api

export interface APIResponse {
  statusCode: number;
  statusMessage: string;
  data?: any;
  option?: any;
}

export const apiResponse = (
  code: number,
  message: string,
  data?: any,
  option?: any
) => {
  if ((data as any) === null) {
    return {
      statusCode: code,
      statusMessage: message,
    };
  } else {
    return {
      statusCode: code,
      statusMessage: message,
      data: data,
      option: option,
    };
  }
};
