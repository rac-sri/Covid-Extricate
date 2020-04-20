pragma solidity ^0.5.0;

contract covidCatch {
    
    address public owner;
    modifier onlyOwner() {
        if (msg.sender != owner) {
            revert();
        }
        _;
    }
    
    struct Report {
        address reportedBy;
        string location;
        string proof_ipfs_hash;
        uint reportedAt;
        bool actionTaken;
    }
    
    Report[] public reports;
    mapping(address => string) public userIds;
    
    constructor() public {
        owner = msg.sender;
    }
    
    function newReport(string memory _location, string memory _ipfsProof) public {
        Report memory rep = Report(msg.sender, _location, _ipfsProof, now, false);
        reports.push(rep);
    }
    
    function getReportsCount() public view returns (uint count) {
        count = reports.length;
    }
    
    function setActionTaken(uint _reportId) external onlyOwner {
        Report storage rep = reports[_reportId];
        rep.actionTaken = true;
    }
    
    function addUserId(string calldata _userId) external {
        userIds[msg.sender] = _userId;
    }
    
    function getMyUserId() external view returns(string memory) {
        return userIds[msg.sender];
    }

}