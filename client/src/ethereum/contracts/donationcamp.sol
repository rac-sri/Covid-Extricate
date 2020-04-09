pragma solidity ^0.6.5;


contract DonationCamp {
    uint256 AmountNeeded;
    string Name;
    string Description;
    string Link;
    address payable Sender;
    address[] public contributors;

    constructor(
        uint256 amountNeeded,
        string memory name,
        string memory description,
        string memory link,
        address payable sender
    ) public {
        AmountNeeded = amountNeeded;
        Name = name;
        Description = description;
        Link = link;
        Sender = sender;
    }

    modifier validate {
        require(msg.sender != Sender);
        _;
    }

    function contribute() public payable validate {
        contributors.push(msg.sender);
    }

    function transferFund() public {
        require(msg.sender == Sender);
        require(address(this).balance >= AmountNeeded);
        Sender.transfer(address(this).balance);
    }

    function getValues()
        public
        view
        returns (
            uint256 n,
            string memory,
            string memory,
            string memory,
            address[] memory
        )
    {
        return (AmountNeeded, Name, Description, Link, contributors);
    }
}
