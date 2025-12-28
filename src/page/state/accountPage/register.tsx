import { useState } from "react";
import {
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Button, ConfigProvider, Space, message } from "antd";
import { createStyles } from "antd-style";
import { useRegisterStore } from "../../../store/store/store";
import { Link } from "react-router-dom";

const useStyle = createStyles(({ prefixCls, css }) => ({
  indigoButton: css`
    &.${prefixCls}-btn-primary {
      background: linear-gradient(135deg, #4f46e5, #7c3aed);
      border: none;
      height: 56px;
      font-size: 18px;
      font-weight: 600;
      border-radius: 12px;
      box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.3);

      &:hover {
        background: linear-gradient(135deg, #4338ca, #6d28d9);
        transform: translateY(-2px);
        box-shadow: 0 20px 25px -5px rgba(79, 70, 229, 0.4);
      }

      &:active {
        transform: translateY(0);
      }

      &:disabled {
        opacity: 0.7;
        transform: none;
      }
    }
  `,
}));

interface RegisterData {
  userName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const { postRegister, loading } = useRegisterStore();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { styles } = useStyle();

  const isValid =
    name && phone && email && password && confirmPassword && password === confirmPassword;

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }

    try {
      const registerData: RegisterData = {
        userName: name,
        phoneNumber: phone,
        email,
        password,
        confirmPassword,
      };
      await postRegister(registerData);
      message.success("Registration successful!");
    } catch (err: any) {
      message.error(err?.message || "Registration failed!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-violet-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-7xl w-full flex flex-col lg:flex-row">
        <div className="bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 text-white p-12 lg:p-20 flex flex-col justify-center lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4H0v2h34v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold mb-6">Create Your Account</h1>
          <p className="text-xl lg:text-2xl opacity-90 mb-12">
            Join thousands of users and unlock exclusive features today
          </p>

          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 max-w-md">
            <div className="flex items-start mb-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <UserOutlined className="text-2xl text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="font-semibold">
                  "Best platform I've used! The interface is intuitive and powerful."
                </p>
                <p className="text-sm opacity-80 mt-1">Michael K., Developer</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-yellow-300">★★★★★</span>
              <span className="ml-2 text-sm">4.9/5 based on over 5000 reviews</span>
            </div>
          </div>

          <ul className="mt-12 space-y-4">
            {[
              "Instant access to premium tools",
              "Secure and encrypted data",
              "Personalized dashboard",
              "24/7 dedicated support",
            ].map((item) => (
              <li key={item} className="flex items-center text-lg">
                <span className="mr-4 text-2xl">✓</span> {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-10 lg:p-20 flex flex-col justify-center lg:w-1/2 bg-white">
          <div className="max-w-lg mx-auto w-full">
            <h2 className="text-4xl font-bold text-gray-900 mb-2">Register Now</h2>
            <p className="text-gray-600 mb-10">Fill in your details to get started</p>

            <div className="space-y-6">
              <div className="relative">
                <UserOutlined className="absolute left-5 top-1/2 -translate-y-1/2 text-indigo-600 text-xl z-10" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-14 pr-5 py-5 rounded-xl border-2 border-gray-200 focus:border-indigo-600 focus:outline-none transition-all text-lg"
                  placeholder="Username *"
                />
              </div>

              <div className="relative">
                <PhoneOutlined className="absolute left-5 top-1/2 -translate-y-1/2 text-indigo-600 text-xl z-10" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-14 pr-5 py-5 rounded-xl border-2 border-gray-200 focus:border-indigo-600 focus:outline-none transition-all text-lg"
                  placeholder="Phone Number *"
                />
              </div>

              <div className="relative">
                <MailOutlined className="absolute left-5 top-1/2 -translate-y-1/2 text-indigo-600 text-xl z-10" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-5 py-5 rounded-xl border-2 border-gray-200 focus:border-indigo-600 focus:outline-none transition-all text-lg"
                  placeholder="Email Address *"
                />
              </div>

              <div className="relative">
                <LockOutlined className="absolute left-5 top-1/2 -translate-y-1/2 text-indigo-600 text-xl z-10" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-14 py-5 rounded-xl border-2 border-gray-200 focus:border-indigo-600 focus:outline-none transition-all text-lg"
                  placeholder="Password *"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 text-xl"
                >
                  {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </button>
              </div>

              <div className="relative">
                <LockOutlined className="absolute left-5 top-1/2 -translate-y-1/2 text-indigo-600 text-xl z-10" />
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-14 pr-14 py-5 rounded-xl border-2 border-gray-200 focus:border-indigo-600 focus:outline-none transition-all text-lg"
                  placeholder="Confirm Password *"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 text-xl"
                >
                  {showConfirm ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </button>
              </div>
            </div>

            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: "#4f46e5",
                    colorPrimaryHover: "#4338ca",
                  },
                },
              }}
            >
              <Space direction="vertical" className="w-full mt-10">
                <Button
                  loading={loading}
                  disabled={!isValid}
                  type="primary"
                  size="large"
                  block
                  style={{color: 'white'}}
                  onClick={handleRegister}
                  className={styles.indigoButton}
                >
                  Register
                </Button>
              </Space>
            </ConfigProvider>

            <p className="mt-10 text-center text-gray-600">
              Already have an account?{" "}
              <Link to={'/logIn'}>
              <a className="text-indigo-600 font-semibold hover:underline">
                Sign In
              </a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;