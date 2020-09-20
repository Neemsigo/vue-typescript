<script>
export default {
  functional: true,
  name: 'RenderResolver',
  props: {
    value: {
      required: true,
    },
  },
  render(h, context) {
    console.log(this, 'this')
    return context.props.value(h);
  },
};
</script>

