
document.addEventListener("DOMContentLoaded", () => {
  const menuCheckbox = document.getElementById("checkbox");
  const sidebar = document.querySelector(".sidebar");

  menuCheckbox.addEventListener("change", () => {
      sidebar.classList.toggle("active");
  });
});
