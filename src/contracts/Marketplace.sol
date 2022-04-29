pragma solidity >=0.4.21 <8.10.0;


contract Marketplace {
	string public name;
	uint public productCount = 0;

	mapping(uint => Product) public products;

	struct Product {
		string name;
		uint price;
		address payable owner;
		bool purchased;
	}


	constructor() public {
		name = "Undeadblocks Marketplace";
	}

	

	function purchaseProduct (uint _price) public payable {

		// fetch the product owner's address
		address payable _seller = 0xC65Fb6D0AeDc5F8573E2E0a53805989809423F7C;

		// require that there is enough ether for the transaction
		require (msg.value >= _price, "ERROR: insufficient balance");

		// pay the seller by sending them ether
		address(_seller).transfer(msg.value);

	}
}

