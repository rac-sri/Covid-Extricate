import NotificationCopy from "./Notifications copy";
import React, { Component } from "react";
import { Button } from "reactstrap";

class Notification extends Component {
  state = { isMetaMask: false, accounts: [], installMetamask: false };

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        {!this.state.isMetaMask && (
          <div className="content">
            >
            <Button
              onClick={async () => {
                if (
                  typeof window.web3 !== "undefined" &&
                  window.web3.currentProvider.isMetaMask
                ) {
                  const accounts = await window.ethereum.enable();
                  this.setState({ isMetaMask: true, accounts });
                } else {
                  this.setState({ installMetamask: true });
                }
              }}
            >
              Login With Metamask
            </Button>
            {this.state.installMetamask && (
              <a href="https://metamask.io/download.html" target="_blank">
                <Button>Install Metamask</Button>
              </a>
            )}
          </div>
        )}
        {this.state.isMetaMask && (
          <NotificationCopy accounts={this.state.accounts} />
        )}
      </React.Fragment>
    );
  }
}

export default Notification;
