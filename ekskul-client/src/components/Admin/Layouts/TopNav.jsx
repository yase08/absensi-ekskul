import { GiHamburgerMenu } from "react-icons/gi";
import { BsKeyboard } from "react-icons/bs";
import { MdColorLens } from "react-icons/md";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import useAuth from "../../../hooks/useAuth";
import { UserOutlined, EditOutlined } from "@ant-design/icons";
import { jwtDecode } from "jwt-decode";
import { Modal, Button, Input, Form } from "antd";

// eslint-disable-next-line react/prop-types
const TopNav = ({
  toggleExpansion,
  expanded,
  toggleChangeNavbar,
  toggleOpenChangeBg,
}) => {
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false);
  const [profile, setProfile] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [isButtonVisible1, setIsButtonVisible1] = useState(false);
  const [isButtonVisible2, setIsButtonVisible2] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const [backgroundColor, setBackgroundColor] = useState("bg-primary");
  const { setAuth, setPersist, auth, persist } = useAuth();
  const { id } = jwtDecode(auth.accessToken);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate()

  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
  };

  const handleEdittClick = () => {
    // Pemanggilan fungsi click pada elemen input file
    fileInputRef.current.click();
  };

  const handleFetch = async () => {
    try {
      const response = await axiosPrivate.get(`/auth/profile/${id}`);
      setProfile(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = () => {
    setIsEditMode(!isEditMode);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const savedColor = localStorage.getItem("backgroundColor");
    if (savedColor) {
      setBackgroundColor(savedColor);
    } else {
      setBackgroundColor("#6777EF");
    }
  }, []);

  const handleLogout = async (event) => {
    event.preventDefault();
    setAuth({});

    try {
      const response = await axiosPrivate.get(`/auth/logout`);
      const successMessage = response.data.statusMessage;

      Swal.fire({
        icon: "success",
        title: "Sukses!",
        text: successMessage,
      });
      setPersist(false);
      localStorage.setItem("persist", JSON.stringify(false));
      navigate("/login", { replace: true });
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
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const truncateName = (name, maxLength = 10) => {
    if (name.length <= maxLength) {
      return name;
    } else {
      return name.substring(0, maxLength) + "...";
    }
  };

  const handleOpenForm = (event) => {
    if (event.ctrlKey && event.shiftKey && event.key === ">") {
      setIsButtonVisible(true);
    }

    if (event.ctrlKey && event.shiftKey && event.key === "<") {
      setIsButtonVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleOpenForm);

    return () => {
      document.removeEventListener("keydown", handleOpenForm);
    };
  }, []);

  useEffect(() => {
    handleFetch();
  }, []);

  const handleSecretKeywordInputChange = (event) => {
    const inputKeyword = event.target.value.toLowerCase();
    if (inputKeyword === "perpindahan") {
      setIsButtonVisible1(true);
      setIsButtonVisible(false);
    }
    if (inputKeyword === "hapus perpindahan") {
      setIsButtonVisible1(false);
      setIsButtonVisible(false);
    }
    if (inputKeyword === "ganti bg") {
      setIsButtonVisible2(true);
      setIsButtonVisible(false);
    }
    if (inputKeyword === "hapus bg") {
      setIsButtonVisible2(false);
      setIsButtonVisible(false);
    }
    if (inputKeyword === "hapus semua") {
      setIsButtonVisible1(false);
      setIsButtonVisible2(false);
      setIsButtonVisible(false);
    }
  };

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("mobileNumber", values.mobileNumber);
      formData.append("email", values.email);
      formData.append("password", values.password);
      if (values.image) {
        formData.append("image", values.image[0].originFileObj);
      }
      const response = await axiosPrivate.put(`/user/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      form.resetFields();
    } catch (error) {
      console.error("Error creating comic:", error);
    }
  };

  return (
    <div className="w-full">
      <nav
        className={`h-[115px] px-[29px] py-[29px] flex justify-between items-start z-40`}
        style={{ backgroundColor: backgroundColor }}
      >
        <div>
          <button
            onClick={toggleExpansion}
            className={`${expanded ? "max-lg:hidden" : ""}`}
          >
            <GiHamburgerMenu className="text-white text-xl" />
          </button>
        </div>
        <div className="flex gap-[15px] items-center ">
          {isButtonVisible && (
            <div>
              {/* Form untuk memasukkan kata kunci */}
              <input
                type="text"
                placeholder="Masukkan kata kunci"
                onChange={handleSecretKeywordInputChange}
                className="outline-none rounded-md px-2"
              />
            </div>
          )}
          {isButtonVisible1 && (
            <button onClick={toggleChangeNavbar}>
              <BsKeyboard className="text-white text-xl font-bold" />
            </button>
          )}
          {isButtonVisible2 && (
            <button onClick={toggleOpenChangeBg}>
              <MdColorLens className="text-white text-xl font-bold" />
            </button>
          )}
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                onClick={toggleDropdown}
                className="flex gap-3 items-center text-white text-sm focus:outline-none"
              >
                <div className="w-[30px] h-[30px]">{/* <AdminPicture/> */}</div>
                <p className="text-white text-sm capitalize">
                  {truncateName(`Hi, ${profile.name}`)}
                </p>
              </button>
            </div>

            {isOpen && (
              <div className="z-50 origin-top-right absolute right-0 px-5 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div
                  className="py-1 flex flex-col gap-y-4"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <button
                    onClick={showModal}
                    className="flex items-center gap-2 hover:text-blue-500 pt-3"
                  >
                    <CgProfile />
                    <p>Profile</p>
                  </button>
                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-500 my-5 hover:text-blue-500 before:w-full before:h-[0.08px] before:opacity-20 before:bg-black before:absolute before:bottom-[65px] before:right-0"
                  >
                    <CgLogOut />
                    <p>Logout</p>
                  </button>
                </div>
              </div>
            )}
            <Modal
              title="Profile"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <div className="w-full flex flex-col justify-start gap-2 text-base">
                <div className="self-center mb-4 relative">
                  {profile.image === null ? (
                    <UserOutlined
                      style={{
                        fontSize: "50px",
                        border: "1px solid black",
                        borderRadius: "50%",
                        padding: "12px 12px",
                      }}
                    />
                  ) : (
                    <img
                      className="rounded-full w-12 h-12 object-cover"
                      src={`http://localhost:8000/images/${profile.image}`}
                      alt={"Profile Picture"}
                    />
                  )}
                  {isEditMode ? (
                    <>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        style={{ display: "none" }}
                      />
                      <EditOutlined
                        className="absolute bottom-0 text-xl hover:text-blue-500 cursor-pointer"
                        onClick={handleEdittClick}
                      />
                    </>
                  ) : null}
                </div>
                {isEditMode ? (
                  <>
                    <Form
                      name="basic"
                      labelCol={{
                        span: 8,
                      }}
                      wrapperCol={{
                        span: 16,
                      }}
                      style={{
                        maxWidth: 600,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                      }}
                      initialValues={{
                        remember: true,
                      }}
                      onFinish={onFinish}
                      autoComplete="off"
                    >
                      <Form.Item
                        label="Name"
                        name="name"
                        initialValue={profile.name}
                        rules={[
                          {
                            required: true,
                            message: "Masukan nama!",
                          },
                        ]}
                      >
                        <Input addonBefore="Nama" />
                      </Form.Item>
                      <Form.Item
                        label="Nomer Telpon"
                        name="mobileNumber"
                        initialValue={profile.mobileNumber}
                        rules={[
                          {
                            required: true,
                            message: "Masukan Nomer Telpon!",
                          },
                        ]}
                      >
                        <Input addonBefore="Nomer Telpon" />
                      </Form.Item>
                      <Form.Item
                        label="Email"
                        name="email"
                        initialValue={profile.email}
                        rules={[
                          {
                            required: true,
                            message: "Masukan email!",
                          },
                        ]}
                      >
                        <Input addonBefore="Email" />
                      </Form.Item>
                      <Form.Item
                        label="Password"
                        name="password"
                      >
                        <Input addonBefore="Password" type="password" />
                      </Form.Item>
                      <Button htmlType="submit">Submit</Button>
                    </Form>
                  </>
                ) : (
                  <>
                    <p>
                      <span className="font-semibold">Nama: </span>
                      {profile.name}
                    </p>
                    <p>
                      <span className="font-semibold">Nomer Telpon: </span>
                      {profile.mobileNumber}
                    </p>
                    <p>
                      <span className="font-semibold">Email: </span>
                      {profile.email}
                    </p>
                    <p>
                      <span className="font-semibold">Role: </span>
                      {profile.role}
                    </p>
                    <p>
                      <span className="font-semibold">Ekstrakurikuler: </span>
                      {profile.ekskul?.map((ekskul) => ekskul.name + " ")}
                    </p>
                  </>
                )}
                <Button onClick={handleEditClick}>Edit</Button>
              </div>
            </Modal>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default TopNav;
