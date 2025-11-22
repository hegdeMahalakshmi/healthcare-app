import React, { useContext, useState } from "react";
import { Form, Input, Button, Upload, Modal, Card, Typography, Divider, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { PatientContext } from "../../context/PatientContext";

const { Title, Text } = Typography;

const ProfileForm = () => {
  const { profile, setProfile } = useContext(PatientContext);
  const [form] = Form.useForm();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (values) => {
    setProfile(values);
    setShowSuccess(true); // Show modal
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 700,
          borderRadius: 15,
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          padding: 20,
        }}
      >
        {/* Header */}
        <Title level={3} style={{ textAlign: "center", marginBottom: 20 }}>
          Update Profile
        </Title>

        <Divider />

        {/* FORM */}
        <Form
          form={form}
          layout="vertical"
          initialValues={profile}
          onFinish={handleSubmit}
        >
          {/* Profile Pic + Basic Info */}
          <Row gutter={[20, 20]}>
            <Col xs={24} md={8} style={{ textAlign: "center" }}>
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
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>

                {form.getFieldValue("profilePic") && (
                  <img
                    src={form.getFieldValue("profilePic")}
                    alt="profile"
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      marginTop: 15,
                      border: "3px solid #e5e5e5",
                      objectFit: "cover",
                    }}
                  />
                )}
              </Form.Item>

              <Form.Item name="profilePic" hidden>
                <Input />
              </Form.Item>
            </Col>

            {/* Right side basic fields */}
            <Col xs={24} md={16}>
              <Form.Item
                label="Full Name"
                name="fullName"
                rules={[{ required: true, message: "Full name is required" }]}
              >
                <Input placeholder="Enter your full name" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Email is required" },
                  { type: "email", message: "Invalid email address" },
                ]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>
            </Col>
          </Row>

          <Divider />

          {/* Additional Fields */}
          <Row gutter={[20, 20]}>
            <Col xs={24} md={8}>
              <Form.Item label="Age" name="age">
                <Input type="number" placeholder="Age" />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item label="Height (cm)" name="height">
                <Input type="number" placeholder="Height in cm" />
              </Form.Item>
            </Col>

            <Col xs={24} md={8}>
              <Form.Item label="Weight (kg)" name="weight">
                <Input type="number" placeholder="Weight in kg" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[20, 20]}>
            <Col xs={24}>
              <Form.Item label="Contact Number" name="contact">
                <Input placeholder="Enter contact number" />
              </Form.Item>
            </Col>
          </Row>

          {/* Submit Button */}
          <div style={{ textAlign: "center", marginTop: 10 }}>
            <Button type="primary" size="large" htmlType="submit">
              Save Profile
            </Button>
          </div>
        </Form>
      </Card>

      {/* SUCCESS MODAL */}
      <Modal
        title="Profile Updated"
        open={showSuccess}
        centered
        onOk={() => setShowSuccess(false)}
        onCancel={() => setShowSuccess(false)}
      >
        <Text>Your profile has been updated successfully 🎉</Text>
      </Modal>
    </div>
  );
};

export default ProfileForm;
