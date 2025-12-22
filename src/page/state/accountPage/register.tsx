import { useState } from "react";
import { AntDesignOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Space, message } from "antd";
import { createStyles } from "antd-style";
import { useRegisterStore } from "../../../store/store/store";

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: linear-gradient(135deg, #b008e9, #04befe);
        position: absolute;
        inset: -1px;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
        background: linear-gradient(135deg, #04befe, #b008e9);
      }
    }
  `,
}));

const Register = () => {
  const { postRegister, loading } = useRegisterStore();
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { styles } = useStyle();

  const handleRegister = async () => {
    try {
      await postRegister({
        userName: name,
        phoneNumber: phone,
        email,
        password,
        confirmPassword,
      });
      message.success("Регистрация прошла успешно!");
    } catch (err: any) {
      message.error(err?.message || "Ошибка регистрации");
    }
  };

  return (
    <div className="flex items-center flex-col gap-[20px]">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        className="px-[20px] w-[350px] py-[10px] border-gray-400 border-[2px] outline-0 hover:border-violet-500 hover:scale-105 hover:text-violet-500 transition-all duration-300"
        placeholder="userName"
      />
      <input
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        type="text"
        className="px-[20px] w-[350px] py-[10px] border-gray-400 border-[2px] outline-0 hover:border-violet-500 hover:scale-105 hover:text-violet-500 transition-all duration-300"
        placeholder="phoneNumber"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        className="px-[20px] w-[350px] py-[10px] border-gray-400 border-[2px] outline-0 hover:border-violet-500 hover:scale-105 hover:text-violet-500 transition-all duration-300"
        placeholder="email"
      />

      {/* Password */}
      <div className="relative flex items-center w-[350px] border-[2px] border-gray-400 hover:border-violet-500 transition-all duration-300">
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={show ? "text" : "password"}
          className="px-[20px] py-[10px] w-full outline-0"
          placeholder="password"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600"
        >
          {show ? "🙈" : "👁️"}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="relative flex items-center w-[350px] border-[2px] border-gray-400 hover:border-violet-500 transition-all duration-300">
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type={show ? "text" : "password"}
          className="px-[20px] py-[10px] w-full outline-0"
          placeholder="Confirm Password"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600"
        >
          {show ? "🙈" : "👁️"}
        </button>
      </div>

      <ConfigProvider button={{ className: styles.linearGradientButton }}>
        <Space>
          <Button
            onClick={handleRegister}
            className="w-[350px]"
            type="primary"
            size="large"
            icon={<AntDesignOutlined />}
            loading={loading}
          >
            Regist's
          </Button>
        </Space>
      </ConfigProvider>
    </div>
  );
};

export default Register;
