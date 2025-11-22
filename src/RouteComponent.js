const RouteComponent = (props) => {
    const { component: Component, layout: Layout } = props;
    const getComponent = () => <Component />;

    return Layout ? <Layout>{getComponent()}</Layout> : getComponent();
};

export default RouteComponent;
