import NotificationCopy from "./Notifications copy";
import React, { Component } from "react";
import { Button } from "reactstrap";

class Notification extends Component {
  state = { isMetaMask: false, accounts: [] };

  render() {
    return (
      <React.Fragment>
        {!this.state.isMetaMask && (
          <div className="content">
            >
            <Button
              onClick={async () => {
                const accounts = await window.ethereum.enable();
                this.setState({ isMetaMask: true, accounts });
              }}
            >
              Login With Metamask
            </Button>
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
