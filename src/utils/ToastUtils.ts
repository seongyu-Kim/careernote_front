import { toast } from 'react-toastify';

// 성공 알림 함수
export const SuccessToast = (message: string) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
  });
};

// 실패 알림 함수
export const ErrorToast = (message: string) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
  });
};

export const WarnToast = (message:string)=>{
  toast.warn(message, {
    position: 'top-right',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
  });
}