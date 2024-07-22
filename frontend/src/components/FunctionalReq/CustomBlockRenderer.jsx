const CustomBlockRenderer = (contentBlock) => {
    const type = contentBlock.getType();

    if (type === 'section') {
        return {
            component: SectionComponent,
            editable: true,
            props: {
                // Any custom props
            },
        };
    }

    return null;
};

const SectionComponent = (props) => {
    const { block, contentState } = props;
    const data = contentState.getBlockForKey(block.getKey()).getData();
    const id = data.get('id');
    const title = data.get('title');

    return (
        <h2 id={id}>
            <a href={`#${id}`}>{title}</a>
        </h2>
    );
};

export default CustomBlockRenderer;