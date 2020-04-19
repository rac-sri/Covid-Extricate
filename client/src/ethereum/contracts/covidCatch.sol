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
    }
    
    Report[] public reports;
    
    function newReport(string memory _location, string memory _ipfsProof) public {
        Report memory rep = Report(msg.sender, _location, _ipfsProof, now);
        reports.push(rep);
    }
    
    function getReportsCount() public view returns (uint count) {
        count = reports.length;
    }

}