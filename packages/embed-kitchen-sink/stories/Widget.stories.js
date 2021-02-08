import { createWidget } from "@typeform/embed/src";

export default {
  title: "Embed/Widget",
  argTypes: {
    typeformId: {
      name: "Typeform URL",
      control: "text",
      defaultValue: "moe6aa",
    },
  },
};

const Template = ({ typeformId }) => {
  const container = document.createElement("div");
  createWidget(typeformId, { container });
  return container;
};

export const Widget = Template.bind({});
