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
  const { open, close } = createPopup(typeformUrl, {});

  const button = document.createElement("button");
  button.innerText = "Toggle popup";
  button.onclick = () => {
    const isOpen = document.querySelectorAll(".typeform-popup").length > 0;
    isOpen ? close() : open();
  };

  return button;
};

export const Popup = Template.bind({});
