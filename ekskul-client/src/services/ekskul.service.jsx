import useAxiosPrivate from "../hooks/useAxiosPrivate";

const axiosPrivate = useAxiosPrivate();

export const getAllEkskul = async () => {
  try {
    const response = await axiosPrivate.get(`/ekskul`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const deleteEkskul = async (id) => {
  try {
    const response = await axiosPrivate.delete(`/ekskul/${id}`, config);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const updateEkskul = async (id, requestData) => {
  try {
    const response = await axiosPrivate.put(`/ekskul/${id}`, requestData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const createEkskul = async (requestData) => {
  try {
    const response = await axiosPrivate.post(`/ekskul`, requestData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};
