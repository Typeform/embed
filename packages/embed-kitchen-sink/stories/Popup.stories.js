import { createPopup } from "@typeform/embed/src";

export default {
  title: "Embed/Popup",
  argTypes: {
    typeformUrl: {
      name: "Typeform URL",
      control: "text",
      defaultValue: "https://form.typeform.com/to/moe6aa",
    },
  },
};

const Template = ({ typeformUrl }) => {
  const container = document.createElement("div");

  const { open, close } = createPopup(typeformUrl, { container });

  const button = document.createElement("button");
  button.innerText = "Toggle popup";
  button.onclick = () => {
    const isOpen = document.querySelectorAll(".typeform-popup-opened").length > 0;
    isOpen ? close() : open();
  };

  const style = document.createElement("style");
  style.innerHTML = "button {padding: 20px} .typeform-popup {display: none} .typeform-popup-opened {display: block}";

  const wrapper = document.createElement("div");
  wrapper.append(style);
  wrapper.append(button);
  wrapper.append(container);

  return wrapper;
};

export const Popup = Template.bind({});
