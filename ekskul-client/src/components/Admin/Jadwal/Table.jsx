import { useState, useEffect, useRef } from "react";
import {
  deleteActivity,
  getAllActivity,
} from "../../../services/activity.service";
import Swal from "sweetalert2";
import { SearchOutlined } from "@ant-design/icons";
import { Table, Input, Space, Button } from "antd";

const TableJadwal = ({ setFormOld }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const searchInput = useRef(null);
  const pageSizeOptions = [10, 20, 50];
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);

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
    const valueA = String(a[dataIndex]).toLowerCase();
    const valueB = String(b[dataIndex]).toLowerCase();

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
      String(record[dataIndex]).toLowerCase().includes(value.toLowerCase()),
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

  const handleGetRequest = async () => {
    try {
      const response = await getAllActivity();

      if (response && response.data) {
        if (Array.isArray(response.data)) {
          const activityData = response.data;
          setData(activityData);
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

  const handleDeleteRequest = async (id) => {
    setLoading(true);

    try {
      const response = await deleteActivity(id);
      const successMessage = response.statusMessage;

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: successMessage,
      });

      handleGetRequest();
    } catch (error) {
      console.error("Error:", error);

      if (error.response) {
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
      title: "Hari",
      dataIndex: "schedule",
      sorter: handleSort("schedule"),
      sortDirections: ["descend", "ascend"],
      width: "20%",
      ...getColumnSearchProps("schedule"),
      render: (schedule) => schedule.day ? schedule.day : "-",
    },
    {
      title: "Ekstrakurikuler",
      dataIndex: "ekskul",
      sorter: handleSort("ekskul"),
      sortDirections: ["descend", "ascend"],
      width: "20%",
      ...getColumnSearchProps("ekskul"),
      render: (ekskul) => ekskul.name ? ekskul.name : "-",
    },
    {
      title: "Ruangan",
      dataIndex: "room",
      sorter: handleSort("room"),
      sortDirections: ["descend", "ascend"],
      width: "20%",
      ...getColumnSearchProps("room"),
      render: (room) => room.name ? room.name : "-",
    },
    {
      title: "Rombel",
      dataIndex: "rombel",
      sorter: handleSort("rombel"),
      sortDirections: ["descend", "ascend"],
      width: "20%",
      ...getColumnSearchProps("rombel"),
      render: (rombel) => rombel ? rombel.name : "-",
    },
    {
      title: "Jam Mulai",
      dataIndex: "startTime",
      sorter: handleSort("startTime"),
      sortDirections: ["descend", "ascend"],
      width: "20%",
      ...getColumnSearchProps("startTime"),
      render: (startTime) => startTime ? startTime : "-",
    },
    {
      title: "Jam Berakhir",
      dataIndex: "endTime",
      sorter: handleSort("endTime"),
      sortDirections: ["descend", "ascend"],
      width: "20%",
      ...getColumnSearchProps("endTime"),
      render: (endTime) => endTime ? endTime : "-",
    },
    {
      title: "Aksi",
      dataIndex: "action",
      width: "20%",
      render: (_, record) => (
        <Space size={"middle"}>
          <a
            className="bg-blue-500 hover:bg-blue-600 text-white font-normal py-2 px-4 rounded"
            onClick={() => setFormOld(record)}
          >
            Edit
          </a>
          <a
            className="bg-red-500 hover:bg-red-600 text-white font-normal py-2 px-4 rounded"
            onClick={() => handleDeleteRequest(record.id)}
          >
            Delete
          </a>
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
    </div>
  );
};

export default TableJadwal;
