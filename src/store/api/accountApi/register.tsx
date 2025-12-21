import { useState } from 'react'
import { AntDesignOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Space } from 'antd';
import { createStyles } from 'antd-style';

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
  const [show, setShow] = useState()
  const { styles } = useStyle();
  return (
    <div>
      <div className="flex items-center flex-col gap-[20px]">
      <input type="text" className='px-[20px] w-[350px] py-[10px] hover:border-violet-500 transition-all duration-300 outline-0 hover:scale-105 hover:text-violet-500 border-gray-400 border-[2px]' placeholder='userName' />
      <input type="number" className='px-[20px] w-[350px] py-[10px] hover:border-violet-500 transition-all duration-300 outline-0 hover:scale-105 hover:text-violet-500 border-gray-400 border-[2px]' placeholder='phoneNumber' />
      <input type="email" className='px-[20px] w-[350px] py-[10px] hover:border-violet-500 transition-all duration-300 outline-0 hover:scale-105 hover:text-violet-500 border-gray-400 border-[2px]' placeholder='email' />
      <div className="flex items-center gap-[20px] w-[350px] border-gray-400 hover:border-violet-500 transition-all duration-300 outline-0 hover:scale-105 hover:text-violet-500 border-[2px]">
      <input type={show ? "text" : "password"} className='px-[20px] py-[10px] outline-0' placeholder='password' />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600"
        >
        {show ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
  <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
</svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
</svg>}
      </button>
        </div>
        <ConfigProvider
      button={{
        className: styles.linearGradientButton,
      }}
    >
      <Space>
        <Button className='w-[350px]' type="primary" size="large" icon={<AntDesignOutlined />}>
          Regist's
        </Button>
        </Space>
    </ConfigProvider>
      </div>
    </div>
  )
}

export default Register