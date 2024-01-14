import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const getAllAttendance = async (ekskul_id) => {
  try {
    const response = await axios.get(
<<<<<<< HEAD:ekskul-client/src/services/ekskul.service.ts
      `${API}/${VERSION}/ekskul?filter=${filter}&sort=${sort}&page[size]=${size}&page[number]=${number}`,
=======
      `${API}/${VERSION}/attendance?ekskul_id=${ekskul_id}`,
>>>>>>> c8887d90d85c53b76096291f72975cd45949f855:ekskul-client/src/services/attendance.service.jsx
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const getAllAttendanceDetail = async (ekskul_id, student_id) => {
  try {
    const response = await axios.get(
      `${API}/${VERSION}/attendance/detail?ekskul_id=${ekskul_id}&student_id=${student_id}`,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const updateAttendance = async (id) => {
  try {
    const response = await axiosPrivate.delete(`/attendance/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};

export const createAttendance = async (requestData, ekskul_id) => {
  try {
    const response = await axios.post(
      `${API}/${VERSION}/attendance?ekskul_id=${ekskul_id}`,
      requestData,
      config
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data.message;
    }
  }
};
