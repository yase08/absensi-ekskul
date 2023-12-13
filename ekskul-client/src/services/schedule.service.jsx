import useAxiosPrivate from "../hooks/useAxiosPrivate";

const axiosPrivate = useAxiosPrivate();

export const getAllSchedule = async () => {
  try {
    const response = await axiosPrivate.get(`/schedule`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const getSchedule = async () => {
  try {
    const response = await axiosPrivate.get(`/schedule/data`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const updateSchedule = async (id, requestData) => {
  try {
    const response = await axiosPrivate.put(`/schedule/${id}`, requestData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const getDay = async () => {
  try {
    const response = await axiosPrivate.get(`/schedule/day`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const deleteActivity = async (id) => {
  try {
    const response = await axiosPrivate.delete(`/schedule/activity/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const updateActivity = async (id) => {
  try {
    const response = await axiosPrivate.delete(`/schedule/activity/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const createSchedule = async (requestData) => {
  try {
    const response = await axiosPrivate.post(`/schedule`, requestData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const createActivity = async (requestData) => {
  try {
    const response = await axios.post(`/schedule/activity`, requestData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};
