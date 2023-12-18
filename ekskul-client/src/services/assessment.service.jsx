

export const getAllAssessment = async () => {
  try {
    const response = await axiosPrivate.get(`/assessment`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const deleteAssessment = async (id) => {
  try {
    const response = await axiosPrivate.delete(`/assessment/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const updateAssessment = async (id) => {
  try {
    const response = await axiosPrivate.delete(`/assessment/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const createAssessment = async (requestData) => {
  try {
    const response = await axiosPrivate.post(`/assessment`, requestData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};
