pragma solidity >=0.4.24 <=0.5.6;

contract ShareContract {
    address public owner;
    
    // 컨트랙트 배포자
    constructor() public {
        owner = msg.sender;
        parties.push(Party(msg.sender, 0, 4, 0));
    }

    Party[] internal parties;
    Vote[] internal Votes;
    
    mapping (address => uint) getPartyIdx;  // 사용자의 파티 인덱스
    mapping (address => bool) isRefunded;   // 사용자가 환불을 받은적이 있는지 체크함
    mapping (address => uint) isVoted;      // 사용자의 투표 횟수
    
    uint emptyPartyIdx = 1;                 // 비어있는 파티 인덱스
    bool isEmptyParty = false;              // 빈 파티 유무
    uint totalPartyNumber = 0;                   // 방 개수
    uint value = 100000000000000000;        // 1Klay, peb단위
    bool canRefund = false;                 //환불 가능
    uint totalVote = 0;                     //지금까지 행해진 투표 수

    struct Party {
        address owner;
        uint startTime;                     // 방장이 start한 시점의 시간 저장
        uint people;
        uint voteIdx;                     //해당 방의 투표 실행 횟수
    }
    
    struct Vote {
        uint votePeople;                        //투표자 수
        uint cons;                          //반대 수
    }
    
    /*
    ** createParty() 함수
    ** 인자:    x
    ** 반환값:  x
    ** 설명:    방을 새로 만드는 함수. msg.sender가 새로운 방의 owner가 된다.
    */
    function createParty() public {
        require(getPartyIdx[msg.sender] == 0);
        uint id = parties.push(Party(msg.sender, 0, 1, 0)) - 1;
        getPartyIdx[msg.sender] = id;
        isRefunded[msg.sender] = true;
        totalPartyNumber++;
        isEmptyParty = true;
    }

    /* 
    ** isEmptyPartyCheck() 함수
    ** 인자:    x
    ** 반환값:  비어있는 방 유무 (bool)
    ** 설명:    빈 방이 있는지 확인하는 함수 (매칭하기 위해 반드시 호출해야 함).
    */
    function isEmptyPartyCheck() public view returns (bool) {
        if(isEmptyParty)
            return true;
        return false;
    }

    /*
    ** joinParty() 함수
    ** 인자:    x
    ** 반환값:  x
    ** 설명:    비어있는 방에 참여하는 함수 (빈 방이 있다고 가정).
    **          계좌 잔액이 일정 금액 이상이 있는지 확인 후, 컨트랙트 계좌로 지불해야 함.
    **          참여한 파티 인덱스 매핑 후 본인까지 4명이 되면 다음 빈 방을 가르키도록 함.
    */
    function joinParty() public payable {
        require(msg.value >= value);
        require(getBalancePartyone() >= value);
        getPartyIdx[msg.sender] = emptyPartyIdx;
        isRefunded[msg.sender] = false;
        parties[emptyPartyIdx].people++;
        if(parties[emptyPartyIdx].people == 4)
            _updateEmptyPartyIdx();
    }

    /*
    ** _updateEmptyPartyIdx() 함수
    ** 인자:    x
    ** 반환값:  x
    ** 설명:    비어있는 방을 가르키는 인덱스 값을 증가시키는 함수.
    **          더 이상 비어있는 방이 없을 경우, isEmptyParty 변수를 false로 함.
    */
    function _updateEmptyPartyIdx() internal {
        emptyPartyIdx++;      
        if (emptyPartyIdx >= totalPartyNumber + 1)
            isEmptyParty = false;
    }

    /*
    ** startParty() 함수
    ** 인자:    x
    ** 반환값:  x
    ** 설명:    파티장이 파티를 시작하는 함수.
    **          계약이 진행되고 (파티장이 입력한 공유 계정 정보가 전달됨),
    **          이 순간부터 계약을 위반하는 구성원 처벌이 가능.
    */
    function startParty() public {
        uint idx = getPartyIdx[msg.sender]; 
        require(parties[idx].owner == msg.sender); // 방장이 이 함수를 호출해야함
        require(parties[idx].people == 4); // 4명일때만 시작 가능
        parties[idx].startTime = now;
    }

    /*
    ** startParty() 제어자
    ** 조건:    1. 계약 시작 이후 30일이 경과하지 않아야 함.
    **          2. 이전에 환불을 받은 적이 없어야 함.
    **          3. 파티장이 아니어야 함.
    **          4. 투표 결과 환불 대상자여야 함.
    ** 설명:    계약 위반으로 파티가 조기 종료되는 경우,
    **          환불을 받을 조건을 명시.
    */
    modifier refundable() {
        uint senderPartyIdx = getPartyIdx[msg.sender];
        uint normalDays = now - parties[senderPartyIdx].startTime;
        require(normalDays < 30 days);
        require(isRefunded[msg.sender] == false);
        require(canRefund == true);
        require(msg.sender != parties[senderPartyIdx].owner);
        _;
    }
    
    /*
    ** _calculateRefund() 함수
    ** 인자:    uint startTime  (파티 시작 날짜)
    ** 반환값:  uint            (환불액)
    ** 설명:    계약 위반으로 파티가 조기 종료되는 경우,
    **          환불을 받을 금액을 반환하는 함수.
    **          지불한 금액에서 파티가 정상적으로 진행된 날짜만큼 차감하여 환불함.
    */
    function _calculateRefund(uint startTime) internal view returns (uint) {
        uint passedDay = now - startTime;//now,startTime은  초단위
        uint oneDayCost = value / (30*24*60*60); // 1초당 가격 
        uint refund = oneDayCost * (30 days - passedDay); // 1초당가격 * 남은 기간(초) (환불받을 가격)
        return refund;
    }

    /*
    ** breakUpParty() 함수
    ** 인자:    x
    ** 반환값:  x
    ** 설명:    계약 위반으로 파티가 조기 종료되나, 계약 위반자를 특정하기 힘든 경우,
    **          모든 파티원에게 환불이 이루어지는 함수.
    */
    function breakUpParty() external refundable() {
        uint partyIdx = getPartyIdx[msg.sender];
        isRefunded[msg.sender] = true;
        getPartyIdx[msg.sender] = 0;
        transfer(_calculateRefund(parties[partyIdx].startTime));
    }
 
    /*
    ** withdrawBreakParty() 함수
    ** 인자:    x
    ** 반환값:  x
    ** 설명: 파티가 조기종료된 경우, 진행된 날짜만큼의 금액을 방장이 인출할 수 있게하는 함수
    **       파티가 조기종료된 원인이 방장이 아닐 경우에만 실행가능
    **       여기서 now는 조기 종료된 시점이어야하므로 조기 종료되었을 때 해당 함수를 바로 실행해야함
    */
    function withdrawBreakParty() public {
        require(canRefund == true);
        uint partyIdx = getPartyIdx[msg.sender];
        uint passedDay = now - parties[partyIdx].startTime;
        uint oneDayCost = value / (30*24*60*60); // 1초당 가격
        uint refund = oneDayCost * passedDay; // 1초당가격 * 지난기간

        getPartyIdx[msg.sender] = 0;
        transfer(refund);
    }
    
    /*
    ** getBalance() 함수
    ** 인자:    x
    ** 반환값:  uint    (컨트랙트 계좌 잔액)
    ** 설명:    컨트랙트 계좌의 잔액을 반환하는 함수.
    */
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
    
    /*
    ** withdraw() 함수
    ** 인자:    x
    ** 반환값:  x
    ** 설명:    파티 종료 후 방장에게 계정 공유 수익을 송금하는 함수.
    **          자신이 속한 파티의 owner인 경우에만 호출이 가능.
    **          계약 시작 이후 30일 이상 지나고 정상적으로 파티가 종료되었을 경우에만 가능함.
    **          30일 모임 가격을 value 변수에 선언해둠.
    */
    function withdraw() public {
        uint idx = getPartyIdx[msg.sender];
        require(msg.sender == parties[idx].owner);
        require(now - parties[idx].startTime >= 30 days);
        getPartyIdx[msg.sender] = 0;
        uint returnValue = value * 3;
        transfer(returnValue);
    }

    /*
    ** getBalancePartyone() 함수
    ** 인자:    x
    ** 반환값:  계정 잔액
    ** 설명: 함수를 호출한 계정의 잔액 반환
    */
    function getBalancePartyone() internal view returns (uint) {
        return address(msg.sender).balance;
    }

    /*
    ** transfer() 함수
    ** 인자:    uint _value     (금액)
    ** 반환값:  bool            (송금 성공 여부)
    ** 설명:    msg.sender에게 인자로 받은 금액만큼 송금하는 함수.
    */
    function transfer(uint _value) public returns (bool) {
        require(getBalance() >= _value);
        msg.sender.transfer(_value);
        return true;
    }
    
    /*
    ** createVote() 함수
    ** 인자:    x
    ** 반환값:  x
    ** 설명: 투표를 생성하는 함수. 누군가 생성하면 알림보내는 기능 만들어야함. 총 투표와 파티당 투표횟수를 세줌.
    */
    
    function createVote() public {
        Votes.push(Vote(0,0));
        uint id = getPartyIdx[msg.sender];
        parties[id].voteIdx++;
        totalVote++;
    }
    
    /*
    ** voting() 함수
    ** 인자:    bool(폭파 찬성 = true, 폭파 반대 = false)
    ** 반환값:  x
    ** 설명:    사용자에게 폭파 찬성, 반대 값을 받음. 실행될때마다 voteCheck실행.
    **          isVoted를 이용해 1번만 투표 가능하게 함. 반대표, 총 투표인원 세어줌.
    */
    
    function voting(bool election) public {
        uint id = getPartyIdx[msg.sender];
        require(isVoted[msg.sender] == parties[id].voteIdx-1);
        isVoted[msg.sender]++;
        Votes[totalVote-1].votePeople++;
        if(election == false){
            Votes[totalVote-1].cons++;
        }
        voteCheck();
    }   
    
    /*
    ** voteCheck() 함수
    ** 인자:    x
    ** 반환값:  x
    ** 설명:    만약 4명 모두 투표하면 voteResult실행.
    */
    
    function voteCheck() internal {
        if(Votes[totalVote-1].votePeople == 4){
            voteResult();
        }
    }
    
    /*
    ** voteResult() 함수
    ** 인자:    x
    ** 반환값:  x
    ** 설명:    만약 반대표가 없으면 환불이 가능하게 canRefund를 true로 만듦.
    */
    
    function voteResult() public {
        if(Votes[totalVote-1].cons == 0){
            canRefund = true;
        }
    }
    
}
