pragma solidity >=0.4.24 <=0.5.6;

import "./Ownable.sol";



contract Party is Ownable {
    address[3] participants;
    uint startTime = 0;
    uint people = 0;
    bool empty = true;

     // 함수 호출하면 컨트랙트의 주소 반환    
    function getContractAddress() public view returns (address) {
        return address(this);
    }
    
    // 함수 호출한 계정의 주소를 participant에 추가
    // 만약 방이 꽉 찼다면 거부?
    // 파티원이 컨트랙트에 송금
    function sending(uint _value) public payable {
        require(msg.value > _value); // 잔액체크? 이거 0 말고 송금해야 되는 금액으로 바꿔보자
        participant[people++] = msg.sender; // participant 배열에 호출한 사람 주소 추가하고 인원+1
        if(people == 3) {
            empty = false;
            startTime = now;
        }
    }
    
    // 환불 조건
    modifier refundable() {
        uint normalDays = now - startTime;
        require(normalDays < 30 days);
        _;
    }

    // 투표 결과에 따라 방장을 처벌
    function kickLeader(uint _value) external refundable() {
        require(msg.sender != owner);
        uint _refund = _value / (now - startTime);
        transfer(_refund);
        // 30 - normalDays만큼 입금한 돈을 각 participants에게 송금함
        // 블록체인 상의 평판도를 낮춤
    }

    // 투표 결과에 따라 참가자를 처벌 (잘못한 사람 지갑 주소)
    function kickMember(address _criminal) external refundable() {
        require(msg.sender != owner);
        uint _refund = _value / (now - startTime);
        require(msg.sender != _criminal); // 처벌자가 아니여야 환불이 가능함
        transfer(_refund);
    }

    // 투표 결과에 따라 해산 (참가자를 특정하기 힘든 경우)
    // 계약이 진행된 일자/30 만큼 방장에게 송금
    // 잔액을 참가자에게 돌려주고 컨트랙트를 해산
    function breakUpParty() external refundable() {
        require(msg.sender != owner);
        uint _refund = _value / (now - startTime);
        transfer(_refund);
    }
    
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
    
    function deposit() public payable {
        uint days = now - startTime;
        require(days >= 30);
        require(msg.sender == owner);
        transfer(getBalance());
    }
    
    function transfer(uint _value) public returns (bool) {
        require(getBalance() >= _value);
        msg.sender.transfer(_value);
        return true;
    }
}
