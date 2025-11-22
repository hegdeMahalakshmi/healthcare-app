// src/pages/Login.jsx
import { Card, Form, Input, Button, message } from "antd";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login, googleLogin, currentUser } = useAuth();
  const nav = useNavigate();

  const onFinish = async (values) => {
    try {
      await login(values.email, values.password);
      message.success("Logged in successfully!");
      // if (currentUser.role === "provider") {
      //   nav("/provider-dashboard");
      // }
      if (currentUser.role ==='provider') {
        nav("/provider-dashboard");
      } else {
        nav("/patient/dashboard");
      }
    } catch (err) {
      message.error('Invalid credentials');
    }
  };

  const handleGoogle = async () => {
    try {
      await googleLogin();
      message.success("Logged in with Google!");
      nav("/provider-dashboard");
    } catch (err) {
      message.error(err.message);
    }
  };

  return (
    <div className="center mt-10">
      <Card title="Login" style={{ width: 400 }}>
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

          <Form.Item>
            <Button type="primary" block htmlType="submit">
              Login
            </Button>
          </Form.Item>

          <Button block onClick={handleGoogle}>
            Continue with Google
          </Button>

          <div className="text-center mt-3">
            Register new user?{" "}
            <Link to="/signup" className="text-blue-600 underline">
              Register User
            </Link>
          </div>
        </Form>
      </Card>
    </div>
  );
}
