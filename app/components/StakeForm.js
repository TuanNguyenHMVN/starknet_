import styles from "../styles/StakeForm.module.scss";
import { Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import useStore from "../store/useStore";
import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

import { connect, disconnect } from "starknetkit"
import { WebWalletConnector } from "starknetkit/webwallet"
import { InjectedConnector } from "starknetkit/injected"
import { ArgentMobileBaseConnector } from "starknetkit-next/argentMobile"

const StakeForm = ({}) => {
  const { userWallet, updateWallet, availableAmount, getEstimatedReward, estimatedRewards, stakeToken } = useStore();

  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState(0);

  const debouncedValue = useDebounce(amount, 100);


  useEffect(() => {
    if (debouncedValue) {
      getEstimatedReward(amount)
    }
  }, [debouncedValue]);

  useEffect(() => {
    setWalletAddress(userWallet || "");
  }, [userWallet]);

  const connectWallet = async () => {
    const { wallet, connectorData } = await connect({
      modalMode: "alwaysAsk",
      connectors: [
        new InjectedConnector({ options: { id: "argentX" } }),
        new InjectedConnector({ options: { id: "braavos" } }),
        new ArgentMobileBaseConnector({
          dappName: "StarkStake",
          url: window.location.hostname,
          chainId: "SN_SEPOLIA",
          icons: [],
        }),
        new WebWalletConnector(),
      ],
    })
    updateWallet(connectorData.account);
  };

  const handleInput = (e) => {
    setAmount(e.target.value)
  }

  const onStake = async () => {
    // const address = process.env.NEXT_PUBLIC_MAIN_CONTRACT_ADDRESS;
    // const currentUser = userWallet.address;
    // const { execute } = useStarknetExecute({
    //   calls: [
    //     {
    //       contractAddress: address,  // Replace with your contract address
    //       entrypoint: 'deposit',  // Replace with the entrypoint function name
    //       calldata: [amount, address, currentUser],  // Replace with your calldata as an array of parameters
    //     },
    //   ],
    // });
    // const transaction = await execute(); 
    // console.log("🚀 ~ onStake ~ transaction:", transaction)
  }

  return (
    <div className={styles["stake-form-container"]}>
      <Row>
        <Col md="12" className={styles.label}>
          <b>Available To Stake</b>
        </Col>
        <Col
          md="12"
          className={`${styles["available-to-stake-input"]} d-flex align-items-center justify-content-between`}
        >
          <div>{availableAmount} STRK</div>
          <div className={styles["wallet-info"]}>
            {`${walletAddress.slice(0, 5)}...${walletAddress.slice(-3)}`}{" "}
          </div>
        </Col>
        <Col md="12" className={styles.label}>
          <b>Amount To Stake</b>
        </Col>
        <Col md="12" className="p-0">
          <InputGroup className={`${styles["stake-input"]} d-flex align-items-center justify-content-between p-0`}>
            <Form.Control
              type="number"
              value={amount}
              max={availableAmount}
              className={styles["stake-input"]}
              onChange={(e) => handleInput(e)}
            />
            <div className={`${styles['combo-input-btn']} d-flex align-items-center justify-content-center`}>
              <Button className={`${styles["max-stake-btn"]} ${amount > 0 ? 'cursor-pointer' : ''}`} variant={availableAmount > 0 ? "primary" : "secondary"} disabled={availableAmount == 0} onClick={() => setAmount(availableAmount)}> 
                  <b>Max.</b>
              </Button>
              <img src="/images/starknet-icon.svg" />
              <span>STRK</span>
            </div>
          </InputGroup>
        </Col>
        <Col md="12" className={styles.label}>
          <b>Estimated Rewards</b>
        </Col>
        <Col
          md="12"
          className={`${styles["estimated-reward-input"]} d-flex align-items-center justify-content-between`}
        >
          <div>{estimatedRewards}</div>
          <div>
            <img src="/images/starknet-icon.svg" />
            <span>stSTRK</span>
          </div>
        </Col>
        <Col md="12" className="p-0">
          {userWallet?.address && (
            <Button variant="primary" className={styles["stake-btn"]} disabled={amount == 0 || amount >   availableAmount} onClick={() => onStake()}>
              Stake Now
            </Button>
          )}
          {!userWallet?.address && (
            <div
              className={`${styles["login-btn-wrappper"]} d-flex align-items-center`}
            >
              <Button
                variant="primary"
                className={styles["login-btn"]}
                onClick={() => connectWallet()}
              >
                Connect Wallet
              </Button>
            </div>
          )}
        </Col>
        <Col md="12" className={`${styles.description} font-14`}>
          *By staking, you agree to lock your tokens for a specified period. You
          will earn rewards during this time, and your stSTRK tokens will
          represent your staked assets.
        </Col>
      </Row>
    </div>
  );
};

export default StakeForm;
