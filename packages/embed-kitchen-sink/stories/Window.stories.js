export default {
  title: "Embed/Window",
  argTypes: {
    typeformId: {
      name: "Typeform ID",
      control: "text",
      defaultValue: "moe6aa",
    },
  },
};

const Template = ({ typeformId }) => {
  return `
    <div id="wrapper"></div>
    <script src="/embed-next.js"></script>
    <script>
      window.tf.createWidget("${typeformId}", { container: document.querySelector("#wrapper")})
    </script>
  `;
};

export const Window = Template.bind({});
