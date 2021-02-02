import { createWidget } from "@typeform/embed/src";

export default {
  title: "Embed/Widget",
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
  createWidget(typeformUrl, { container });
  return container;
};

export const Widget = Template.bind({});
