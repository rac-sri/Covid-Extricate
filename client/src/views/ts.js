import React, { useEffect, useState } from "react";
import camp from "../ethereum/camp";
import { Button, Input } from "reactstrap";
import web3 from "../ethereum/web3";
const Tr = (props) => {
  const [money, update] = useState(0);
  const [value, updateValue] = useState({
    instance: "",
    value: "",
    name: "",
    description: "",
    link: "",
    address: [],
  });
  useEffect(async () => {
    const instance = camp(props.address);
    const values = await instance.methods.getValues().call();
    updateValue({
      instance,
      name: values[1],
      description: values[2],
      link: values[3],
      value: values[0],
      address: values[4],
    });
  }, []);
  return (
    <tr>
      <td>{value.name}</td>
      <td>{value.description}</td>
      <td>{value.link}</td>

      <td>
        <input
          value={money}
          onChange={(e) => {
            update(e.target.value);
          }}
        />
      </td>
      <td>
        <Button
          onClick={async () => {
            const accounts = await web3.eth.getAccounts();
            await value.instance.methods.contribute().send({
              from: accounts[0],
              value: web3.utils.toWei(money, "ether"),
            });
          }}
        >
          Donate
        </Button>
        <Button
          onClick={async () => {
            const accounts = await web3.eth.getAccounts();
            await value.instance.methods
              .transferFund()
              .send({ from: accounts[0] });
          }}
        >
          Collect
        </Button>
      </td>
    </tr>
  );
};

export default Tr;
