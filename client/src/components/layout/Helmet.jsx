import React from "react";
import { Helmet } from "react-helmet";

const HelmetContainer = ({ title, description, keywords }) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="viewport" content="width=device" />
        <meta name="description" content={description} />
        <meta name="robots" content="browsers" />
        <meta name="language" content="english" />
        <meta name="keywords" content={keywords} />
      </Helmet>
    </div>
  );
};

export default HelmetContainer;
