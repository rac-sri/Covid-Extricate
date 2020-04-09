pragma solidity ^0.6.5;

import "./donationcamp.sol";


contract CovidExtricate {
    DonationCamp[] public deployedCamps;

    function CreateCamp(
        uint256 amountNeeded,
        string memory name,
        string memory description,
        string memory link
    ) public {
        DonationCamp newCamp = new DonationCamp(
            amountNeeded,
            name,
            description,
            link,
            msg.sender
        );
        deployedCamps.push(newCamp);
    }

    function getDeployedCamps() public view returns (DonationCamp[] memory) {
        return deployedCamps;
    }
}
