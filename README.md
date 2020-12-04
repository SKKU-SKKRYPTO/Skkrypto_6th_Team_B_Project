# N-Share by 화이팀 - Skkrypto_6th_Team_B_Project

## 프로젝트 소개 (Project Introduction)
![최종로고-removebg-preview](https://user-images.githubusercontent.com/64328412/100838233-6ef1d700-34b5-11eb-9e6c-af9fbcb50901.png)
#### N-Share는 블록체인 스마트 컨트랙트를 통해 구현한 계정공유 중개 서비스입니다.(N-Share is account sharing service, implemented using smart contract.)

+ 스마트 컨트랙트를 통해 사용자의 돈을 안전하게 보호해줍니다.
(By using smart contract, user's charge is protected safely from malicious seizure.)
+ 귀찮은 송금 과정 없이 클레이튼 지갑만 등록한다면 계정공유 서비스를 이용 가능합니다. 
(N-Share service is usable with Klaytn wallet, without additional remittance step.)
+ 자동매칭 시스템으로 번거롭게 계정공유 파티를 직접 찾을 필요를 없앴습니다. 
(With auto-matching system, user don't have to find their match by themselves.)

## 설치 (Installation)
```
git clone https://github.com/SKKU-SKKRYPTO/Skkrypto_6th_Team_B_Project.git

cd ./Skkrypto_6th_Team_B_Project/front-end/

npm install

npm run start
```

혹은 [N-Share](https://skku-skkrypto.github.io/Skkrypto_6th_Team_B_Project/) 에서 이용가능

## 시작 (Getting started)

1. [Klaytn Wallet](https://baobab.wallet.klaytn.com/) 에서 계정 생성
2. 생성한 계정으로 N-Share 로그인
3. 자신의 계정을 공유하고 싶다면 파티장 => 매칭하기
4. 다른 사람의 계정을 공유받고 싶다면 파티원 => 매칭하기

## Why Blockchain?
블록체인의 주요 기술 중 하나인 스마트 컨트랙트는 계약을 코드로 구현한 것으로 설정한 조건이 충족되었을 때 계약이 이행되게 하는 스크립트입니다. 스마트 컨트랙트의 가장 큰 특성은 올바르게 구현되었을 때는 계약 당사자들 상호 간의 신뢰 없이도 거래가 가능하게 해준다는 것입니다. 

기존의 계정 공유는 두가지 형태로 일어났었습니다. 
1. 커뮤니티에서 이루어지는 계정 공유 : 거래 당사자 간의 신뢰가 없어 계정 공유가 원활하게 일어나기 힘들었습니다. 
2. 중개 서비스를 통한 계정 공유 : 본인 인증과 은행이라는 제3자를 통해 신뢰를 확보하여 익명성을 보장해주지 못하고 수수료가 있습니다. 

따라서 신뢰 없이 계약이 가능하게 해주는 스마트 컨트랙트를 계정 공유 서비스에 도입하여 효율적이고 안전하게 계정 공유가 가능하게 하는 서비스를 구현하였습니다. 

## 핵심기술

#### 스마트 컨트랙트
스마트 컨트랙트는 N-Share에서 신뢰 없이 신뢰 가능한 거래를 이루기 위해 사용되었습니다. 

파티원(계정 사용자)는 매칭이 되면 스마트 컨트랙트에 금액을 미리 지불합니다. 스마트 컨트랙트는 파티가 시작된 날짜부터 내부에서 계산을 하게 되고 30일이 지나게 되면 파티장(계정 공유자)에게 미리 파티원이 지불한 금액을 정산합니다. 또, 파티에 문제가 생겨 30일 이전에 해체하게 되더라도 스마트 컨트랙트에 의해 파티원은 사용한 날에 맞게 환불을 받고 파티장은 제공한 날에 맞게 정산을 받습니다.

스마트 컨트랙트를 통해 계정 공유를 함으로써 다음의 효과를 얻을 수 있습니다.
+ 파티장은 파티원이 스마트 컨트랙트에 미리 지불한 금액을 제때, 안전하게 정산받을 수 있습니다.
+ 파티원은 미리 금액을 스마트 컨트랙트에 지불하고도 파티장에게서 계정 정보를 변경하는 등의 사기를 당할 걱정없이 계정 공유를 이용할 수 있습니다.


## 유저 플로우 (User Flow)
![N-share_User Flow_page-0001](https://user-images.githubusercontent.com/64328412/101149194-ec5a4a80-3661-11eb-85ca-834c53717f94.jpg)

## 서비스 아키텍쳐 (Service Architecture)
![서비스 아키텍쳐_ver1](https://user-images.githubusercontent.com/64328412/101149441-49560080-3662-11eb-90f4-e23a2dc0f91f.png)
