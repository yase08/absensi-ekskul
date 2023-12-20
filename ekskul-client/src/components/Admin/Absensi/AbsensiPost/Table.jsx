import { useState, useEffect, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Table, Input, Space, Button, Checkbox } from "antd";
import Swal from "sweetalert2";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";

const TableAbsensiPost = ({ date }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const searchInput = useRef(null);
  const pageSizeOptions = [10, 20, 50];
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
  const [formData, setformData] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const ekskul = localStorage.getItem("ekskul_id");

  // Handler untuk checkbox
  const handleCheckboxChange = (studentId, category) => {
    const newAttendance = {
      date: date,
      student_id: studentId,
      category: category,
    };
    const updatedformData = formData.filter(
      (attendance) => attendance.student_id !== studentId
    );
    setformData([...updatedformData, newAttendance]);
    console.log(formData);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handleSort = (dataIndex) => (a, b) => {
    const valueA = a[dataIndex].toLowerCase();
    const valueB = b[dataIndex].toLowerCase();

    return valueA.localeCompare(valueB);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) => (searchedColumn === dataIndex ? <div>{text}</div> : text),
  });

  const handleGetStudentRequest = async () => {
    try {
      const response = await axiosPrivate.get(
        `/student/ekskul?ekskul_id=${ekskul}`
      );

      if (response && response.data.data) {
        if (Array.isArray(response.data.data)) {
          const studentData = response.data.data;
          setData(studentData);
          console.log(studentData);
        } else {
          setError(new Error("Data is not an array"));
        }
      } else {
        setError(new Error("Data retrieval failed"));
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePostRequest = async () => {
    setLoading(true);

    try {
      const response = await axiosPrivate.post(
        `/attendance?ekskul_id=${ekskul}`,
        formData
      );
      const successMessage = response.data.statusMessage;

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: successMessage,
      });
    } catch (error) {
      if (error) {
        const errorMessage = error.response.statusMessage;
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: errorMessage,
        });
      } else if (error.request) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "No response received from the server.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "An unexpected error occurred.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      render: (text, record, index) => index + 1,
      width: "10%",
    },
    {
      title: "Nama",
      dataIndex: "name",
      sorter: handleSort("name"),
      sortDirections: ["descend", "ascend"],
      width: "20%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Kategori",
      dataIndex: "category",
      children: [
        {
          title: "Hadir",
          width: 150,
          render: (_, record) => (
            <Space size={"middle"}>
              <Checkbox
                checked={formData.some(
                  (attendance) =>
                    attendance.student_id === record.id &&
                    attendance.category === "hadir"
                )}
                onChange={() => handleCheckboxChange(record.id, "hadir")}
              />
            </Space>
          ),
        },
        {
          title: "Sakit",
          width: 150,
          render: (_, record) => (
            <Space size={"middle"}>
              <Checkbox
                checked={formData.some(
                  (attendance) =>
                    attendance.student_id === record.id &&
                    attendance.category === "sakit"
                )}
                onChange={() => handleCheckboxChange(record.id, "sakit")}
              />
            </Space>
          ),
        },
        {
          title: "Izin",
          width: 150,
          render: (_, record) => (
            <Space size={"middle"}>
              <Checkbox
                checked={formData.some(
                  (attendance) =>
                    attendance.student_id === record.id &&
                    attendance.category === "izin"
                )}
                onChange={() => handleCheckboxChange(record.id, "izin")}
              />
            </Space>
          ),
        },
        {
          title: "Alfa",
          width: 150,
          render: (_, record) => (
            <Space size={"middle"}>
              <Checkbox
                checked={formData.some(
                  (attendance) =>
                    attendance.student_id === record.id &&
                    attendance.category === "alfa"
                )}
                onChange={() => handleCheckboxChange(record.id, "alfa")}
              />
            </Space>
          ),
        },
      ],
    },
  ];

  useEffect(() => {
    handleGetStudentRequest();
  }, []);

  return (
    <div className="bg-transparent p-7 max-md:px-5 h-auto w-full">
      <div className="overflow-x-auto hidden-scroll w-full">
        <Table
          columns={columns}
          dataSource={data.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )}
          pagination={false}
          loading={loading}
          scroll={{ x: "max-content" }}
        />
        <div className="flex justify-end">
          <button
            onClick={handlePostRequest}
            className="my-5 bg-blue-500 hover:bg-blue-600 text-white font-normal py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableAbsensiPost;
