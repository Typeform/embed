import { createFullpage } from "@typeform/embed/src";

export default {
  title: "Embed/Fullpage",
  argTypes: {
    typeformId: {
      name: "Typeform ID",
      control: "text",
      defaultValue: "moe6aa",
    },
  },
};

const Template = ({ typeformId }) => {
  createFullpage(typeformId);
  return "<div></div>";
};

export const Fullpage = Template.bind({});
