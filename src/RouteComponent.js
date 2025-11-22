import React from "react";

const RouteComponent = ({ component: Component, layout: Layout }) => {

  // If layout is provided, wrap component with layout
  if (Layout) {
    return (
      <Layout>
        <Component />
      </Layout>
    );
  }

  // Otherwise return just the component
  return <Component />;
};

export default RouteComponent;
