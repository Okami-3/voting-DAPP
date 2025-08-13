// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Voting is Ownable {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(address => bool) private hasVoted;
    Candidate[] public candidates;
    uint private nextCandidateId;

    event Voted(uint indexed _candidateId, address indexed _voter);

    constructor(address initialOwner) Ownable(initialOwner) {}

    function addCandidate(string memory _name) public onlyOwner {
        candidates.push(Candidate(nextCandidateId, _name, 0));
        nextCandidateId++;
    }

    function vote(uint _candidateId) public {
        require(!hasVoted[msg.sender], "You have already voted.");
        require(_candidateId < nextCandidateId, "Invalid candidate ID.");

        candidates[_candidateId].voteCount++;
        hasVoted[msg.sender] = true;

        emit Voted(_candidateId, msg.sender);
    }

    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function getWinner() public view returns (Candidate memory) {
        require(candidates.length > 0, "No candidates available.");

        uint winningVoteCount = 0;
        uint winnerId = 0;

        for (uint i = 0; i < candidates.length; i++) {
            if (candidates[i].voteCount > winningVoteCount) {
                winningVoteCount = candidates[i].voteCount;
                winnerId = i;
            }
        }

        return candidates[winnerId];
    }
}
