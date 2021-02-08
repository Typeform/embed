export default {
  title: "Embed/Window",
  argTypes: {
    typeformUrl: {
      name: "Typeform URL",
      control: "text",
      defaultValue: "https://form.typeform.com/to/moe6aa",
    },
  },
};

const Template = ({ typeformUrl }) => {
  return `
    <div id="wrapper"></div>
    <script src="/embed-next.js"></script>
    <script>
      window.tf.createWidget("${typeformUrl}", { container: document.querySelector("#wrapper")})
    </script>
  `;
};

export const Window = Template.bind({});
