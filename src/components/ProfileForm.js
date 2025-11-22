import React, { useContext } from "react";
import { Form, Input, Button, Upload, message, Card } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { PatientContext } from "../context/PatientContext";

const ProfileForm = () => {
  const { profile, setProfile } = useContext(PatientContext);
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    setProfile(values);
    message.success("Profile updated successfully!");
  };

  return (
    <Card style={{ maxWidth: 600 }}>
      <Form
        form={form}
        layout="vertical"
        initialValues={profile}
        onFinish={handleSubmit}
      >
        {/* PROFILE PICTURE */}
        <Form.Item label="Profile Picture">
          <Upload
            beforeUpload={(file) => {
              const reader = new FileReader();
              reader.onload = () => {
                form.setFieldsValue({ profilePic: reader.result });
              };
              reader.readAsDataURL(file);
              return false;
            }}
          >
            <Button icon={<UploadOutlined />}>Upload Picture</Button>
          </Upload>

          {form.getFieldValue("profilePic") && (
            <img
              src={form.getFieldValue("profilePic")}
              alt="profile"
              style={{
                width: 100,
                marginTop: 10,
                borderRadius: "50%",
                border: "2px solid #eee",
              }}
            />
          )}
        </Form.Item>

        <Form.Item name="profilePic" hidden>
          <Input />
        </Form.Item>

        {/* FULL NAME */}
        <Form.Item
          label="Full Name"
          name="fullName"
          rules={[{ required: true, message: "Full name is required" }]}
        >
          <Input placeholder="Enter full name" />
        </Form.Item>

        {/* EMAIL */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Invalid email" },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        {/* AGE */}
        <Form.Item label="Age" name="age">
          <Input type="number" placeholder="Enter age" />
        </Form.Item>

        {/* HEIGHT */}
        <Form.Item label="Height (cm)" name="height">
          <Input type="number" placeholder="Enter height in cm" />
        </Form.Item>

        {/* WEIGHT */}
        <Form.Item label="Weight (kg)" name="weight">
          <Input type="number" placeholder="Enter weight in kg" />
        </Form.Item>

        {/* CONTACT */}
        <Form.Item label="Contact Number" name="contact">
          <Input placeholder="Enter contact number" />
        </Form.Item>

        {/* SUBMIT BUTTON */}
        <Button type="primary" htmlType="submit">
          Save Profile
        </Button>
      </Form>
    </Card>
  );
};

export default ProfileForm;
