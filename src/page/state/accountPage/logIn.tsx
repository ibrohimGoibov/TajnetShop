import { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Space } from "antd";
import { createStyles } from "antd-style";
import { useRegisterStore } from "../../../store/store/store";
import { Link } from "react-router-dom";

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      background: linear-gradient(135deg, #8b00b3, #b300e0);
      border: none;
      height: 48px;
      font-weight: 600;

      &:hover {
        background: linear-gradient(135deg, #b300e0, #d633ff);
      }

      &:disabled {
        opacity: 0.6;
      }
    }
  `,
}));

const LogIn = () => {
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { postAccountLogin, loading } = useRegisterStore();
  const { styles } = useStyle();

  const handleLogin = () => {
    postAccountLogin({
      userName: userName,
      password,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row">
        <div className="bg-gradient-to-br from-[#8b00b3] to-[#b300e0] text-white p-12 md:p-16 flex flex-col justify-center items-start md:w-1/2">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">OSON</h1>
          <p className="text-xl md:text-2xl font-light">Welcome Back!</p>
          <p className="mt-6 text-lg opacity-90">
            Get access to a personalized experience and exclusive content created especially for you.
          </p>
        </div>

        <div className="p-10 md:p-16 flex flex-col justify-center md:w-1/2 bg-white">
          <div className="max-w-md mx-auto w-full">
            <div className="flex justify-center mb-8">
              <div className="bg-gradient-to-br from-[#8b00b3] to-[#b300e0] p-4 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="text-white bi bi-lock-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4m0 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"/>
</svg>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
              Sign In to EXCLUSIVE
            </h2>
            <p className="text-center text-gray-600 mb-10">
              Enter your credentials to access your account
            </p>

            <div className="relative mb-6">
              <UserOutlined className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg border-2 border-gray-300 focus:border-[#8b00b3] focus:outline-none transition-all duration-300 hover:border-[#a033c2]"
                placeholder="Username *"
              />
            </div>

            <div className="relative mb-6">
              <LockOutlined className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl" />
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-lg border-2 border-gray-300 focus:border-[#8b00b3] focus:outline-none transition-all duration-300 hover:border-[#a033c2]"
                placeholder="Password *"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 text-xl"
              >
                {show ? <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
  <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
</svg> : <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
</svg>}
              </button>
            </div>

            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: "#8b00b3",
                    colorPrimaryHover: "#b300e0",
                  },
                },
              }}
              button={{ className: styles.linearGradientButton }}
            >
              <Space direction="vertical" className="w-full">
                <Button
                  loading={loading}
                  disabled={!userName || !password}
                  type="primary"
                  size="large"
                  block
                  onClick={handleLogin}
                  className="h-12 text-lg font-semibold rounded-lg"
                >
                  Sign In
                </Button>
              </Space>
            </ConfigProvider>

            <div className="my-8 text-center text-gray-500">Or sign in with</div>

            <div className="flex justify-center gap-4">
              <button className="p-3 border border-gray-300 rounded-lg hover:border-[#8b00b3] transition">
                <span className="text-2xl text-gray-700"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
  <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"/>
</svg></span>
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:border-[#8b00b3] transition">
                <span className="text-2xl text-gray-700"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
</svg></span>
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:border-[#8b00b3] transition">
                <span className="text-2xl text-gray-700"><svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-telegram" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09"/>
</svg></span>
              </button>
            </div>

            <p className="mt-10 text-center text-gray-600">
              Don't have an account?{" "}
              <Link to={'/register'}>
              <a className="text-[#8b00b3] font-semibold hover:underline">
                Sign Up
              </a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;