import { useState } from "react";
import { AntDesignOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Space } from "antd";
import { createStyles } from "antd-style";
import { useRegisterStore } from "../../../store/store/store";

const useStyle = createStyles(({ prefixCls, css }) => ({
  linearGradientButton: css`
    &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
      > span {
        position: relative;
      }

      &::before {
        content: "";
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

const LogIn = () => {
  const [show, setShow] = useState(false);
  const { postAccaountLogin, loading } = useRegisterStore();
  const { styles } = useStyle();

  return (
    <div className="flex text-[#3f0f50] items-center flex-col gap-[20px]">
      <input
        type="text"
        className="px-[20px] w-[350px] py-[10px] border-gray-400 border-[2px] outline-0 hover:border-violet-500 hover:scale-105 transition-all"
        placeholder="userName"
      />

      <div className="relative flex items-center w-[350px] border-gray-400 border-[2px] hover:border-violet-500 transition-all">
        <input
          type={show ? "text" : "password"}
          className="px-[20px] py-[10px] w-full outline-0"
          placeholder="password"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600"
        >
          {show ? "🙈" : "👁️"}
        </button>
      </div>

      <ConfigProvider button={{ className: styles.linearGradientButton }}>
        <Space>
          <Button
            loading={loading}
            className="w-[350px]"
            type="primary"
            size="large"
            icon={<AntDesignOutlined />}
            onClick={() =>
              postAccaountLogin({
                userName: "test",
                password: "1234",
              })
            }
          >
            Log In
          </Button>
        </Space>
      </ConfigProvider>
    </div>
  );
};

export default LogIn;
