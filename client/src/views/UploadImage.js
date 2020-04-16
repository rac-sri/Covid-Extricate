import React, { Component } from "react";
import parent from "../ethereum/parent";
import camp from "../ethereum/camp";
import web3 from "../ethereum/web3";
import { StyledDropZone } from "react-drop-zone";
import FileIcon, { defaultStyles } from "react-file-icon";
import fileReaderPullStream from "pull-file-reader";
import ipfs from "../ethereum/ipfs";
import { Table } from "reactstrap";
import Moment from "react-moment";
class UploadImage extends Component {
  state = { accounts: null, solidityDrive: [], contracts: null, web3 };

  componentDidMount() {
    console.log(ipfs);
    web3.currentProvider.publicConfigStore.on("update", async () => {
      const changedAccounts = await web3.eth.getAccounts();
      this.setState({ accounts: changedAccounts });
      this.getFiles();
    });

    this.setState({ contract: parent, web3, solidityDrive: [] });
  }

  getFiles = async () => {
    // try {
    //     const { accounts, contract } = this.state;
    //     let filesLength = await contract.methods.getLength().call({ from: accounts[0] });
    //     let files = []
    //     for (let i = 0; i < filesLength; i++) {
    //       let file = await contract.methods.getFile(i).call({ from: accounts[0] })
    //       files.push(file);
    //     }
    //     this.setState({ solidityDrive: files });
    //   } catch (error) {
    //     console.log(error)
    //   }
  };

  onDrop = async (file) => {
    try {
      const { account, contract } = this.state;
      const stream = fileReaderPullStream(file);
      const result = await ipfs.add(stream);
      //     const timestamp = Math.round(+new Date()/1000);
      //     const type = file.name.substr(file.name.lastIndexOf(".")+1);
      //     let fileuploaded = await contract.methods.add(result[0].hash, file.name, type, timestamp).send({from: accounts[0], gas: 300000});
      //     console.log(fileuploaded);
      //     //debugger;
      //   } catch (error) {
      //     console.log(error);
      //   }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    const { solidityDrive } = this.state;
    return (
      <div className="content">
        <div className="card">
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Location Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Location Address"
                />
              </div>
              <div
                style={{
                  height: "200px",
                  width: "100%",
                }}
              >
                <StyledDropZone onDrop={this.onDrop} />
              </div>{" "}
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>

        <Table className="tablesrter" responsive>
          <thead className="text-primary">
            <tr>
              <th>File Name</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {solidityDrive !== []
              ? solidityDrive.map((item, key) => (
                  <tr>
                    <td className="text-left">
                      <a href={"https://ipfs.io/ipfs/" + item[0]}>{item[1]}</a>
                    </td>
                    <td className="text-right">
                      <Moment format="YYYY/MM/DD" unix>
                        {item[3]}
                      </Moment>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default UploadImage;
