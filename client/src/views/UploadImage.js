import React, { Component } from "react";
import parent from "../ethereum/covidCatchContract";
import web3 from "../ethereum/web3";
import { StyledDropZone } from "react-drop-zone";
import FileIcon, { defaultStyles } from "react-file-icon";
import fileReaderPullStream from "pull-file-reader";
import ipfs from "../ethereum/ipfs";
import { Table } from "reactstrap";
import Moment from "react-moment";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const query = gql`
  query idVerify($id: String!) {
    idVerify(input: $id)
  }
`
const getHash = gql`
  {
    idVerify
  }
`

class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: null,
      solidityDrive: [],
      contract: null,
      web3,
      location: "",
      ipfsHash: "",
      buffer: null,
      value: "",
      submit: false,
      isOwner: false
    };
  }

  componentDidMount() {
    web3.eth.getAccounts((err, accounts) => {
      this.setState({ accounts: accounts });
      console.log("ACCOUNTSSSS", this.state.accounts);

      this.setState({
        contract: parent,
        web3,
      });

      this.state.contract.methods
        .owner()
        .call({ from: accounts[0] })
        .then(owner => {
          console.log(owner, "OWNER")
          if(owner === accounts[0])
          {
            this.setState({
              isOwner: true
            })
          }
          this.getFiles();
        })
    });
  }

  getFiles = async () => {
    try {
      const { accounts, contract } = this.state;
      let filesLength = await contract.methods
        .getReportsCount()
        .call({ from: accounts[0] });
      let files = [];
      for (let i = 0; i < filesLength; i++) {
        let file = await contract.methods
          .reports(i)
          .call({ from: accounts[0] });
        files.push(file);
      }
      this.setState({ solidityDrive: files });
    } catch (error) {
      console.log(error);
    }
  };

  captureFile = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => this.convertToBuffer(reader);
  };
  convertToBuffer = async (reader) => {
    //file is converted to a buffer for upload to IPFS
    const buffer = await Buffer.from(reader.result);
    //set this buffer -using es6 syntax
    this.setState({ buffer });
  };

  // onDrop = async (file) => {
  //   try {
  //     const stream = fileReaderPullStream(file);
  //     // const result = await ipfs.add(stream);
  //     // console.log(result[0].hash)
  //     await ipfs.add(stream, (err, ipfsHash) => {
  //       console.log(err, ipfsHash);
  //       this.setState({ ipfsHash: ipfsHash[0].hash });
  //     });
  //     //this.setState({ ipfsHash: result[0].hash });
  //     // const timestamp = Math.round(+new Date() / 1000);
  //     // const type = file.name.substr(file.name.lastIndexOf(".") + 1);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { accounts, contract, location, buffer } = this.state;

    try {
      await ipfs.add(buffer, (err, ipfsHash) => {
        console.log(err, ipfsHash);
        //setState by setting ipfsHash to ipfsHash[0].hash
        this.setState({ ipfsHash: ipfsHash[0].hash });
        let fileuploaded = contract.methods
          .newReport(location, this.state.ipfsHash)
          .send({ from: accounts[0], gas: 300000 });

        console.log(fileuploaded);
      });
      //debugger;
    } catch (error) {
      console.log(error);
    }
  };

  setField = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.setState({ submit: !this.state.submit });
  };

  takeAction = async (id) => {
    const {contract, accounts} = this.state
    await contract.methods
          .setActionTaken(id)
          .send({ from: accounts[0], gas: 300000 });
  }

  render() {
    const { solidityDrive } = this.state;
    return (
      <div className="content">
        <div className="card">
          <div className="card-body">
            <h3>Submit New Act of Violation</h3>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="location">Location Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  aria-describedby="emailHelp"
                  placeholder="Enter Location Address"
                  name="location"
                  onChange={this.setField}
                  value={this.state.location}
                />
              </div>
              <br/>
              <input type="file" onChange={this.captureFile} />
              <div
                style={{
                  height: "50px",
                  width: "100%",
                }}
              >
                {/* <StyledDropZone onDrop={this.onDrop} /> */}
              </div>{" "}
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
        <h3>Current Reports:</h3>
        <Table className="tablesrter" responsive>
          <thead className="text-primary">
            <tr>
              <th>Date</th>
              <th>Location</th>
              <th>Image Proof</th>
              <th>Action Taken?</th>
            </tr>
          </thead>
          <tbody>
            {solidityDrive !== []
              ? solidityDrive.map((item, key) => (
                  <tr key={key}>
                  <td className="text-left">
                      <Moment format="YYYY/MM/DD" unix>
                        {item.reportedAt}
                      </Moment>
                    </td>
                    <td className="text-left">
                      {item.location}
                    </td>
                    <td className="text-left">
                      <a href={"https://ipfs.io/ipfs/" + item.proof_ipfs_hash}>
                        VIEW PROOF
                      </a>
                    </td>
                    <td>
                      {this.state.isOwner && !item.actionTaken ? (<button onClick={() => this.takeAction(key)} className="btn">Take Action</button>) : (item.actionTaken ? ("Yes") : ("No"))}
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
        
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="location">Register</label>
            <input
              type="text"
              className="form-control"
              id="location"
              aria-describedby="emailHelp"
              placeholder="Enter Aadhaar Number"
              name="location"
              onChange={(e) =>
                this.setState({ submit: false, value: e.target.value })
              }
              value={this.state.value}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>

        {this.state.submit && (
          <Query query={query} variables={{ id: this.state.value }}>
            {({ loading, error, data }) => {
              if (loading) return "Loading...";
              if (error) return `Error ${error.message}`;
              return (
                <>
                  {" "}
                  <h5>Your PassToken:</h5>
                  <p>{data.idVerify}</p>
                </>
              );
            }}
          </Query>
        )}
      </div>
    );
  }
}

export default UploadImage;
