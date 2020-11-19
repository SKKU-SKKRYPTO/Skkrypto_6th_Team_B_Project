pragma solidity >=0.4.24 <=0.5.6;

contract ShareContract {
    address public owner;
    
    // ��Ʈ��Ʈ ������
    constructor() public {
        owner = msg.sender;
    }

    Party[] internal parties;
    
    mapping (address => uint) getPartyIdx;  // ������� ��Ƽ �ε���
    mapping (address => bool) isRefunded;   // ����ڰ� ȯ���� �������� �ִ��� üũ��

    uint emptyPartyIdx = 0;                 // ����ִ� ��Ƽ �ε���
    bool isEmptyParty = false;              // �� ��Ƽ ����
    uint totalPartyNumber = 0;                   // �� ����
    uint value = 1000000000000000000;       // 1Klay, peb����

    struct Party {
        address owner;
        uint startTime;                     // ������ start�� ������ �ð� ����
        uint people;
    }
    
    /*
    ** createParty() �Լ�
    ** ����:    x
    ** ��ȯ��:  x
    ** ����:    ���� ���� ����� �Լ�. msg.sender�� ���ο� ���� owner�� �ȴ�.
    */
    function createParty() public {
        uint id = parties.push(Party(msg.sender, 0, 1)) - 1;
        getPartyIdx[msg.sender] = id;
        isRefunded[msg.sender] = true;
        totalPartyNumber++;
        isEmptyParty = true;
    }

    /* 
    ** isEmptyPartyCheck() �Լ�
    ** ����:    x
    ** ��ȯ��:  ����ִ� �� ���� (bool)
    ** ����:    �� ���� �ִ��� Ȯ���ϴ� �Լ� (��Ī�ϱ� ���� �ݵ�� ȣ���ؾ� ��).
    */
    function isEmptyPartyCheck() public view returns (bool) {
        if(isEmptyParty)
            return true;
        return false;
    }

    /*
    ** joinParty() �Լ�
    ** ����:    x
    ** ��ȯ��:  x
    ** ����:    ����ִ� �濡 �����ϴ� �Լ� (�� ���� �ִٰ� ����).
    **          ���� �ܾ��� ���� �ݾ� �̻��� �ִ��� Ȯ�� ��, ��Ʈ��Ʈ ���·� �����ؾ� ��.
    **          ������ ��Ƽ �ε��� ���� �� ���α��� 4���� �Ǹ� ���� �� ���� ����Ű���� ��.
    */
    function joinParty() public payable {
        require(msg.value > value);
        getPartyIdx[msg.sender] = emptyPartyIdx;
        parties[emptyPartyIdx].people++;
        if(parties[emptyPartyIdx].people == 4)
            _updateEmptyPartyIdx();
    }

    /*
    ** _updateEmptyPartyIdx() �Լ�
    ** ����:    x
    ** ��ȯ��:  x
    ** ����:    ����ִ� ���� ����Ű�� �ε��� ���� ������Ű�� �Լ�.
    **          �� �̻� ����ִ� ���� ���� ���, isEmptyParty ������ false�� ��.
    */
    function _updateEmptyPartyIdx() internal {
        emptyPartyIdx++;
        if (emptyPartyIdx >= totalPartyNumber)
            isEmptyParty = false;
    }

    /*
    ** startParty() �Լ�
    ** ����:    x
    ** ��ȯ��:  x
    ** ����:    ��Ƽ���� ��Ƽ�� �����ϴ� �Լ�.
    **          �� �ް� ����� ����ǰ� (��Ƽ���� �Է��� ���� ���� ������ ���޵�),
    **          �� �������� ����� �����ϴ� ������ ó���� ����.
    */
    function startParty() public {
        uint idx = getPartyIdx[msg.sender];
        require(parties[idx].owner == msg.sender); // ������ �� �Լ��� ȣ���ؾ���
        require(parties[idx].people == 4); // 4���϶��� ���� ����
        parties[idx].startTime = now;
    }

    /*
    ** startParty() ������
    ** ����:    1. ��� ���� ���� 30���� ������� �ʾƾ� ��.
    **          2. ������ ȯ���� ���� ���� ����� ��.
    **          3. ��Ƽ���� �ƴϾ�� ��.
    ** ����:    ��� �������� ��Ƽ�� ���� ����Ǵ� ���,
    **          ȯ���� ���� ������ ���.
    */
    modifier refundable() {
        uint senderPartyIdx = getPartyIdx[msg.sender];
        uint normalDays = now - parties[senderPartyIdx].startTime;
        require(normalDays < 30 days);
        require(isRefunded[msg.sender] == false);
        require(msg.sender != parties[senderPartyIdx].owner);
        _;
    }
    
    /*
    ** _calculateRefund() �Լ�
    ** ����:    uint startTime  (��Ƽ ���� ��¥)
    ** ��ȯ��:  uint            (ȯ�Ҿ�)
    ** ����:    ��� �������� ��Ƽ�� ���� ����Ǵ� ���,
    **          ȯ���� ���� �ݾ��� ��ȯ�ϴ� �Լ�.
    **          ������ �ݾ׿��� ��Ƽ�� ���������� ����� ��¥��ŭ �����Ͽ� ȯ����.
    */
    function _calculateRefund(uint startTime) internal view returns (uint) {
        uint passedDay = now - startTime;
        uint oneDayCost = value / 30; // �Ϸ�� ����
        uint refund = oneDayCost * (30 days - passedDay); // �Ϸ�簡�� * ���� �Ⱓ (ȯ�ҹ��� ����)
        return refund;
    }
    
    /*
    ** kickSomeone() �Լ�
    ** ����:    address _criminal  (��� ������)
    ** ��ȯ��:  x
    ** ����:    ��� �������� ��Ƽ�� ���� ����Ǵ� ���,
    **          ��� �����ڸ� ������ ��Ƽ������ ȯ���� �̷������ �Լ�.
    */
    function kickSomeone(address _criminal) external refundable() {
        require(msg.sender != _criminal);
        uint partyIdx = getPartyIdx[msg.sender];
        isRefunded[msg.sender] = true;
        transfer(_calculateRefund(parties[partyIdx].startTime));
    }

    /*
    ** breakUpParty() �Լ�
    ** ����:    x
    ** ��ȯ��:  x
    ** ����:    ��� �������� ��Ƽ�� ���� ����ǳ�, ��� �����ڸ� Ư���ϱ� ���� ���,
    **          ��� ��Ƽ������ ȯ���� �̷������ �Լ�.
    */
    function breakUpParty() external refundable() {
        uint partyIdx = getPartyIdx[msg.sender];
        isRefunded[msg.sender] = true;
        transfer(_calculateRefund(parties[partyIdx].startTime));
    }
    
    /*
    ** withdrawBreakParty() �Լ�
    ** ����:    x
    ** ��ȯ��:  x
    ** ����: ��Ƽ�� ��������� ���, ����� ��¥��ŭ�� �ݾ��� ������ ������ �� �ְ��ϴ� �Լ�
    **       ��Ƽ�� ��������� ������ ������ �ƴ� ��쿡�� ���డ��
    **       ���⼭ now�� ���� ����� �����̾���ϹǷ� ���� ����Ǿ��� �� �ش� �Լ��� �ٷ� �����ؾ���
    */
    function withdrawBreakParty() public {
        uint partyIdx = getPartyIdx[msg.sender];
        uint passedDay = now - parties[partyIdx].startTime;
        uint oneDayCost = value / 30; // �Ϸ�� ����
        uint refund = oneDayCost * passedDay; // �Ϸ�簡�� * ���� �Ⱓ
        transfer(refund);
    }
    
    /*
    ** getBalance() �Լ�
    ** ����:    x
    ** ��ȯ��:  uint    (��Ʈ��Ʈ ���� �ܾ�)
    ** ����:    ��Ʈ��Ʈ ������ �ܾ��� ��ȯ�ϴ� �Լ�.
    */
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
    
    /*
    ** withdraw() �Լ�
    ** ����:    x
    ** ��ȯ��:  x
    ** ����:    ��Ƽ ���� �� ���忡�� ���� ���� ������ �۱��ϴ� �Լ�.
    **          �ڽ��� ���� ��Ƽ�� owner�� ��쿡�� ȣ���� ����.
    **          ��� ���� ���� 30�� �̻� ������ ���������� ��Ƽ�� ����Ǿ��� ��쿡�� ������.
    **          30�� ���� ������ value ������ �����ص�.
    */
    function withdraw() public {
        uint idx = getPartyIdx[msg.sender];
        require(msg.sender == parties[idx].owner);
        require(now - parties[idx].startTime >= 30 days);
        uint returnValue = value * 3;
        transfer(returnValue);
    }

    /*
    ** transfer() �Լ�
    ** ����:    uint _value     (�ݾ�)
    ** ��ȯ��:  bool            (�۱� ���� ����)
    ** ����:    msg.sender���� ���ڷ� ���� �ݾ׸�ŭ �۱��ϴ� �Լ�.
    */
    function transfer(uint _value) public returns (bool) {
        require(getBalance() >= _value);
        msg.sender.transfer(_value);
        return true;
    }
    
    /*
    function getContractAddress() public view returns (address) {
        return address(this);
    }
    */
}