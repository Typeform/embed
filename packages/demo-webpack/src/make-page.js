export const makePage = (wrapper, title, text, moreContent) => {
  const h1 = document.createElement("h1");
  h1.innerHTML = title;
  wrapper.append(h1);

  const p = document.createElement("p");
  p.innerHTML = text;
  wrapper.append(p);

  console.log("moreContent", moreContent);

  wrapper.append(moreContent);
};
