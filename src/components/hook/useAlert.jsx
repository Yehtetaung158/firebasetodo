import Swal from "sweetalert2";

const useAlert = () => {
  const alertfun = (fun) => {
    Swal.fire({
      // title: "Are you sure?",
      text: "Are you sure to delete!",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4a3ac5",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fun();
      }
    });
  };

  return alertfun;
};

export default useAlert;
