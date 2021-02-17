export const makeNavigation = (name, page) => {
  const content = document.querySelector("#content");
  const open = () => {
    content.innerHTML = "";
    content.append(page);
  };

  const link = document.createElement("a");
  link.innerHTML = name;
  link.href = `#${name}`;
  link.onclick = open;

  if (window.location.hash === `#${name}`) {
    open();
  }

  return link;
};
