import React from "react";

const FileInput = React.forwardRef((props, ref) => (
    <input ref={ref} {...props} type="file" />
  ));

export default FileInput;