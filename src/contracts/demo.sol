// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Basic {
    address god;
    constructor() {
        god = msg.sender;
    }
}
