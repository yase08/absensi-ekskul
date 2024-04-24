import { useState, useEffect, useRef } from "react";
import useAxiosPrivate from "../../../../hooks/useAxiosPrivate";
import { SearchOutlined } from "@ant-design/icons";
import { BsPencil } from "react-icons/bs";
import { Table, Input, Space, Button, Modal, Select, DatePicker } from "antd";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import dayjs from "dayjs";

const TableAbsensi = () => {
  const { id } = useParams();
  const [searchText, setSearchText] = useState("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    category: "",
    date: "",
    student_id: "",
    ekskul_id: "",
  });
  const axiosPrivate = useAxiosPrivate();
  const [searchedColumn, setSearchedColumn] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const searchInput = useRef(null);
  const pageSizeOptions = [10, 20, 50];
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
  const [selectedDate, setSelectedDate] = useState(null);

  const ekskul = sessionStorage.getItem("ekskul_id") || "";

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
  ];

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
      const response = await axiosPrivate.get(
        `attendance/detail?ekskul_id=${ekskul}&student_id=${id}`
      );
      if (response && response.data.data) {
        if (Array.isArray(response.data.data)) {
          const attendanceData = response.data.data;
          setData(attendanceData);
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
      const response = await axiosPrivate.put(
        `/attendance/${formData.id}`,
        formData
      );
      const successMessage = response.statusMessage;
      handleGetRequest();
      setFormData({});

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
      render: (student) => (student ? student.name : "-"),
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
      render: (text) =>
        text ? Intl.DateTimeFormat("en-US").format(new Date(text)) : "-",
    },
    {
      title: "Aksi",
      dataIndex: "action",
      width: "20%",
      render: (_, record) => (
        <Space size={"middle"}>
          <a
            className="hover:text-blue-500"
            onClick={() => {
              setOpen(true);
              setFormData({
                id: record.id,
                student_id: record.student.id,
                category: record.category,
                date: record.date,
                ekskul_id: record.ekskul.id,
              });
            }}
          >
            <BsPencil size={20} />
          </a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    handleGetRequest();
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
            value={formData && formData.category}
            onChange={(e) => handleInputChange(e, "category")}
            options={categoryOption}
            placeholder="Pilih Kategory"
          />
          <label htmlFor="" className="text-lg">
            Tanggal
          </label>
          <DatePicker
            name="date"
            value={
              formData && formData.date ? dayjs(formData.date) : selectedDate
            }
            onChange={(selectedDate, dateString) => {
              setSelectedDate(selectedDate);
              handleInputChange(dateString, "date");
            }}
          />
        </form>
      </Modal>
    </div>
  );
};

export default TableAbsensi;
