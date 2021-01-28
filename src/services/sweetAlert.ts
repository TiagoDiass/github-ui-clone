import sweetAlert from 'sweetalert2';

const swal = sweetAlert;
const Toast = swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: toast => {
    toast.addEventListener('mouseenter', swal.stopTimer);
    toast.addEventListener('mouseleave', swal.resumeTimer);
  },
});

export default swal;
export { Toast };
