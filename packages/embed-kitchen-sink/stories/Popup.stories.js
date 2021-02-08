import { createPopup } from "@typeform/embed/src";

export default {
  title: "Embed/Popup",
  argTypes: {
    typeformId: {
      name: "Typeform ID",
      control: "text",
      defaultValue: "moe6aa",
    },
  },
};

const Template = ({ typeformId }) => {
  const { open, close } = createPopup(typeformId, {});

  const button = document.createElement("button");
  button.innerText = "Toggle popup";
  button.onclick = () => {
    const isOpen = document.querySelectorAll(".typeform-popup").length > 0;
    isOpen ? close() : open();
  };

  return button;
};

export const Popup = Template.bind({});
