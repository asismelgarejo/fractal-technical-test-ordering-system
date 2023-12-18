export const ShowLoader = (loading: boolean) => {
  const loader = document.getElementById("globalLoader");
  const body = document.getElementsByTagName("body");
  if (loader) loader.style.display = loading ? "flex" : "none";
  if (body) {
    body[0].style.overflow = loading ? "hidden" : "unset";
    body[0].style.width = loading ? "100vw" : "unset";
    body[0].style.height = loading ? "100vh" : "unset";
  }
};
