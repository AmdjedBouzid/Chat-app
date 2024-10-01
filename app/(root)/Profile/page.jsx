"use client";
import React, { useState } from "react";
import styles from "./_components/Profile.module.css";
import { useForm } from "react-hook-form";
import { CircleX, Settings, BadgeX, ShieldAlert, LogOut } from "lucide-react";
import { CldUploadButton } from "next-cloudinary";
import Twobuttons from "./_components/Twobuttons";
import { UseGlobalState } from "../../Context/GlobalContext";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function Page() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const { user, setUser } = UseGlobalState();
  const router = useRouter();
  const [name, setName] = useState("");
  const [setting, setSetting] = useState(false);
  const [img, setImg] = useState("");

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const onUpload = (result) => {
    if (result) {
      setImg(result?.info?.secure_url);
      setValue("profileImage", result?.info?.secure_url);
    }
  };

  const onSubmit = async () => {
    if (!name || !img) {
      alert("Both username and image are required!");
      return;
    }

    const formData = {
      username: name,
      profileimg: img,
    };

    try {
      const response = await axios.put(
        "http://localhost:3000/api/users/update",
        formData
      );

      console.log("Update successful:", response);
      if (response.status === 200) {
        setImg("");
        setName("");
        setUser(response.data.updatedUser);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  const Hundellogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/logout"
      );
      console.log(response);
      if (response.status === 200) {
        toast.success(response?.data?.message);
        router.push("/Login");
      }
    } catch (error) {}
  };
  return (
    <div className={styles.parent}>
      <div className={styles.fitstChildleft}>
        <Settings
          size={48}
          className={styles.icon}
          onClick={() => setSetting(!setting)}
        />
        {setting ? (
          <div className={styles.setting}>
            <BadgeX
              size={48}
              className={styles.returnsetting}
              onClick={() => setSetting(!setting)}
            />
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.inputname}>
                <input
                  {...register("username", {
                    required: "User name is required",
                    validate: (value) => {
                      if (value.length < 3) {
                        return "User name must be at least 3 characters long";
                      } else if (!/[!£$%^&)(_+}{?><]/.test(value)) {
                        return "User name must contain at least one special character";
                      }
                    },
                  })}
                  type="text"
                  placeholder="Username"
                  value={name}
                  onChange={handleChangeName}
                />
                {errors.username && (
                  <p className={styles.error}>{errors.username.message}</p>
                )}
                <CircleX onClick={() => setName("")} />
              </div>
              <div className={styles.uplowdphoto}>
                <CldUploadButton uploadPreset="olystsuw" onSuccess={onUpload}>
                  <h1>Upload Photo</h1>
                </CldUploadButton>
                {errors.profileImage && (
                  <p className={styles.error}>Image is required!</p>
                )}
                <img
                  src={watch("profileImage") || "/assets/person.jpg"}
                  alt="user profile"
                />
              </div>
              <Button
                size="lg"
                style={{
                  backgroundColor: "#7a55fe",
                }}
                endContent={<ShieldAlert />}
                type="submit"
                onClick={onSubmit}
              >
                Save Changes
              </Button>
              <Button
                size="lg"
                color="danger"
                variant="bordered"
                startContent={<LogOut />}
                onClick={Hundellogout}
              >
                Log Out
              </Button>
            </form>
          </div>
        ) : null}
        <div>
          <img src={user?.profileimg || "/assets/person.jpg"} alt="user" />
        </div>
        <div className={styles.infouser}>
          <h2>{user?.username || "user"}</h2>
        </div>
      </div>

      <div className={styles.fitstChildrihht}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputname}>
            <input
              {...register("username", {
                required: "User name is required",
                validate: (value) => {
                  if (value.length < 3) {
                    return "User name must be at least 3 characters long";
                  } else if (!/[!£$%^&)(_+}{?><]/.test(value)) {
                    return "User name must contain at least one special character";
                  }
                },
              })}
              type="text"
              placeholder="Username"
              value={name}
              onChange={handleChangeName}
            />
            {errors.username && (
              <p className={styles.error}>{errors.username.message}</p>
            )}
            <CircleX onClick={() => setName("")} />
          </div>
          <div className={styles.uplowdphoto}>
            <CldUploadButton uploadPreset="olystsuw" onSuccess={onUpload}>
              <h1>Upload Photo</h1>
            </CldUploadButton>
            {errors.profileImage && (
              <p className={styles.error}>Image is required!</p>
            )}
            <img
              src={watch("profileImage") || "/assets/person.jpg"}
              alt="user profile"
            />
          </div>
          <div className="flex gap-14 items-center">
            <Button
              size="lg"
              style={{
                backgroundColor: "#7a55fe",
              }}
              endContent={<ShieldAlert />}
              type="submit"
              onClick={onSubmit}
            >
              Save Changes
            </Button>
            <Button
              size="lg"
              color="danger"
              variant="bordered"
              startContent={<LogOut />}
              onClick={Hundellogout}
            >
              Log Out
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
