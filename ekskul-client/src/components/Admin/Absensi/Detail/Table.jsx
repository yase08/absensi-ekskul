import { useState, useEffect, useRef } from "react";
// import { getAllAttendance } from "../../../services/attendance.service";
import { SearchOutlined } from "@ant-design/icons";
import { Table, Input, Space, Button, Modal, Select, DatePicker } from "antd";
import { getAllAttendanceDetail, updateAttendance } from "../../../../services/attendance.service";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const TableAbsensi = () => {
  const { id } = useParams();
  const [searchText, setSearchText] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    date: ""
  });
  const [searchedColumn, setSearchedColumn] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const searchInput = useRef(null);
  const pageSizeOptions = [10, 20, 50];
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
  const [selectedDate, setSelectedDate] = useState(null);

  const ekskul = localStorage.getItem("ekskul_id");

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

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleChangePageSize = (current, size) => {
    setCurrentPage(1);
    setPageSize(size);
  };

  const getPaginationConfig = () => ({
    current: currentPage,
    pageSize: pageSize,
    total: data.length,
    pageSizeOptions: pageSizeOptions,
    showSizeChanger: true,
    onChange: handleChangePage,
    onShowSizeChange: handleChangePageSize,
  });

  const categoryOption = [
    {
        label: "Hadir",
        value: "hadir",
    },
    {
        label: "Sakit",
        value: "sakit",
    },
    {
        label: "Izin",
        value: "izin",
    },
    {
        label: "Alfa",
        value: "alfa",
    },
  ]

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleInputChange = (e, inputName) => {
    const newValue = e.target ? e.target.value : e;
      setFormData((prevData) => ({
        ...prevData,
        [inputName]: newValue,
      }));
};

  const handleGetRequest = async () => {
    try {
      const response = await getAllAttendanceDetail(ekskul, id);

      if (response && response.data) {
        if (Array.isArray(response.data)) {
          const attendanceData = response.data;
          setData(attendanceData);
          console.log(attendanceData);
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

  const handleOk = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    try {
      const response = await updateAttendance(formData, ekskul, id);
      const successMessage = response.statusMessage;
  
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: successMessage,
      });
    } catch (error) {
      console.error("Error:", error);
  
      if (error.response) {
        const errorMessage = error.response.data.statusMessage;
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
      setConfirmLoading(false);
      setOpen(false);
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
      dataIndex: "student",
      sorter: handleSort("student"),
      sortDirections: ["descend", "ascend"],
      width: "20%",
      ...getColumnSearchProps("student"),
      render: (student) => (student ? student.name : "-")
    },
    {
      title: "Kategori",
      dataIndex: "category",
      sorter: handleSort("category"),
      sortDirections: ["descend", "ascend"],
      width: "20%",
      ...getColumnSearchProps("category"),
    },
    {
        title: "Tanggal",
        dataIndex: "date",
        sorter: handleSort("date"),
        sortDirections: ["descend", "ascend"],
        width: "20%",
        ...getColumnSearchProps("date"),
        render: (text) => (text ? Intl.DateTimeFormat("en-US").format(new Date(text)) : '-')
      },
    {
      title: "Aksi",
      dataIndex: "action",
      width: "20%",
      render: (_, record) => (
        <Space size={"middle"}>
          <button onClick={() => {
            setOpen(true);
            setFormData(record)
          }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-normal py-2 px-4 rounded"
          >
            Edit
          </button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
      handleGetRequest();
  }, []);

  if (loading) {
    return (
      <div className="p-3">
        <div className="relative bg-transparent flex gap-1 justify-center items-end">
          <p className="text-animation font-Gabarito text-xl">Loading</p>
          <section className="dots-container">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </section>
        </div>
      </div>
    );
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
      <div className="bg-transparent p-7 max-md:px-5 h-auto w-full">
        <div className="overflow-x-auto hidden-scroll w-full">
          <Table
            columns={columns}
            dataSource={data.slice(
              (currentPage - 1) * pageSize,
              currentPage * pageSize
            )}
            pagination={getPaginationConfig()}
            loading={loading}
            scroll={{ x: "max-content" }}
          />
        </div>
        <Modal
        title={"Edit Data"}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <form action="" className="flex flex-col p-5 gap-3">
          <label htmlFor="" className="text-lg">
            Kategori
          </label>
          <Select
            size="large"
            className="w-full"
            value={formData.category}
            onChange={(e) => handleInputChange(e, "category")}
            options={categoryOption}
            placeholder="Pilih Kategory"
          />
          <label htmlFor="" className="text-lg">
            Tanggal
          </label>
          <DatePicker
          name="date"
          value={selectedDate ? selectedDate : formData.date}
          onChange={(selectedDate, dateString) => {
            setSelectedDate(selectedDate);
            console.log(selectedDate);
            handleInputChange(dateString, "date");
          }}
          />
        </form>
      </Modal>
      </div>
  );
}

export default TableAbsensi