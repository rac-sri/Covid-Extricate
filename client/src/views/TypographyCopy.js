import React, { Component, useState } from "react";
import Table from "./timeline";
import { InputGroup, Button, Input } from "reactstrap";

function TypographyContainer() {
  const [values, update] = useState({ values: "", state: false });

  return (
    <>
      <div className="content">
        <InputGroup>
          <Input
            placeholder="Country Name"
            value={values.values}
            onChange={(e) => {
              update({ values: e.target.value, state: false });
            }}
          />
        </InputGroup>
        <br />
        <Button onClick={() => update({ values: values.values, state: true })}>
          Search
        </Button>
        {values.state && <Table country={values.values} />}
      </div>
    </>
  );
}

export default TypographyContainer;
