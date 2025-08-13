const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Voting Contract", function () {
    let Voting, voting, owner, addr1, addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        voting = await ethers.deployContract("Voting", [owner.address]);
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await voting.owner()).to.equal(owner.address);
        });
    });

    describe("Candidate Management", function () {
        it("Should allow the owner to add a candidate", async function () {
            await voting.connect(owner).addCandidate("Candidate 1");
            const candidates = await voting.getCandidates();
            expect(candidates.length).to.equal(1);
            expect(candidates[0].name).to.equal("Candidate 1");
        });

        it("Should prevent non-owners from adding a candidate", async function () {
            await expect(voting.connect(addr1).addCandidate("Candidate 2"))
                .to.be.revertedWithCustomError(voting, "OwnableUnauthorizedAccount");
        });
    });

    describe("Voting", function () {
        beforeEach(async function () {
            await voting.connect(owner).addCandidate("Candidate A");
            await voting.connect(owner).addCandidate("Candidate B");
        });

        it("Should allow a user to vote", async function () {
            await voting.connect(addr1).vote(0);
            const candidates = await voting.getCandidates();
            expect(candidates[0].voteCount).to.equal(1);
        });

        it("Should emit a Voted event", async function () {
            await expect(voting.connect(addr1).vote(0))
                .to.emit(voting, "Voted")
                .withArgs(0, addr1.address);
        });

        it("Should prevent a user from voting twice", async function () {
            await voting.connect(addr1).vote(0);
            await expect(voting.connect(addr1).vote(0)).to.be.revertedWith("You have already voted.");
        });

        it("Should prevent voting for a non-existent candidate", async function () {
            await expect(voting.connect(addr1).vote(99)).to.be.revertedWith("Invalid candidate ID.");
        });
    });

    describe("Winner Logic", function () {
        beforeEach(async function () {
            await voting.connect(owner).addCandidate("Alice"); // ID 0
            await voting.connect(owner).addCandidate("Bob");   // ID 1

            await voting.connect(addr1).vote(1); // Bob gets a vote
            await voting.connect(addr2).vote(1); // Bob gets another vote
        });

        it("Should correctly declare the winner", async function () {
            const winner = await voting.getWinner();
            expect(winner.name).to.equal("Bob");
            expect(winner.voteCount).to.equal(2);
        });
    });
});
