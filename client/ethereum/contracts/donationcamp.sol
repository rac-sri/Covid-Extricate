pragma solidity ^0.6.5;


contract DonationCamp{
    uint AmountNeeded;
    string Name;
    string Description;
    string Link;
    address payable Sender;
    address[] public contributors;
    
    constructor(uint amountNeeded , string memory name , string memory description , string memory link , address payable sender) public{
        AmountNeeded = amountNeeded;
        Name = name;
        Description = description;
        Link = link;
        Sender = sender;
    }  
    
    modifier validate{
        require(msg.sender != Sender);
        _;
    }
    function contribute() public payable validate {
        contributors.push(msg.sender);
    }
    
    function transferFund() public validate{
        require(address(this).balance >= AmountNeeded);
        Sender.transfer(address(this).balance);
    }
    
    function  getValues() public view returns(uint n, string memory  ,  string memory ,  string memory , address[] memory){
        return (AmountNeeded , Name , Description , Link , contributors);
    }
    
}