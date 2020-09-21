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
    return context.props.value(h);
  },
};
</script>

