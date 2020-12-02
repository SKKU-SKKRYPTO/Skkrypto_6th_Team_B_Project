import React from 'react';
import cx from 'classnames';
import caver from 'klaytn/caver';

class ShareContract extends React.Component {
	constructor() {
		super();
		// 1. 컨트랙트 인스턴스 생성
		// ex:) new caver.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)
		// 컨트랙트 메서드를 이 인스턴스로 호출할 수 있음
		// this.countContract 변수로 인스턴스에 접근 가능
		this.shareContract = DEPLOYED_ABI
			&& DEPLOYED_ADDRESS
			&& new caver.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS)
		this.state = {participant: 0}
	}

	getParticipant = async () => {
		// 2. 컨트랙트 메서드 호출 (CALL)
		// ex:) this.countContract.methods.methodName(arguments).call()
		// 컨트랙트 CALL 메서드 호출을 위와 같이 할 수 있음
		// count라는 메서드가 있다고 하면 아래와 같이 호출 가능
		// ex:) this.countContract.methods.count().call()
		// promise를 반환하니까, .then()이나 async-await 써라
		const participant = await this.shareContract.methods.getParticipant().call();
		this.setState({participant})
	}

	setPlus = () => {
    const walletInstance = caver.klay.accounts.wallet && caver.klay.accounts.wallet[0]

    // Need to integrate wallet for calling contract method.
    if (!walletInstance) return

    //this.setState({ settingDirection: 'plus' })

		// 3. 컨트랙트 메서드 호출 (SEND)
		// ex:) this.countContract.methods.methodName(arguments).send(txObject)
		// 컨트랙트 SEND 메서드 호출을 아래와 같이 할 수 있음
		// 예를 들어 pluc 메서드가 있다면 아래와 같이 호출 가능
    // ex:) this.countContract.methods.plus().send({
    //   from: '0x952A8dD075fdc0876d48fC26a389b53331C34585', // 송금자 주소
    //   gas: '200000',
    // })
    this.shareContract.methods.plus().send({
      from: walletInstance.address,
      gas: '200000',
    })
      .once('transactionHash', (txHash) => {
        console.log(`
          Sending a transaction... (Call contract's function 'plus')
          txHash: ${txHash}
          `
        )
      })
      .once('receipt', (receipt) => {
        console.log(`
          Received receipt! It means your transaction(calling plus function)
          is in klaytn block(#${receipt.blockNumber})
        `, receipt)
        this.setState({
          settingDirection: null,
          txHash: receipt.transactionHash,
        })
      })
      .once('error', (error) => {
        alert(error.message)
        this.setState({ settingDirection: null })
      })
  }

  setMinus = () => {
    const walletInstance = caver.klay.accounts.wallet && caver.klay.accounts.wallet[0]

    // Need to integrate wallet for calling contract method.
    if (!walletInstance) return

    this.setState({ settingDirection: 'minus' })

    // 3. ** Call contract method (SEND) **
    // ex:) this.countContract.methods.methodName(arguments).send(txObject)
    // You can call contract method (SEND) like above.
    // For example, your contract has a method called `minus`.
    // You can call it like below:
    // ex:) this.countContract.methods.minus().send({
    //   from: '0x952A8dD075fdc0876d48fC26a389b53331C34585', // PUT YOUR ADDRESS
    //   gas: '200000',
    // })

    // It returns event emitter, so after sending, you can listen on event.
    // Use .on('transactionHash') event,
    // : if you want to handle logic after sending transaction.
    // Use .once('receipt') event,
    // : if you want to handle logic after your transaction is put into block.
    // ex:) .once('receipt', (data) => {
    //   console.log(data)
    // })
    this.countContract.methods.minus().send({
      from: walletInstance.address,
      gas: '200000',
    })
      .once('transactionHash', (txHash) => {
        console.log(`
          Sending a transaction... (Call contract's function 'minus')
          txHash: ${txHash}
          `
        )
      })
      .once('receipt', (receipt) => {
        console.log(`
          Received receipt which means your transaction(calling minus function)
          is in klaytn block(#${receipt.blockNumber})
        `, receipt)
        this.setState({
          settingDirection: null,
          txHash: receipt.transactionHash,
        })
      })
      .once('error', (error) => {
        alert(error.message)
        this.setState({ settingDirection: null })
      })
  }

  componentDidMount() {
    this.intervalId = setInterval(this.getCount, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  render() {
    const { lastParticipant, count, settingDirection, txHash } = this.state
    return (
      <div className="Count">
        {Number(lastParticipant) !== 0 && (
          <div className="Count__lastParticipant">
            last participant: {lastParticipant}
          </div>
        )}
        <div className="Count__count">COUNT: {count}</div>
        <button
          onClick={this.setPlus}
          className={cx('Count__button', {
            'Count__button--setting': settingDirection === 'plus',
          })}
        >
          +
        </button>
        <button
          onClick={this.setMinus}
          className={cx('Count__button', {
            'Count__button--setting': settingDirection === 'minus',
          })}
          disabled={count == 0}
        >
          -
        </button>
        {txHash && (
          <div className="Count__lastTransaction">
            <p className="Count__lastTransactionMessage">
              You can check your last transaction in klaytnscope:
            </p>
            <a
              target="_blank"
              href={`https://scope.klaytn.com/transaction/${txHash}`}
              className="Count__lastTransactionLink"
            >
              {txHash}
            </a>
          </div>
        )}
      </div>
    )
  }
}

export default ShareContract;