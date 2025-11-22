// src/pages/Signup.jsx
import { Card, Form, Input, Button, message,Radio } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Signup() {
  const { signup, googleLogin } = useAuth();
  const nav = useNavigate();

  const onFinish = async (values) => {
    try {
      await signup(values.email, values.password, values.role);
      message.success("User registered successfully!");
      nav("/login");
    } catch (err) {
      message.error('Not able to signup');
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      message.success("Logged in with Google!");
      nav("/login");
    } catch (err) {
      message.error('Not able to signup');
    }
  };

  return (
    <div className="center mt-10">
      <div className="slide-right">
        <Card title="Create Account" style={{ width: 400 }}>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

           

             {/* 🔥 Radio button group for role selection */}
          <Form.Item
            name="role"
            label="Register As"
            rules={[{ required: true, message: "Please select a role" }]}
          >
            <Radio.Group>
              <Radio value="patient">Patient</Radio>
              <Radio value="provider">Provider</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign Up
            </Button>
          </Form.Item>


            <Button block onClick={handleGoogle}>
              Continue with Google
            </Button>

            <div className="text-center mt-3">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}
